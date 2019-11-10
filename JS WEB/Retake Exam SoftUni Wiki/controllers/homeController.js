
const Article = require("../models/article");


function getHome(req, res) {
    req.app.locals.title = 'Home';

    Article.find()
        .sort('-creationDate')
        .limit(3)
        .then((articles) => {
            articles.forEach(a => {
                a.description = a.description.split(' ').slice(0, 50).join(' ') + "...";
            })

            res.render('home.hbs', { articles });
        });
}

module.exports = {
    getHome
}