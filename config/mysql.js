module.exports = (function () {
    const mysql = require('mysql2');
    return () => mysql.createPool({
        'connectionLimit': 10,
        'host': process.env.DB_HOST || 'localhost',
        'port': process.env.DB_PORT || 3306,
        'user': process.env.DB_USER || 'root',
        'password': process.env.DB_PSWD || '',
        'database': process.env.DB_DTBS || 'cat_cafe'

    });
}());