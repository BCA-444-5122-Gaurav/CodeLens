

const express = require('express');
const XLSX = require('xlsx');
const User = require('../models/User');
const Analytics = require('../models/Analytics');
const Order = require('../models/Order');
const NoteProduct = require('../models/NoteProduct');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

const NOTE_LANGUAGES = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Other'];
const ORDER_STATUSES = ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];

function cleanText(value) {
    return String(value || '').trim().replace(/\s+/g, ' ');
}

function escapeRegex(input) {
    return String(input || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildOrderFilter(query) {
    const filter = {};
    const status = cleanText(query.status);
    const search = cleanText(query.search);

    if (status && status !== 'all') {
        if (!ORDER_STATUSES.includes(status)) {
            return { error: 'Invalid status filter' };
        }
        filter.status = status;
    }

    if (search) {
        const regex = new RegExp(escapeRegex(search), 'i');
        filter.$or = [
            { customerName: regex },
            { email: regex },
            { phone: regex },
            { city: regex }
        ];
    }

    return { filter: filter };
}

function toIsoTimestamp(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString();
}

/**
 * Admin management routes.
 * Base path: /api/admin
 *
 * Security model:
 * - Every endpoint in this file requires authenticated admin privileges.
 */
// Apply auth + admin middleware to all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);


/**
 * GET /api/admin/users
 * Query: page, limit
 *
 * Returns paginated users plus computed `examplesViewed` from analytics events.
 */
router.get('/users', async function(req, res) {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find()
                .select('name email role avatar createdAt')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            User.countDocuments()
        ]);

        // Get example view counts per user
        const userIds = users.map(function(u) { return u._id; });
        const viewCounts = await Analytics.aggregate([
            { $match: { userId: { $in: userIds } } },
            { $group: { _id: '$userId', count: { $sum: 1 } } }
        ]);
        const viewMap = {};
        viewCounts.forEach(function(v) { viewMap[v._id.toString()] = v.count; });

        res.json({
            success: true,
            count: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            users: users.map(function(user) {
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    createdAt: user.createdAt,
                    examplesViewed: viewMap[user._id.toString()] || 0
                };
            })
        });

    } catch (err) {
        console.error('Get Users Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error - Please try again'
        });
    }
});


/**
 * GET /api/admin/stats
 *
 * Returns dashboard counters for:
 * - user totals/roles
 * - user growth windows (today/week/month)
 * - execution totals from analytics collection
 */
router.get('/stats', async function(req, res) {
    try {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const weekStart = new Date(todayStart);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
        if (weekStart > todayStart) {
            weekStart.setDate(weekStart.getDate() - 7);
        }

        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        // Run User and Analytics aggregations in parallel (independent queries)
        var [result, execResult] = await Promise.all([
            User.aggregate([
                {
                    $facet: {
                        totalUsers: [{ $count: 'count' }],
                        totalAdmins: [
                            { $match: { role: 'admin' } },
                            { $count: 'count' }
                        ],
                        totalTesters: [
                            { $match: { role: 'tester' } },
                            { $count: 'count' }
                        ],
                        newToday: [
                            { $match: { createdAt: { $gte: todayStart } } },
                            { $count: 'count' }
                        ],
                        newThisWeek: [
                            { $match: { createdAt: { $gte: weekStart } } },
                            { $count: 'count' }
                        ],
                        newThisMonth: [
                            { $match: { createdAt: { $gte: monthStart } } },
                            { $count: 'count' }
                        ]
                    }
                }
            ]),
            Analytics.aggregate([
                {
                    $facet: {
                        today: [
                            { $match: { timestamp: { $gte: todayStart } } },
                            { $count: 'count' }
                        ],
                        thisMonth: [
                            { $match: { timestamp: { $gte: monthStart } } },
                            { $count: 'count' }
                        ],
                        total: [{ $count: 'count' }]
                    }
                }
            ])
        ]);

        const data = result[0];
        const execData = execResult[0];
        const getCount = function(arr) { return arr.length > 0 ? arr[0].count : 0; };

        res.json({
            success: true,
            stats: {
                totalUsers: getCount(data.totalUsers),
                totalAdmins: getCount(data.totalAdmins),
                totalTesters: getCount(data.totalTesters),
                newToday: getCount(data.newToday),
                newThisWeek: getCount(data.newThisWeek),
                newThisMonth: getCount(data.newThisMonth),
                executionsToday: getCount(execData.today),
                executionsThisMonth: getCount(execData.thisMonth),
                totalExecutions: getCount(execData.total)
            }
        });

    } catch (err) {
        console.error('Get Stats Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error - Please try again'
        });
    }
});


/**
 * GET /api/admin/note-products
 * Query: includeInactive=true|false
 *
 * Returns note products for admin management.
 */
router.get('/note-products', async function(req, res) {
    try {
        const includeInactive = req.query.includeInactive !== 'false';
        const filter = includeInactive ? {} : { isActive: true };

        const notes = await NoteProduct.find(filter)
            .sort({ createdAt: -1 })
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
        console.error('List Note Products Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


/**
 * POST /api/admin/note-products
 * Body: { title, language, description, price, isActive }
 *
 * Creates a purchasable note product.
 */
router.post('/note-products', async function(req, res) {
    try {
        const title = cleanText(req.body.title);
        const language = cleanText(req.body.language) || 'Other';
        const description = cleanText(req.body.description);
        const price = Number(req.body.price);
        const isActive = typeof req.body.isActive === 'boolean' ? req.body.isActive : true;

        if (!title || title.length < 2 || title.length > 120) {
            return res.status(400).json({
                success: false,
                message: 'Title must be between 2 and 120 characters'
            });
        }

        if (!NOTE_LANGUAGES.includes(language)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid language value'
            });
        }

        if (description.length > 400) {
            return res.status(400).json({
                success: false,
                message: 'Description cannot exceed 400 characters'
            });
        }

        if (!Number.isFinite(price) || price < 1) {
            return res.status(400).json({
                success: false,
                message: 'Price must be at least 1'
            });
        }

        const note = await NoteProduct.create({
            title: title,
            language: language,
            description: description,
            price: price,
            isActive: isActive
        });

        res.status(201).json({
            success: true,
            message: 'Note added successfully',
            note: {
                id: note._id,
                title: note.title,
                language: note.language,
                description: note.description,
                price: note.price,
                isActive: note.isActive,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const first = Object.values(err.errors)[0];
            return res.status(400).json({ success: false, message: first.message });
        }

        console.error('Create Note Product Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


/**
 * PATCH /api/admin/note-products/:id
 * Body: partial { title, language, description, price, isActive }
 *
 * Updates note details/price/status for admin management.
 */
router.patch('/note-products/:id', async function(req, res) {
    try {
        const updates = {};

        if (Object.prototype.hasOwnProperty.call(req.body, 'title')) {
            const title = cleanText(req.body.title);
            if (!title || title.length < 2 || title.length > 120) {
                return res.status(400).json({
                    success: false,
                    message: 'Title must be between 2 and 120 characters'
                });
            }
            updates.title = title;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'language')) {
            const language = cleanText(req.body.language);
            if (!NOTE_LANGUAGES.includes(language)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid language value'
                });
            }
            updates.language = language;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'description')) {
            const description = cleanText(req.body.description);
            if (description.length > 400) {
                return res.status(400).json({
                    success: false,
                    message: 'Description cannot exceed 400 characters'
                });
            }
            updates.description = description;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'price')) {
            const price = Number(req.body.price);
            if (!Number.isFinite(price) || price < 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Price must be at least 1'
                });
            }
            updates.price = price;
        }

        if (Object.prototype.hasOwnProperty.call(req.body, 'isActive')) {
            if (typeof req.body.isActive !== 'boolean') {
                return res.status(400).json({
                    success: false,
                    message: 'isActive must be boolean'
                });
            }
            updates.isActive = req.body.isActive;
        }

        if (!Object.keys(updates).length) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields provided for update'
            });
        }

        const note = await NoteProduct.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note product not found' });
        }

        res.json({
            success: true,
            message: 'Note updated successfully',
            note: {
                id: note._id,
                title: note.title,
                language: note.language,
                description: note.description,
                price: note.price,
                isActive: note.isActive,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const first = Object.values(err.errors)[0];
            return res.status(400).json({ success: false, message: first.message });
        }

        console.error('Update Note Product Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


/**
 * GET /api/admin/orders
 * Query: page, limit, status, search, sort
 *
 * Returns paginated COD orders with customer and item details.
 */
router.get('/orders', async function(req, res) {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 25));
        const skip = (page - 1) * limit;

        const filterResult = buildOrderFilter(req.query || {});
        if (filterResult.error) {
            return res.status(400).json({ success: false, message: filterResult.error });
        }
        const filter = filterResult.filter;

        const sort = req.query.sort === 'oldest' ? 1 : -1;

        const [orders, total] = await Promise.all([
            Order.find(filter)
                .sort({ createdAt: sort })
                .skip(skip)
                .limit(limit)
                .lean(),
            Order.countDocuments(filter)
        ]);

        res.json({
            success: true,
            count: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            orders: orders.map(function(order) {
                return {
                    id: order._id,
                    customerName: order.customerName,
                    email: order.email,
                    phone: order.phone,
                    city: order.city,
                    state: order.state,
                    addressLine: order.addressLine,
                    pincode: order.pincode,
                    landmark: order.landmark,
                    paymentMethod: order.paymentMethod,
                    status: order.status,
                    notes: (order.notes || []).map(function(item) {
                        return {
                            noteId: item.noteId,
                            title: item.title,
                            language: item.language,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            lineTotal: item.lineTotal
                        };
                    }),
                    totalAmount: order.totalAmount,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt
                };
            })
        });
    } catch (err) {
        console.error('List Orders Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * GET /api/admin/orders/export
 * Query: status, search, sort
 *
 * Downloads orders as an Excel (.xlsx) file with detailed order + note-item rows.
 */
router.get('/orders/export', async function(req, res) {
    try {
        const filterResult = buildOrderFilter(req.query || {});
        if (filterResult.error) {
            return res.status(400).json({ success: false, message: filterResult.error });
        }

        const sort = req.query.sort === 'oldest' ? 1 : -1;
        const orders = await Order.find(filterResult.filter)
            .sort({ createdAt: sort })
            .lean();

        const rows = [[
            'Order ID',
            'Created At (UTC)',
            'Updated At (UTC)',
            'Status',
            'Payment Method',
            'Customer Name',
            'Email',
            'Phone',
            'Address Line',
            'Landmark',
            'City',
            'State',
            'Pincode',
            'Order Total',
            'Note Title',
            'Note Language',
            'Quantity',
            'Unit Price',
            'Line Total'
        ]];

        orders.forEach(function(order) {
            const items = Array.isArray(order.notes) && order.notes.length ? order.notes : [null];

            items.forEach(function(item) {
                rows.push([
                    String(order._id || ''),
                    toIsoTimestamp(order.createdAt),
                    toIsoTimestamp(order.updatedAt),
                    order.status || '',
                    order.paymentMethod || '',
                    order.customerName || '',
                    order.email || '',
                    order.phone || '',
                    order.addressLine || '',
                    order.landmark || '',
                    order.city || '',
                    order.state || '',
                    order.pincode || '',
                    Number(order.totalAmount || 0),
                    item ? (item.title || '') : '',
                    item ? (item.language || '') : '',
                    item ? Number(item.quantity || 0) : 0,
                    item ? Number(item.unitPrice || 0) : 0,
                    item ? Number(item.lineTotal || 0) : 0
                ]);
            });
        });

        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        worksheet['!cols'] = [
            { wch: 26 }, { wch: 24 }, { wch: 24 }, { wch: 12 }, { wch: 14 },
            { wch: 24 }, { wch: 30 }, { wch: 16 }, { wch: 36 }, { wch: 24 },
            { wch: 18 }, { wch: 18 }, { wch: 12 }, { wch: 14 }, { wch: 30 },
            { wch: 16 }, { wch: 10 }, { wch: 12 }, { wch: 12 }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
        const fileBuffer = XLSX.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx',
            compression: true
        });

        const fileStamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = 'orders-export-' + fileStamp + '.xlsx';

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');
        res.send(fileBuffer);
    } catch (err) {
        console.error('Export Orders Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


/**
 * PATCH /api/admin/orders/:id/status
 * Body: { status }
 *
 * Updates one order status.
 */
router.patch('/orders/:id/status', async function(req, res) {
    try {
        const status = cleanText(req.body.status);
        if (!ORDER_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Allowed: ' + ORDER_STATUSES.join(', ')
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        ).lean();

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({
            success: true,
            message: 'Order status updated successfully',
            order: {
                id: order._id,
                status: order.status,
                updatedAt: order.updatedAt
            }
        });
    } catch (err) {
        console.error('Update Order Status Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


/**
 * PATCH /api/admin/users/:id/role
 * Body: { role }
 *
 * Changes one user's role while preventing self-role mutation.
 */
router.patch('/users/:id/role', async function(req, res) {
    try {
        const targetId = req.params.id;
        const { role } = req.body;

        const allowedRoles = ['user', 'admin', 'tester'];
        if (!role || !allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Allowed: user, admin, tester'
            });
        }

        // Cannot change own role
        if (targetId === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot change your own role'
            });
        }

        const user = await User.findByIdAndUpdate(
            targetId,
            { role: role },
            { new: true }
        ).select('name email role avatar createdAt');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Role updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error('Change Role Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error - Please try again'
        });
    }
});


/**
 * DELETE /api/admin/users/:id
 *
 * Removes target user account and associated analytics rows.
 * Self-deletion is blocked to avoid accidental admin lockout.
 */
router.delete('/users/:id', async function(req, res) {
    try {
        const targetId = req.params.id;

        // Cannot delete self
        if (targetId === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }

        const user = await User.findByIdAndDelete(targetId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Also remove user's analytics data
        await Analytics.deleteMany({ userId: targetId });

        res.json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (err) {
        console.error('Delete User Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error - Please try again'
        });
    }
});

module.exports = router;
