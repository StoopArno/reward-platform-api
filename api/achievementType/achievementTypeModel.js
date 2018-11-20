const mongoose = require('mongoose');

const achievementTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    },
    reward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward'
    }
});

module.exports = mongoose.model('AchievementType', achievementTypeSchema);