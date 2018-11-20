const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    points: Number,
    limit: Number,
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Challenge', challengeSchema);