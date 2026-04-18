

const mongoose = require('mongoose');

/**
 * Connects the application to MongoDB using Mongoose.
 *
 * Behavior:
 * - Resolves connection string from `process.env.MONGODB_URI` first.
 * - Applies conservative pool/time-out settings suitable for cloud hosting.
 * - Registers runtime listeners for error/disconnect/reconnect visibility.
 * - Exits process on startup failure because API routes depend on DB state.
 *
 * @returns {Promise<void>} Resolves when the initial connection is established.
 */
async function connectDB() {
    // using the explicit connection string since Node.js DNS resolver on some IPv6 setups fails on SRV records
    const mongoURI = process.env.MONGODB_URI || fallbackURI;

    try {
        const conn = await mongoose.connect(mongoURI, {
            // Connection pool optimization
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });

        console.log('  MongoDB Connected: ' + conn.connection.host);

        // Handle connection events
        mongoose.connection.on('error', function(err) {
            console.error('  MongoDB Connection Error:', err.message);
        });

        mongoose.connection.on('disconnected', function() {
            console.warn('  MongoDB Disconnected. Attempting reconnect...');
        });

        mongoose.connection.on('reconnected', function() {
            console.log('  MongoDB Reconnected successfully.');
        });

    } catch (err) {
        // Fail-fast: API cannot run without DB access.
        console.error('  MongoDB Connection Error:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
