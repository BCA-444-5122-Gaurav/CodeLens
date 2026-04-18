

/**
 * Backend entrypoint for the CodeLens API server.
 *
 * Responsibilities:
 * - Load environment variables and initialize DB connectivity
 * - Configure global middleware (security, compression, logging, body parsing)
 * - Register route groups with route-specific rate limits
 * - Serve static assets (avatars/examples fallback)
 * - Handle 404, centralized errors, and graceful process shutdown
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Trust proxy — required on Render (behind reverse proxy) for rate limiting & secure cookies
app.set('trust proxy', 1);


// HTTP security headers (XSS protection, content-type sniffing, etc.)
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' } // Allow avatar images cross-origin
}));

// Gzip compression for responses
app.use(compression());

// Request logging (dev format for development)
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

// Parse JSON request body (limit payload size)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// CORS - allow frontend origins (Vercel domain + localhost for dev)
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5500,http://127.0.0.1:5500')
    .split(',')
    .map(function(s) { return s.trim(); });

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (mobile apps, curl, health checks)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// General API rate limit: 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later' }
});

// Stricter limit for auth routes: 20 attempts per 15 minutes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many login attempts, please try again later' }
});

// Stricter limit for code execution routes to reduce abuse risk
const executeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Execution limit reached, please try again later' }
});


// Serve avatar images with caching headers
app.use('/avatars', express.static(path.join(__dirname, 'Data', 'Avatar'), {
    maxAge: '1d',
    etag: true
}));

// Example lazy-load API (meta-only list + single-item fetch)
app.use('/api/examples', apiLimiter, require('./routes/examples'));

// Serve example data files (legacy static, kept as fallback)
app.use('/examples', express.static(path.join(__dirname, 'Data', 'Examples'), {
    maxAge: '1h',
    etag: true
}));


// Auth routes (login, register, profile) — with stricter rate limit
app.use('/api/auth', authLimiter, require('./routes/auth'));

// Admin routes (user management, analytics) — with general rate limit
app.use('/api/admin', apiLimiter, require('./routes/admin'));

// Report routes (submit + admin management) — with general rate limit
app.use('/api/reports', apiLimiter, require('./routes/reports'));

// Public note order routes (catalog + COD order placement)
app.use('/api/orders', apiLimiter, require('./routes/orders'));

// C code execution routes (compile + run in isolated temp workspace)
app.use('/api/execute', executeLimiter, require('./routes/execute'));

// Health check
app.get('/api/health', function(req, res) {
    res.json({
        status: 'ok',
        message: 'CodeLens API is running',
        uptime: Math.floor(process.uptime()) + 's',
        timestamp: Date.now()
    });
});

// Fallback for unmatched routes (must stay after all explicit route mounts).
app.use(function(req, res) {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Central error handler for uncaught route/middleware errors.
// Keeps production responses generic while preserving logs for debugging.
app.use(function(err, req, res, next) {
    console.error('Unhandled Error:', err.stack || err.message);
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message || 'Internal server error'
    });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, function() {
    console.log('');
    console.log('  CodeLens Backend Server');
    console.log('  -----------------------');
    console.log('  Server running on port ' + PORT);
    console.log('  API: http://localhost:' + PORT + '/api');
    console.log('  Environment: ' + (process.env.NODE_ENV || 'development'));
    console.log('');
});

// Graceful shutdown sequence:
// 1) stop accepting new connections, 2) finish active requests, 3) force-exit after timeout.
function shutdown(signal) {
    console.log('\n  ' + signal + ' received. Shutting down gracefully...');
    server.close(function() {
        console.log('  Server closed.');
        process.exit(0);
    });
    // Force close after 10 seconds
    setTimeout(function() {
        console.error('  Forced shutdown.');
        process.exit(1);
    }, 10000);
}

process.on('SIGTERM', function() { shutdown('SIGTERM'); });
process.on('SIGINT', function() { shutdown('SIGINT'); });
