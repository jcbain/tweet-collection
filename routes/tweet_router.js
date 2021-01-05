const express = require('express');
const router = express.Router();
const cors = require('cors')
const pool = require('../database/db');
const { fetchTwitterData } = require('../endpoint_calls/twitter_search');
const { getAllJobs } = require('../database/queries/pullQueries')
const { insertIntoTweets, insertIntoTweetMetrics, insertIntoReferencedTweets } = require('../database/queries/insertQueries');
const { runJobs, collectTweets, defaultOptions } = require('../crons/collect_tweets_per_minute')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}


const getLatestJobTweets = async (pool, id) => {
    const client = await pool.connect(console.log("🔌 Connected to the db"))
    const query = "SELECT * FROM tweets WHERE job_id = $1 ORDER BY created_at DESC LIMIT 10";
    return await client.query(query, [id])
        .then(resp => resp.rows)
        .catch(err => `There was ann error thrown at getLatestJobTweets(): ${err}`)
}


router.get('/', cors(corsOptions), (req, res) => {
    getAllJobs(pool)
        .then(resp => res.json(resp))
        .catch(err => console.log(err.stack))
})


router.get('/:id', cors(corsOptions), (req, res) => {
    getLatestJobTweets(pool, req.params.id)
        .then(resp => res.json(resp))
        .catch(err => console.log(err.stack))
})


router.post('/:id', cors(corsOptions), (req, res) => {
    const { hours, query } = req.body;
    const options = {...defaultOptions, stopInterval: 1000 * 60 * 60 * hours, runQuery: query}
    runJobs( collectTweets, options )  
})

module.exports = router;