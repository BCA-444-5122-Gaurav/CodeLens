

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User collection schema.
 *
 * Stores:
 * - Core identity fields (name, email, password hash)
 * - Access-control role (`user` | `admin` | `tester`)
 * - Profile metadata (avatar, gender, createdAt)
 * - Password-reset OTP workflow state (hidden by default from normal queries)
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        match: [/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Name can contain only letters and single spaces between words']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false  // Don't return password in queries by default
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'tester'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    resetOtp: {
        type: String,
        select: false
    },
    resetOtpExpires: {
        type: Date,
        select: false
    },
    resetOtpVerified: {
        type: Boolean,
        default: false,
        select: false
    }
});

// Indexes for frequent queries
// Note: email index is auto-created by unique:true
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

/**
 * Pre-save hook to hash password when modified.
 *
 * Notes:
 * - Runs automatically for `save()` operations.
 * - Skips hashing when password field is unchanged.
 * - Uses bcrypt with salt rounds = 10 (good balance for this project scale).
 */
userSchema.pre('save', async function() {
    // Skip hashing when password is unchanged (e.g., profile-only updates).
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compares plain text password with the stored bcrypt hash.
 * @param {string} enteredPassword Password from login request.
 * @returns {Promise<boolean>} True when password matches.
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

/**
 * Normalizes a safe user payload for API responses.
 * Excludes sensitive internal fields (password, OTP state).
 * @returns {{id: *, name: string, email: string, role: string, avatar: string, gender: string, createdAt: Date}}
 */
userSchema.methods.toPublicJSON = function() {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
        avatar: this.avatar,
        gender: this.gender,
        createdAt: this.createdAt
    };
};

const User = mongoose.model('User', userSchema);
module.exports = User;
