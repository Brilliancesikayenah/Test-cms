const express = require('express');

module.exports = function (app) {
    app.set('views', 'views');
    app.set('view engine', 'ejs');
    app.use(express.static('./public'));
    app.use( function(req, res, next) {
        res.locals.bruger = req.session.user;
        next();
    });
};