const mongoose = require('mongoose');

/**
 * Note product catalog for purchasable notes.
 * Managed by admins and consumed by the public order flow.
 */
const noteProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [2, 'Title must be at least 2 characters'],
        maxlength: [120, 'Title cannot exceed 120 characters']
    },
    language: {
        type: String,
        enum: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Other'],
        default: 'Other'
    },
    description: {
        type: String,
        trim: true,
        maxlength: [400, 'Description cannot exceed 400 characters'],
        default: ''
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be at least 1']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

noteProductSchema.index({ isActive: 1, createdAt: -1 });
noteProductSchema.index({ language: 1 });
noteProductSchema.index({ title: 1 });

module.exports = mongoose.model('NoteProduct', noteProductSchema);
