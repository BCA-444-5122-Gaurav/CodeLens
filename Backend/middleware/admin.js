

/**
 * Role guard that allows only `admin` users.
 * Requires `req.user` to be set earlier by auth middleware.
 */
function adminMiddleware(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied - Admin only'
        });
    }
    next();
}

/**
 * Role guard that allows `admin` and `tester` users.
 * Used for moderation/report dashboards where tester access is intentional.
 */
function adminOrTesterMiddleware(req, res, next) {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'tester')) {
        return res.status(403).json({
            success: false,
            message: 'Access denied - Admin or Tester only'
        });
    }
    next();
}

module.exports = adminMiddleware;
module.exports.adminOrTesterMiddleware = adminOrTesterMiddleware;
