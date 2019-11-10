const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.engine('hbs', handlebars({ extname: '.hbs' }));
    app.set('views', path.join(__dirname, '../views'));
  
};