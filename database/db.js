require('dotenv').config()
const { Pool } = require("pg");

const config = {
    user: process.env.USER,
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'tweets',
    password: process.env.DB_PASS,
    port: 5432
};

const pool = new Pool(config);

module.exports = pool;