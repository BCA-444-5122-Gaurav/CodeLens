

const mongoose = require('mongoose');

/**
 * Visibility configuration store for examples.
 *
 * Data shape is intentionally flexible (`Mixed`) because keys are dynamically
 * generated as `<type>_<lang>` and each value is an array of hidden example indexes.
 * Example:
 * {
 *   "stack_cpp": [0, 5, 9],
 *   "ds_c": [2]
 * }
 */
const hiddenExamplesSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

module.exports = mongoose.model('HiddenExamples', hiddenExamplesSchema);
