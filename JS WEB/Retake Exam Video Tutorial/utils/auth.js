const jwt = require('./jwt');
const User = require('../models/user');

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        const token = req.cookies['x-auth-token'] || '';
        Promise.all([
            jwt.verifyToken(token),
        ]).then(([data]) => {
            User.findById(data.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            if (!redirectUnauthenticated) { next(); return; }
            next(err);
        });
    };
}

module.exports = auth;