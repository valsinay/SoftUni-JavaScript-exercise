const User = require("../models/user")
const jwt = require("../utils/jwt");
const Expense = require('../models/expense')

function getRegister(req, res) {
    req.app.locals.title = "Register";

    res.render('auth/register.hbs');
}

function getLogin(req, res) {
    req.app.locals.title = "Login";

    res.render('auth/login.hbs');
}

function postLogin(req, res) {

    req.app.locals.title = 'Login';
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
            if (!match) {
                res.render('auth/login.hbs', { message: 'Wrong password or username!' });
                return;
            }
            const token = jwt.createToken({ id: user._id });
            res
                .cookie('x-auth-token', token)
                .cookie('username', user.username)
                .redirect('/')
        });
}

function postRegister(req, res, next) {

    const { username, password, repeatPassword, amount } = req.body;
    if (password !== repeatPassword) {
        res.render('auth/register.hbs', {
            errors: {
                repeatPassword: 'Password and repeat password don\'t match!'
            }
        });
        return;
    }

    return User.create({ username, password, amount }).then(() => {
        res.redirect('login');
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.render('auth/register.hbs', {
                errors: {
                    username: 'Username already taken!'
                }
            });
            return;
        }
        next(err);
    });
}

function logout(req, res, next) {

    res.clearCookie('x-auth-token')
        .clearCookie('username')
        .redirect('/');
}

function getAccount(req, res) {
    req.app.locals.title = "Account info";

    let userId = req.user._id;
    const user = User.findById(userId).populate("Expenses");
    console.log(userId)
    let expensesAmount = 0;
    for (let expenseId of user.expenses) {
        let expense = Expense.findById(expenseId);
        expensesAmount += Number(expense.total);
    }
    res.render('expenses/account-info.hbs',{user,expensesAmount});
}

module.exports = {
    getRegister,
    getLogin,
    postRegister,
    postLogin,
    logout,
    getAccount
}