const session = require('express-session');

module.exports = function (app) {
    app.use(session({
        'resave': false,
        'saveUninitialized': true,
        'secret': process.env.SESSION_SECRET || 'blowfishsecret'
    }));
};