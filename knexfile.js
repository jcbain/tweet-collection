// Update with your config settings.
require('dotenv').config();


module.exports = {

  development: {
    client: 'pg',
    connection: {
        user: process.env.USER,
        host: process.env.DB_HOST || 'localhost',
        database: 'twitter',
        password: process.env.DB_PASS,
        port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./knex-database/migrations',
      tableName: 'knex_migrations'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
