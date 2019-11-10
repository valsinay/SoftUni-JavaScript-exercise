
const Expense = require("../models/expense");

function getHome(req, res) {
    req.app.locals.title = 'Home';
    
    Expense.find().then((expenses) => {
       
        res.render('index.hbs', { expenses });
    });
}

function notFound(req,res){
    req.app.locals.title = "404 Error"

    res.render('404.hbs');
}

module.exports = {
    getHome,
    notFound
}