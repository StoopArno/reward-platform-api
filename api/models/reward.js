const mongoose = require('mongoose');

const rewardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    points: Number,
    descriptionShort: String,
    descriptionLong: String
});

module.exports = mongoose.model('Reward', rewardSchema);