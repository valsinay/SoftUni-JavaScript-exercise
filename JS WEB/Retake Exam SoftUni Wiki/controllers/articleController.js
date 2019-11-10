const Article = require('../models/article');
const User = require('../models/user');
const { validationResult } = require('express-validator');

function getCreate(req, res) {
    req.app.locals.title = 'Create Article';
    res.render('articles/create.hbs');
}

function postCreate(req, res) {

    const { title, description } = req.body;

    Article.create({ title, description, author: req.user.id }).
        then((article) => {
            req.user.createdArticles.push(article._id)
            return User.findByIdAndUpdate({ _id: req.user._id }, req.user)
        })
        .then(() => {
            res.redirect('/');

        })
        .catch(err => {
            console.log(err)
            res.render('articles/create', { message: err.message })
        })
}

function getDetails(req, res) {
    req.app.locals.title = 'Article Details';
    const id = req.params.id;

    Article
        .findById(id)
        .then((article) => {
            article.isAuthor = article.author.toString() === req.user._id.toString();
            article.paragraphs = article.description.split('\r\n\r\n');
            res.render('articles/details.hbs', { article });
        });

}
function getAll(req, res, next) {

    Article.find()
        .select('title')
        .then((articles) => {
            res.render('articles/all.hbs', { articles })
        })

}

function getEdit(req, res) {
    req.app.locals.title = 'Edit Article';
    const id = req.params.id;
    const { description } = req.body;

    console.log(description)
   
    Article
        .findById(id)
        .then((article) => {
            res.render('articles/edit.hbs', { article });
        })
}

function postEdit(req, res) {

    const id = req.params.id;
    const { description } = req.body;

    Article.findByIdAndUpdate({ _id: id }, { description }).then((article) => {
        res.redirect('home.hbs', { article });
    })
        .catch(console.error)
}

function deleteArticle(req, res) {
    const id = req.params.id;

    Article.findByIdAndRemove(id)
        .then(() => {
            res.redirect('articles/all.hbs')
        });
}

module.exports = {
    getCreate,
    postCreate,
    getDetails,
    getEdit,
    postEdit,
    deleteArticle,
    getAll
}