const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const NoteProduct = require('../models/NoteProduct');

const auth = require('../middleware/auth');

const router = express.Router();

const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^\d{10}$/;
const CITY_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const PINCODE_REGEX = /^\d{6}$/;

function cleanText(value) {
    return String(value || '').trim().replace(/\s+/g, ' ');
}

function parseOptionalUserId(req) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return null;
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (_) {
        return null;
    }
}

/**
 * GET /api/orders/notes
 * Public endpoint to list active notes available for COD ordering.
 */
router.get('/notes', async function(req, res) {
    try {
        const notes = await NoteProduct.find({ isActive: true })
            .sort({ createdAt: -1 })
            .select('title language description price isActive createdAt updatedAt')
            .lean();

        res.json({
            success: true,
            notes: notes.map(function(note) {
                return {
                    id: note._id,
                    title: note.title,
                    language: note.language,
                    description: note.description,
                    price: note.price,
                    isActive: note.isActive,
                    createdAt: note.createdAt,
                    updatedAt: note.updatedAt
                };
            })
        });
    } catch (err) {
        console.error('List Order Notes Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * POST /api/orders
 * Public COD order placement endpoint.
 */
router.post('/', async function(req, res) {
    try {
        const body = req.body || {};

        const customerName = cleanText(body.customerName);
        const email = cleanText(body.email).toLowerCase();
        const phone = cleanText(body.phone).replace(/\D/g, '');
        const city = cleanText(body.city);
        const state = cleanText(body.state);
        const addressLine = cleanText(body.addressLine);
        const pincode = cleanText(body.pincode).replace(/\D/g, '');
        const landmark = cleanText(body.landmark);

        if (!customerName || !NAME_REGEX.test(customerName)) {
            return res.status(400).json({
                success: false,
                message: 'Customer name can contain only letters and single spaces'
            });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email' });
        }

        if (!PHONE_REGEX.test(phone)) {
            return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
        }

        if (!city || !CITY_REGEX.test(city)) {
            return res.status(400).json({
                success: false,
                message: 'City can contain only letters and single spaces'
            });
        }

        if (!state || !CITY_REGEX.test(state)) {
            return res.status(400).json({
                success: false,
                message: 'State can contain only letters and single spaces'
            });
        }

        if (!addressLine || addressLine.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Address must be at least 8 characters'
            });
        }

        if (!PINCODE_REGEX.test(pincode)) {
            return res.status(400).json({ success: false, message: 'Pincode must be exactly 6 digits' });
        }

        if (!Array.isArray(body.notes) || body.notes.length === 0) {
            return res.status(400).json({ success: false, message: 'Please select at least one note' });
        }

        const selected = [];
        const quantityById = {};

        for (let i = 0; i < body.notes.length; i += 1) {
            const item = body.notes[i] || {};
            const noteId = cleanText(item.noteId);
            const quantity = parseInt(item.quantity, 10);

            if (!noteId) {
                return res.status(400).json({ success: false, message: 'Invalid note selection' });
            }

            if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
                return res.status(400).json({
                    success: false,
                    message: 'Each selected note quantity must be between 1 and 50'
                });
            }

            if (!quantityById[noteId]) {
                quantityById[noteId] = 0;
                selected.push(noteId);
            }
            quantityById[noteId] += quantity;
        }

        const dbNotes = await NoteProduct.find({ _id: { $in: selected }, isActive: true })
            .select('title language price')
            .lean();

        if (dbNotes.length !== selected.length) {
            return res.status(400).json({
                success: false,
                message: 'One or more selected notes are unavailable'
            });
        }

        let totalAmount = 0;
        const orderNotes = dbNotes.map(function(note) {
            const quantity = quantityById[String(note._id)] || 0;
            const unitPrice = Number(note.price);
            const lineTotal = unitPrice * quantity;
            totalAmount += lineTotal;

            return {
                noteId: note._id,
                title: note.title,
                language: note.language,
                quantity: quantity,
                unitPrice: unitPrice,
                lineTotal: lineTotal
            };
        });

        const userId = parseOptionalUserId(req);

        const order = await Order.create({
            userId: userId,
            customerName: customerName,
            email: email,
            phone: phone,
            city: city,
            state: state,
            addressLine: addressLine,
            pincode: pincode,
            landmark: landmark,
            paymentMethod: 'COD',
            notes: orderNotes,
            totalAmount: totalAmount
        });

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: {
                id: order._id,
                status: order.status,
                totalAmount: order.totalAmount,
                paymentMethod: order.paymentMethod,
                createdAt: order.createdAt
            }
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const first = Object.values(err.errors)[0];
            return res.status(400).json({ success: false, message: first.message });
        }

        console.error('Create Order Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * GET /api/orders/my-orders
 * Protected endpoint for users to view their past orders.
 */
router.get('/my-orders', auth, async function(req, res) {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId: userId })
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            orders: orders.map(o => ({
                id: o._id,
                customerName: o.customerName,
                totalAmount: o.totalAmount,
                status: o.status,
                items: o.notes,
                addressLine: o.addressLine,
                city: o.city,
                state: o.state,
                pincode: o.pincode,
                createdAt: o.createdAt
            }))
        });
    } catch (err) {
        console.error('Fetch My Orders Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
