export function validateUser(user) {
    const errors = [];
    if (!user.username || typeof user.username !== 'string') {
        errors.push('Invalid or missing username');
    }
    if (!user.password || typeof user.password !== 'string') {
        errors.push('Invalid or missing password');
    }
    return { isValid: errors.length === 0, errors };
}const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
