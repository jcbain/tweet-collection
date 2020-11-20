const express = require('express');
const router = express.Router();
const cors = require('cors')
const pool = require('../database/db');
const { fetchTwitterData } = require('../endpoint_calls/twitter_search');
const { getAllJobs } = require('../database/queries/pullQueries')
const { insertIntoTweets, insertIntoTweetMetrics, insertIntoReferencedTweets } = require('../database/queries/insertQueries');

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
    const { query, jobId } = req.body;
    const tweetString = 'INSERT INTO tweets(id, tweet_text, author_id, created_at, conversation_id, lang, job_id) VALUES($1, $2, $3, $4, $5, $6, $7)';
    const metricsString = 'INSERT INTO tweet_metrics(tweet_id, collected_at, retweet_count, reply_count, like_count, quote_count) VALUES($1, $2, $3, $4, $5, $6)';
    const referenceString = 'INSERT INTO referenced_tweets(tweet_id, conversation_id, reference_type) VALUES($1, $2, $3)';
    fetchTwitterData(query, resp => {
            pool.connect(( err, client, done ) => {
                if (err) throw `error: ${err}`;
                try {
                    console.log("🔌 Connected to the db");
                    const now = new Date;
                    resp.data.forEach( (row, i) => {
                        // if (i === 0) res.json(row)
                        insertIntoTweets(client, tweetString, row, jobId)
                        insertIntoTweetMetrics(client, metricsString, row, now)
                        insertIntoReferencedTweets(client, referenceString, row)
                    })

                } finally {
                    done()
                }
            });
        })
    
})

module.exports = router;