require('dotenv').config;

const dbConfig = {
    user: process.env.USER,
    host: process.env.DB_HOST || 'localhost',
    database: 'twitter',
    password: process.env.DB_PASS,
    port: 5432
}

const knex = require('knex')({
    client: 'pg',
    connection: dbConfig,
    debug: true,
});


module.exports = knex;