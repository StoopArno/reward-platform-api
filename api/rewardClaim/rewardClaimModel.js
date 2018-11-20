const mongoose = require('mongoose');

const rewardClaimSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    received: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward'
    }
});

module.exports = mongoose.model('RewardClaim', rewardClaimSchema);