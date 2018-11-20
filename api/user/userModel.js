const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    isAdmin: Boolean
});

module.exports = mongoose.model('User', userSchema);