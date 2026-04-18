

const mongoose = require('mongoose');

/**
 * Analytics event schema.
 *
 * One document == one example view event.
 * Designed for simple aggregation (daily/monthly usage stats and per-user counts)
 * instead of high-cardinality full telemetry.
 */
const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null  // null for guest users, ObjectId for logged-in users
    },
    title: {
        type: String,
        default: ''    // example title, e.g. "Hello World"
    },
    lang: {
        type: String,
        default: ''    // language key, e.g. "c", "cpp", "python"
    },
    type: {
        type: String,
        default: ''    // example type, e.g. "stack", "ds"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Indexes tuned for common admin dashboard query shapes.
analyticsSchema.index({ userId: 1 });
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ userId: 1, timestamp: -1 });
// TTL index auto-removes events older than 90 days to keep collection size bounded.
analyticsSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
