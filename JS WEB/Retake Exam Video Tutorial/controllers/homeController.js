
const course = require("../models/course");


function getHome(req, res) {
    req.app.locals.title = 'Home';
    const loggedIn = req.cookies['x-auth-token'] !== undefined;

    course.find().then((courses) => {
        if (loggedIn) {
            res.render('userHome.hbs', {
                layout: "main", courses: courses, user: req.user,
                loggedIn: req.cookies['x-auth-token'] !== undefined
            });
        }
        else {
            let displayCourses = courses.sort((a,b) => b.usersEnrolled.length - a.usersEnrolled.length).slice(0, 3);
            res.render('guestHome.hbs', {
                layout: "main", loggedIn: req.cookies['x-auth-token'] !== undefined,
                courses: displayCourses, user: req.user
            });
        }
    });
}

module.exports = {
    getHome
}