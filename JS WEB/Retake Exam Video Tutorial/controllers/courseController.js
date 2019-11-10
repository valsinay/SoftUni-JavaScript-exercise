const Course = require('../models/course');
const User = require('../models/user');
const { validationResult } = require('express-validator');

function getCreate(req, res) {
    req.app.locals.title = 'Create Course';
    res.render('courses/create.hbs', { user: req.user, loggedIn: req.cookies['x-auth-token'] !== undefined });
}

function postCreate(req, res, next) {

    const { title, description, imageUrl, isPublic } = req.body;

    const createdAt = time();


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('courses/create.hbs', {
            message: errors.array()[0].msg,
            oldInput: req.body,
            user: req.user, 
            loggedIn: req.cookies['x-auth-token'] !== undefined
        })
    }

    Course.create({ title, description, imageUrl, isPublic, createdAt, creator: req.user.id }).
        then(course => {
            res.redirect('/');
        })
}

function time() {
    let today = new Date();
    let hours = String(today.getHours()).padStart(2, '0');
    let mm = String(today.getMinutes() + 1).padStart(2, '0');
    let seconds = String(today.getSeconds() + 1).padStart(2, '0');
    let time = hours + ":" + mm + ":" + seconds;

    return today = today.toDateString() + " " + time;
}

function getDetails(req, res, next) {
    req.app.locals.title = 'Course Details';
    const { id } = req.params;
    let userHasEnrolled = false;
    if (req.user.enrolledCourses.indexOf(id) != -1) {
        userHasEnrolled = true;
    }

    Course.findById(id).then((course) => {
        res.render('courses/details.hbs', {
            course: course, loggedIn: req.cookies['x-auth-token'] !== undefined,
            isCreator: req.user.id.toString() === course.creator.toString(),
            userHasEnrolled: userHasEnrolled,
            user: req.user
        });
    });

}


function enrollUser(req, res) {
    let courseId = req.params.id;

    User.updateOne({ _id: req.user.id }, { $push: { enrolledCourses: courseId } }).then(user => {
        Course.updateOne({ _id: courseId }, { $push: { usersEnrolled: req.user.id } }).then(course => {
            res.redirect('/');
        })
    })

}

function getEdit(req, res) {
    req.app.locals.title = 'Edit Course';
    let courseId = req.params.id;

    Course.findById(courseId).then((course) => {
        res.render('courses/edit.hbs', { course: course, user: req.user, loggedIn: req.cookies['x-auth-token'] !== undefined });
    })
}

function postEdit(req, res) {

    let courseId = req.params.id;

    const { title, description, imageUrl } = req.body;

    Course.findOneAndUpdate({ _id: courseId }, { title, description, imageUrl }).then((course) => {
        res.redirect('/');
    })
}

function deleteCourse(req, res) {
    let courseId = req.params.id;

    Course.deleteOne({ _id: courseId }).then(course => {
        res.redirect('/')
    });
}

module.exports = {
    getCreate,
    postCreate,
    getDetails,
    enrollUser,
    getEdit,
    postEdit,
    deleteCourse
}