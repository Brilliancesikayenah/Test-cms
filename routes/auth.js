 module.exports = function (app) {

 };

// const db = require('../config/mysql')();
// const bcryptjs = require('bcryptjs');

// module.exports = function (app) {
//     app.get('/auth/login',(req, res) => {
//         res.render('login', {'title': 'Log in'});
//     });


//     app.get('/signup', function (req, res) {
//         db.query(`SELECT * FROM users`, function (err, results) {
//                 if (err) res.send(err);
//                 res.render('signup', {'title': '/kontaktside', 'results': results} );
//             });
//         });

       
// app.get('/login',(req, res) => {
// 	res.render('login', {'title': 'Log in'});
// });



// //------------------------------------//
// app.post('/signup', (req, res, next) => {
//     bcryptjs.genSalt(10, (err, salt) => {
//         bcryptjs.hash(req.fields.Password, salt, function(err, hash){
//             db.query('INSERT INTO users SET username = ?, passphrase = ?', [req.fields.username, hash], function(err, result){
//                 if(err)return next(err);
//                 res.redirect('/');
//             })
//         })
//     });

// }) 

// };