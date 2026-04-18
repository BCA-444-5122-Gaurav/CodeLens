

const express        = require('express');
const path           = require('path');
const fs             = require('fs');
const rateLimit      = require('express-rate-limit');
const jwt            = require('jsonwebtoken');
const User           = require('../models/User');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const { adminOrTesterMiddleware } = require('../middleware/admin');
const Analytics      = require('../models/Analytics');
const HiddenExamples = require('../models/HiddenExamples');

const router = express.Router();

/**
 * Examples content routes.
 * Base path: /api/examples
 *
 * Data sources:
 * - Static JSON files for example payloads
 * - MongoDB-backed hidden-state for admin visibility toggles
 *
 * Access model:
 * - Public list/item endpoints with guest limits
 * - Admin/tester endpoints for moderation visibility control
 */

/**
 * Optional auth parser used by mixed public/private endpoints.
 * If token is valid, attaches lightweight user to `req.user`; otherwise continues silently.
 */
function optionalAuth(req, res, next) {
    var header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer')) return next();
    var token = header.split(' ')[1];
    if (!token) return next();
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.id).select('_id').then(function(user) {
            if (user) req.user = user;
            next();
        }).catch(function() { next(); });
    } catch (e) { next(); }
}

/**
 * Guest limit for heavy example item fetches.
 * Logged-in users are skipped via `skip` callback.
 */
var guestItemLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    skip: function(req) { return !!req.user; },
    message: { success: false, message: 'Guest limit reached. Please sign up to continue.' }
});

// Route params map to these on-disk folders/files.
const TYPE_FOLDERS = {
    stack: 'Stack Examples',
    ds:    'D.S Example'
};

const LANG_FILES = {
    c:          'C',
    cpp:        'CPP',
    java:       'Java',
    python:     'Python',
    javascript: 'JavaScript'
};

// MongoDB is the authoritative store so hidden state survives Render redeploys.
// The JSON file is used only to seed MongoDB on first run.
const HIDDEN_FILE = path.join(__dirname, '..', 'Data', 'Examples', 'hiddenExamples.json');
var hiddenCache = null; // in-memory, loaded from MongoDB at startup

// On module load: pull from MongoDB, seed from file if no DB record exists yet
(async function initHiddenFromDB() {
    try {
        const doc = await HiddenExamples.findOne({});
        if (doc && doc.data && Object.keys(doc.data).length > 0) {
            hiddenCache = doc.data;
        } else {
            // Seed from the committed JSON file
            var fileData = {};
            try {
                var raw = fs.readFileSync(HIDDEN_FILE, 'utf8');
                fileData = JSON.parse(raw);
            } catch (e) {}
            hiddenCache = fileData;
            await HiddenExamples.findOneAndUpdate({}, { data: fileData }, { upsert: true, new: true });
        }
    } catch (e) {
        // DB unavailable — fall back to JSON file silently
        try {
            var raw = fs.readFileSync(HIDDEN_FILE, 'utf8');
            hiddenCache = JSON.parse(raw);
        } catch (_) {
            hiddenCache = {};
        }
    }
})();

function loadHidden() {
    // hiddenCache is always kept current; fall back to {} only if init is still pending
    return hiddenCache || {};
}

function saveHidden(data) {
    hiddenCache = data; // update in-memory immediately
    // Persist to MongoDB (primary store, survives redeploys)
    HiddenExamples.findOneAndUpdate({}, { data: data }, { upsert: true })
        .catch(function(err) { console.error('Failed to save hidden examples to DB:', err.message); });
    // Also keep the local file in sync (useful for local dev / debugging)
    fs.writeFile(HIDDEN_FILE, JSON.stringify(data, null, 2), 'utf8', function(err) {
        if (err) console.error('Failed to save hidden examples to file:', err.message);
    });
}

const fileCache = {};

/**
 * Reads and memoizes examples for a given type/language.
 * @param {'stack'|'ds'} type
 * @param {'c'|'cpp'|'java'|'python'|'javascript'} lang
 * @returns {Array|null} Example list when file exists and parses as array.
 */
function loadFile(type, lang) {
    const cacheKey = type + '_' + lang;
    if (fileCache[cacheKey]) return fileCache[cacheKey];

    const folder = TYPE_FOLDERS[type];
    const file   = LANG_FILES[lang];
    if (!folder || !file) return null;

    const filePath = path.join(__dirname, '..', 'Data', 'Examples', folder, file + '.json');
    try {
        const raw  = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''); // strip UTF-8 BOM if present
        const data = JSON.parse(raw);
        if (Array.isArray(data)) {
            fileCache[cacheKey] = data;
            return data;
        }
        return null;
    } catch (e) {
        return null;
    }
}


/**
 * GET /api/examples/list/:type/:lang
 * Public endpoint returning metadata-only list with hidden items filtered out.
 */
router.get('/list/:type/:lang', function(req, res) {
    const type = req.params.type;
    const lang = req.params.lang.toLowerCase();

    if (!TYPE_FOLDERS[type] || !LANG_FILES[lang]) {
        return res.status(400).json({ success: false, message: 'Invalid type or language' });
    }

    const data = loadFile(type, lang);
    if (!data) return res.json({ success: true, data: [] });

    const hidden    = loadHidden();
    const key       = type + '_' + lang;
    const hiddenSet = new Set(hidden[key] || []);

    const metaList = data
        .map(function(ex, idx) {
            return {
                meta: ex.meta,
                _idx: idx,
                has_steps: Array.isArray(ex.execution_steps) && ex.execution_steps.length > 0
            };
        })
        .filter(function(item) { return !hiddenSet.has(item._idx); });

    res.set('Cache-Control', 'no-store');
    res.json({ success: true, data: metaList });
});


/**
 * GET /api/examples/admin-list/:type/:lang
 * Admin/tester endpoint returning metadata plus hidden-state flags.
 */
router.get('/admin-list/:type/:lang', authMiddleware, adminOrTesterMiddleware, function(req, res) {
    const type = req.params.type;
    const lang = req.params.lang.toLowerCase();

    if (!TYPE_FOLDERS[type] || !LANG_FILES[lang]) {
        return res.status(400).json({ success: false, message: 'Invalid type or language' });
    }

    const data = loadFile(type, lang);
    if (!data) return res.json({ success: true, data: [] });

    const hidden    = loadHidden();
    const key       = type + '_' + lang;
    const hiddenSet = new Set(hidden[key] || []);

    const metaList = data.map(function(ex, idx) {
        return {
            meta: ex.meta,
            _idx: idx,
            hidden: hiddenSet.has(idx),
            has_steps: Array.isArray(ex.execution_steps) && ex.execution_steps.length > 0
        };
    });

    res.set('Cache-Control', 'no-store');
    res.json({ success: true, data: metaList });
});


/**
 * POST /api/examples/toggle-visibility/:type/:lang/:idx
 * Admin endpoint toggling one example index between hidden/visible.
 * Writes to MongoDB (source of truth) and local JSON mirror.
 */
router.post('/toggle-visibility/:type/:lang/:idx', authMiddleware, adminMiddleware, function(req, res) {
    const type = req.params.type;
    const lang = req.params.lang.toLowerCase();
    const idx  = parseInt(req.params.idx, 10);

    if (!TYPE_FOLDERS[type] || !LANG_FILES[lang] || isNaN(idx) || idx < 0) {
        return res.status(400).json({ success: false, message: 'Invalid parameters' });
    }

    const data = loadFile(type, lang);
    if (!data || idx >= data.length) {
        return res.status(404).json({ success: false, message: 'Example not found' });
    }

    const hidden  = loadHidden();
    const key     = type + '_' + lang;
    if (!hidden[key]) hidden[key] = [];

    const pos = hidden[key].indexOf(idx);
    let nowHidden;
    if (pos === -1) {
        hidden[key].push(idx);
        nowHidden = true;
    } else {
        hidden[key].splice(pos, 1);
        nowHidden = false;
    }

    saveHidden(hidden);
    res.json({ success: true, hidden: nowHidden });
});


/**
 * GET /api/examples/item/:type/:lang/:idx
 * Returns complete example payload for editor/visualizer consumption.
 * Guest access is allowed but rate-limited.
 */
router.get('/item/:type/:lang/:idx', optionalAuth, guestItemLimiter, function(req, res) {
    const type = req.params.type;
    const lang = req.params.lang.toLowerCase();
    const idx  = parseInt(req.params.idx, 10);

    if (!TYPE_FOLDERS[type] || !LANG_FILES[lang] || isNaN(idx) || idx < 0) {
        return res.status(400).json({ success: false, message: 'Invalid parameters' });
    }

    const data = loadFile(type, lang);
    if (!data || idx >= data.length) {
        return res.status(404).json({ success: false, message: 'Example not found' });
    }

    // Cache individual examples for 1 hour (static data)
    res.set('Cache-Control', 'public, max-age=3600');
    res.json({ success: true, data: data[idx] });
});


/**
 * POST /api/examples/track-view
 * Auth-only endpoint; logs example view analytics asynchronously.
 */
router.post('/track-view', authMiddleware, function(req, res) {
    var body = req.body || {};
    // Fire-and-forget — don't block the response
    Analytics.create({
        userId: req.user._id,
        title: typeof body.title === 'string' ? body.title.slice(0, 200) : '',
        lang:  typeof body.lang  === 'string' ? body.lang.slice(0, 20)  : '',
        type:  typeof body.type  === 'string' ? body.type.slice(0, 20)  : '',
        timestamp: new Date()
    }).catch(function(err) {
        console.error('Analytics track error:', err.message);
    });

    res.json({ success: true });
});

/* ---- POST /api/examples/track-view-guest
   Logs that a guest user viewed an example.
   No auth required. Stores userId: null + view details.
   ----------------------------------------- */
router.post('/track-view-guest', function(req, res) {
    var body = req.body || {};
    // Fire-and-forget — don't block the response
    Analytics.create({
        userId: null,
        title: typeof body.title === 'string' ? body.title.slice(0, 200) : '',
        lang:  typeof body.lang  === 'string' ? body.lang.slice(0, 20)  : '',
        type:  typeof body.type  === 'string' ? body.type.slice(0, 20)  : '',
        timestamp: new Date()
    }).catch(function(err) {
        console.error('Analytics guest track error:', err.message);
    });

    res.json({ success: true });
});

module.exports = router;
