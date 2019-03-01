const logErrors = require('express-log-errors');

module.exports = function (app) {
    app.use(logErrors());
};