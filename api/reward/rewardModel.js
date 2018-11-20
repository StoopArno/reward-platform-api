const mongoose = require('mongoose');

const rewardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    points: Number,
    limit: Number,
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Reward', rewardSchema);