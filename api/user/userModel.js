const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    isAdmin: { type: Boolean, default: false},
    currentPoints: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);