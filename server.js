require('dotenv').config;

const PORT    = process.env.PORT || 8080;
const ENV     = process.env.ENV || "development";
const origin  = 'http://localhost:3000'
const express = require("express");
const app     = express();

const knex = require('./knex-database/db')


knex.select().table('tweets').then(rows => console.log(rows))

// const tweetRouter = require('./routes/tweet_router');

// app.use(express.json())
// app.use('/', tweetRouter);


// app.listen(PORT, () => {
//     console.log(`🔥 Fired up on PORT ${PORT}`);
// });