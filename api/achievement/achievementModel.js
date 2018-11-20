const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    counter: Number,
    description: String,
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('achievement', achievementSchema);