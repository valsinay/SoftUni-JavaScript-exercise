const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use((req, res, next) => {
        res.locals.isLogged = req.cookies['x-auth-token'] !== undefined;
        res.locals.username = req.cookies['username'];

        next();
    });
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.engine('hbs', handlebars({ extname: '.hbs' }));
    app.set('views', path.join(__dirname, '../views'));

};