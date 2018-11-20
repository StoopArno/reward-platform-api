const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    points: Number,
    isAvailable: Boolean,
    achievementType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AchievemntType'
    }
});

module.exports = mongoose.model('Achievement', achievementSchema);