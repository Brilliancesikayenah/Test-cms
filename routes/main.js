const db = require('../config/mysql')();
const bcryptjs = require('bcryptjs');

module.exports = function (app) {


	app.get('/', (req, res, next) => { 
        res.render('page', { title: 'Hello, World!', content: '' });
    });

    // ==============Admin=============== //

    app.get('/admin', (req,res) => {
        res.render('pages', { 'title': 'Admin', 'content': 'Super secret page!!' });
    });

      /*  app.use('/admin', (req, res, next) => {
        if ( req.session.level >= 100 ) {
            next();
        } else {
            res.redirect('/');
        }
    });*/

    
app.get('/admin/categories', (req, res) => {
	res.render('categories');
});


app.get('/admin/siteinfo', (req, res) => {
	res.render('siteinfo');
});

app.get('/admin/brands', (req, res) => {
	res.render('brands');
});

app.get('/admin/pages', (req, res) => {
	res.render('pages');
});

// ============================= //


//----------------- Produkter----------------//
app.get('/admin/products', (req, res) => {
	db.query(`SELECT cat.id, products, cat_names, price FROM cat_cafe.cat;`, function(err, results){
		if (err) res.send(err);
		res.render('products', {'title': 'Home', 'results' : results} );
	});
});


app.get('/admin/users', (req, res) => {
	db.query(`SELECT users.id, users.username, passphrase, roles_id FROM cat_cafe.users;`, function(err, results){
		if (err) res.send(err);
		res.render('users', {'title': 'Home', 'results': results} );
	});
});

// ============Login================= //

app.get('/login',(req, res) => {
	res.render('login', {'title': 'Log in'});
});

/*app.get('/', (req, res, next) => {
    res.render('login', { 'title': 'Hello, World!', 'content': `It's nice to meet you :-)` });
});*/

app.post('/login', (req, res, next) => {
    db.query(`SELECT users.id, users.username, users.passphrase, roles.level
    FROM users 
    INNER JOIN roles ON users.roles_id = roles.id
    WHERE username = ?;`, [req.fields.username], function(err, result) {
        if(err)return next(err);
        if(result.length === 1){
            if(bcryptjs.compareSync(req.fields.password, result[0].passphrase)){
                req.session.user = result[0].id;
                req.session.level = result[0].level;
                //console.log(req.session.level);
                res.redirect('/admin')
            }
        }
    })
})

app.get('/login', (req, res, next) => {
    res.render('login');        
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});



app.post('/signup', (req, res, next) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(req.fields.Password, salt, function(err, hash){
            db.query('INSERT INTO users SET username = ?, passphrase = ?, roles_id = 5', [req.fields.brugernavn, hash], function(err, result){
                if(err)return next(err);
				res.redirect('/');
			
            })
        })
    });

})

// ==============productsOpret=============== //

app.get('/admin/products/opret', (req, res) => {
    res.render('create_product', {'title' : 'Opret produkt'});
});

    app.post('/admin/products/opret', (req, res) => {
        let success = true; 
        let errorMessage;
        
        
        //Validating 
        if(req.fields){
            if(!req.fields.cat_names || !req.fields.cat_names.length > 1){
                success = false;
                errorMessage = "Navn felt er tom";
            } 
            else if(!req.fields.description || !req.fields.description.length > 1){
                success = false;
                errorMessage = "Beskrivelse felt er tom";
            }
            else if(!req.fields.price || !req.fields.price.length > 1  /*|| !parseInt(req.fields.price)*/){
                success = false;
                errorMessage= "Pris felt er tom"
            }
            else if(!req.fields.products || !req.fields.products.length > 1 ){
                success = false;
                errorMessage= "products felt er tom"
            }
            
        } else {
            success = false;
            errorMessage = "Alt er forkert";
        }//End of validation
        
        if(success){
            let sql = `INSERT INTO cat (cat_names, price, description, products)
            VALUES (?, ?, ?, ?);`;
        
            db.query(sql, [req.fields.cat_names, req.fields.price, req.fields.description, req.fields.products], function(err, results){
                if(err) throw err;
                res.redirect('/admin/products/');
            });
        } else {
                res.render('create_product', {'title' : 'Opret produkt', 'errorMessage' : errorMessage});
        }
    
        });

   
// ============= Admin================ //

app.get('/admin/products/slet/:id', (req, res) => {
	let sql = `DELETE FROM cat_cafe.cat WHERE id = ?;`;

	db.query(sql, [req.params.id], function(err, results){
		res.redirect('/admin/products/');
	});
});

app.get('/admin/products/:id', function (req, res) {
    let id = req.params.id;
    db.query(`SELECT id, cat_names,description,products,price  FROM cat_cafe.cat WHERE id = ?`, [id], function (err, results){
        if(err){
            throw err;
        }
        res.render("products_update", {'result': results[0]})
    });
});


app.patch('/admin/products/', function (req, res){
    let id = req.fields.id
    db.query(`UPDATE cat SET cat_names = ?, description = ?, products = ?, price = ? WHERE id = ?`, [req.fields.cat_names, req.fields.description, req.fields.products, req.fields.price, id], function (err, result){
        if(err){
         throw err;
        }

        res.json({ successful : true})
        res.status(200);
        res.end();
    })
    
})





/*app.patch('/admin/products/edit/:id', (req, res) =>  {
    let success = true;

    if(!req.fields.description || req.fields.products || req.fields.price || req.fields.cat_names){
        success = false;
    }

    if ( success === true ) {
        db.query(`UPDATE cat SET cat_names = ?, description = ?, products = ?, price = ? WHERE id = ?;`, [req.fields.cat_names, req.fields.description, req.fields.products, req.fields.price, req.params.id], (err, result) => {
            
                if(err) throw(err);
                res.status(202);
                res.end();
            });

        } else {
            res.status(405);
            res.end();
        }
    });*/


// ============================= //


// ==============UsersOpret=============== //

app.get('/admin/users/opret', (req, res) => {
    res.render('create_user', {'title' : 'Opret bruger'});

});

app.post('/admin/users/opret', (req, res, next) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(req.fields.Password, salt, function(err, hash){
            db.query('INSERT INTO users SET username = ?, passphrase = ?, roles_id = 5', [req.fields.username, hash], function(err, result){
                if(err)return next(err);
                res.redirect('/admin/users');
            })
        })
    });

});
app.get('/admin/users/slet/:id', (req, res) => {
	let sql = `DELETE FROM cat_cafe.users WHERE id = ?;`;

	db.query(sql, [req.params.id], function(err, results){
		res.redirect('/admin/users');
	});
});


app.get('/admin/users/:id', function (req, res) {
    let id = req.params.id;
    db.query(`SELECT id, username, passphrase, roles_id  FROM cat_cafe.users WHERE id = ?`, [id], function (err, results){
        if(err){
            throw err;
        }
        res.render("users_update", {'result': results[0]})
    });
});


app.patch('/admin/users/', function (req, res){
    let id = req.fields.id
    db.query(`UPDATE users SET  username = ? , roles_id = ? WHERE id = ?`, [req.fields.username, req.fields.roles_id, id], function (err, result){
        if(err){
         throw err;
        }

        res.json({ successful : true})
        res.status(200);
        res.end();
    })
    
})



// ========================================== //



};