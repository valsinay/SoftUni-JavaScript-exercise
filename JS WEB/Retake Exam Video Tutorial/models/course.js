const mongoose = require('mongoose');

let CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        required: true
    },
    usersEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    creator:{
        type:mongoose.Schema.Types.ObjectId
    }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;