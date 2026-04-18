

const mongoose = require('mongoose');

/**
 * Report schema for user-submitted issues.
 *
 * Captures contextual metadata (language/example/step/line/dataSegment/visType)
 * plus categorization and triage status used by admin/tester moderation screens.
 */
const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    language: {
        type: String,
        default: ''
    },
    exampleTitle: {
        type: String,
        default: ''
    },
    step: {
        type: String,
        default: ''
    },
    line: {
        type: String,
        default: ''
    },
    dataSegment: {
        type: String,
        default: ''
    },
    visType: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        // Categorized values make dashboard filtering and aggregation predictable.
        enum: ['incorrect_visualization', 'wrong_variable_value', 'missing_step', 'wrong_line_highlight', 'ui_glitch', 'other'],
        default: 'other'
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'resolved', 'dismissed'],
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes optimized for list filters and moderation dashboard sorts.
reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ category: 1 });
reportSchema.index({ exampleTitle: 1 });
reportSchema.index({ createdAt: -1 });

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
