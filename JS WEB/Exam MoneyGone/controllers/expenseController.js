const Expense = require('../models/expense');
const User = require('../models/user');

function getCreate(req, res) {
    req.app.locals.title = 'Add Expense';
    res.render('expenses/create.hbs');
}

function postCreate(req, res) {

    let { merchant, total, category, description, report } = req.body;

    const date = time();
    if (report === "on") {
        report = Boolean(true);
    }
    else{
        report = Boolean(false);
    }

    Expense.create({ merchant, total, category, description, creator: req.user.id, date, report :report}).
        then((expense) => {
            req.user.amount -= total;
            req.user.expenses.push(expense._id)
            return User.findByIdAndUpdate({ _id: req.user._id }, req.user)
        })
        .then(() => {
            res.redirect('/');

        })
        .catch(err => {
            console.log(err)
            res.render('expenses/create.hbs', { message: err.message })
        })
}

function time() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}

function getReport(req,res){
    const id = req.params.id;

    Expense.findById(id)
    .then((expense) => {

        res.render('expenses/report.hbs', {expense})
    })

}
function getTotalAmount(req, res, next) {

    Expense.find()
        .select('title')
        .then((expenses) => {
            res.render('expenses/account-ifno.hbs', { expenses })
        })

}


function deleteExpense(req, res) {
    let id = req.params.id;
    Expense.deleteOne({ _id: id }).then(expense => {
        res.redirect('/');
    });
}

function postRefill(req,res){
    const {amount } = req.body;
   
    User.findOneAndUpdate({_id:req.user._id}, {$inc: {amount: amount}})
    .then(() => {
        res.redirect("/")
    })
    
}

module.exports = {
    getCreate,
    postCreate,
    deleteExpense,
    getTotalAmount,
    postRefill,
    getReport
}