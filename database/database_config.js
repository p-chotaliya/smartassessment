const mariadb = require('mariadb/callback');

const pool = mariadb.createPool({
    host: 'parth-database.c4147knyn44w.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: '',
    port: 3306,
    database: 'smartass',
    connectionLimit: 5
})



module.exports = pool;
