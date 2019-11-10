const Cube = require("../models/modelCube");

function getHome(req, res, next) {
    req.app.locals.title = 'Home';
    Cube.find(function (err, cubics) {
        if (err) throw err;
        res.render('index.hbs', {layout:"main", cubes:cubics});

    });
}

function getAbout(req, res) {
    req.app.locals.title = "About";
    res.render('about.hbs');
}


function notFound(req, res) {
    req.app.locals.title = '404';
    res.render('404.hbs');
}

module.exports = {
    getHome,
    getAbout,
    notFound
}