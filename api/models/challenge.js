const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    points: Number,
    title: String
});

module.exports = mongoose.model('Challenge', challengeSchema);