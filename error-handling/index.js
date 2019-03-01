
module.exports = function (app) {
    require('./routing')(app);
    require('./logging')(app);
};