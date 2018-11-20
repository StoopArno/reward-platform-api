const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    points: Number,
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Challenge', challengeSchema);