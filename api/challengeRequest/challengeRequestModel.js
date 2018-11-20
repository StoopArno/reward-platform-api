const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    isAccepted: Boolean,
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

module.exports = mongoose.model('Challenge', challengeSchema);