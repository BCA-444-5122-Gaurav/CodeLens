const mongoose = require('mongoose');

const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const CITY_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^\d{10}$/;
const PINCODE_REGEX = /^\d{6}$/;

const orderItemSchema = new mongoose.Schema({
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NoteProduct',
        required: [true, 'Note reference is required']
    },
    title: {
        type: String,
        required: [true, 'Note title is required'],
        trim: true,
        maxlength: [120, 'Note title cannot exceed 120 characters']
    },
    language: {
        type: String,
        default: 'Other'
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        max: [50, 'Quantity cannot exceed 50']
    },
    unitPrice: {
        type: Number,
        required: [true, 'Unit price is required'],
        min: [1, 'Unit price must be at least 1']
    },
    lineTotal: {
        type: Number,
        required: [true, 'Line total is required'],
        min: [1, 'Line total must be at least 1']
    }
}, { _id: false });

/**
 * COD order document for note purchases.
 */
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
        minlength: [2, 'Customer name must be at least 2 characters'],
        maxlength: [60, 'Customer name cannot exceed 60 characters'],
        match: [NAME_REGEX, 'Customer name can contain only letters and single spaces between words']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [EMAIL_REGEX, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [PHONE_REGEX, 'Phone number must be exactly 10 digits']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        minlength: [2, 'City must be at least 2 characters'],
        maxlength: [60, 'City cannot exceed 60 characters'],
        match: [CITY_REGEX, 'City can contain only letters and single spaces between words']
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        minlength: [2, 'State must be at least 2 characters'],
        maxlength: [60, 'State cannot exceed 60 characters'],
        match: [CITY_REGEX, 'State can contain only letters and single spaces between words']
    },
    addressLine: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        minlength: [8, 'Address must be at least 8 characters'],
        maxlength: [250, 'Address cannot exceed 250 characters']
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
        match: [PINCODE_REGEX, 'Pincode must be exactly 6 digits']
    },
    landmark: {
        type: String,
        trim: true,
        maxlength: [120, 'Landmark cannot exceed 120 characters'],
        default: ''
    },
    paymentMethod: {
        type: String,
        enum: ['COD'],
        default: 'COD'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    notes: {
        type: [orderItemSchema],
        validate: {
            validator: function(arr) {
                return Array.isArray(arr) && arr.length > 0;
            },
            message: 'At least one note item is required'
        }
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [1, 'Total amount must be at least 1']
    }
}, {
    timestamps: true
});

orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ email: 1 });
orderSchema.index({ phone: 1 });
orderSchema.index({ customerName: 1 });

module.exports = mongoose.model('Order', orderSchema);
