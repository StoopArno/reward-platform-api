const mongoose = require('mongoose');

const challengeRequestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    isAccepted: { type: Boolean, default: false },
    motivation: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    }
});

module.exports = mongoose.model('ChallengeRequest', challengeRequestSchema);