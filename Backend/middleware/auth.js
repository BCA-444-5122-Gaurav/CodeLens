

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication guard middleware.
 *
 * Flow:
 * 1) Reads bearer token from `Authorization` header.
 * 2) Verifies JWT signature + expiry with `JWT_SECRET`.
 * 3) Loads user document and attaches it to `req.user`.
 *
 * Response behavior:
 * - 401 when token is missing/invalid/expired or user no longer exists.
 */
async function authMiddleware(req, res, next) {
    let token = null;

    // Check for token in Authorization header
    // Format: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token found, return error
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized - No token provided'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch only fields needed by most protected routes.
        req.user = await User.findById(decoded.id).select('name email role avatar createdAt');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized - User not found'
            });
        }

        next();
    } catch (err) {
        const message = err.name === 'TokenExpiredError'
            ? 'Not authorized - Token expired'
            : 'Not authorized - Invalid token';
        return res.status(401).json({ success: false, message: message });
    }
}

module.exports = authMiddleware;
