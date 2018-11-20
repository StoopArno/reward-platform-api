const mongoose = require('mongoose');

const rewardRequestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward'
    }
});

module.exports = mongoose.model('RewardRequestSchema', rewardRequestSchema);