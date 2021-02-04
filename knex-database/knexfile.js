require('dotenv').config();

module.exports = {

    development: {
      client: 'pg',
      connection: {
        user: process.env.USER,
        host: process.env.DB_HOST || 'localhost',
        database: 'twitter-dev',
        password: process.env.DB_PASS,
        port: 5432
      },
      useNullAsDefault: true,
      migrations: {
        directory:'./knex-database/migrations'
      },
    },
  
  
  };