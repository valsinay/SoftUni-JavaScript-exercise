
const bcrypt = require('bcrypt')
const saltRounds = 10;
const config = require('../config/config');
const jwt = require('jsonwebtoken');

function getRegister(req, res) {
    req.app.locals.title = "Register";

    res.render('auth/register.hbs');
}

function getLogin(req, res) {
    req.app.locals.title = "Login";

    res.render('auth/login.hbs');
}
function postLogin(req, res) {

    const { username, password } = req.body;

    User.findOne({ username: username }, function (err, user) {
        if (err) throw err;

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) throw err;
                if (result) {
                  let token = jwt.sign(user.username,config.secret, {expiresIn:60*60});
                  console.log(token);
                  res.redirect('/');
                }
            })
        }
    })

   
}

function postRegister(req, res) {


    let username = req.body.username;
    let password = req.body.password;
    let rePassword = req.body.repeatPassword;

    if (password === rePassword) {

        let createdUser = new User({
            username: username,
            password: password
        });

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) throw err;

                createdUser.password = hash;
                createdUser.save(function (err) {
                    if (err) throw err;
                });
            })
        })
        res.redirect('login');
    }

    else {
        res.redirect('register');
    }
}

module.exports = {
    getRegister,
    getLogin,
    postRegister,
    postLogin
}