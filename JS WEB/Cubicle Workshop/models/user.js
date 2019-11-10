const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username:
    {
        type: String, unique: true,
        required: [true, "Can't be blank"], index: true
    },
    password: {
        type: String,
        required: [true, "Can't be blank"], index: true
    }
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;