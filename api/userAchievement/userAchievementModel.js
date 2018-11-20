const mongoose = require('mongoose');

const userAchievementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    datetime: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    achievement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement'
    }
});

module.exports = mongoose.model('UserAchievementSchema', userAchievementSchema);