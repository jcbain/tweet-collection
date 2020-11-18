const express = require('express');
const router = express.Router();
const cors = require('cors')
const pool = require('../database/db');
const { fetchTwitterData } = require('../endpoint_calls/twitter_search');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}



const getAllJobs = async () => {
    const client = await pool.connect(console.log("🔌 Connected to the db"))
    const query = "SELECT * FROM jobs";
    return await client.query(query)
        .then(resp => resp.rows)
        .catch(err => `There was an error thrown at getAllJobs(): ${err}`)
}


router.get('/', cors(corsOptions), (req, res) => {

    getAllJobs()
        .then(resp => res.json(resp))
        .catch(err => console.log(err.stack))
})

router.post('/:id', cors(corsOptions), (req, res) => {
    const { query, jobId } = req.body;
    const queryString = 'INSERT INTO tweets(id, tweet_text, author_id, created_at, conversation_id, lang, job_id) VALUES($1, $2, $3, $4, $5, $6, $7)';
    const metricsString = 'INSERT INTO tweet_metrics(tweet_id, collected_at, retweet_count, reply_count, like_count, quote_count) VALUES($1, $2, $3, $4, $5, $6)';
    const referenceString = 'INSERT INTO referenced_tweets(tweet_id, conversation_id, reference_type) VALUES($1, $2, $3)';
    console.log(query)
    fetchTwitterData(query, resp => {
            pool.connect(( err, client, done ) => {
                if (err) throw `error: ${err}`;
                try {
                    console.log("🔌 Connected to the db");
                    const now = new Date;
                    resp.data.forEach( (row, i) => {
                        if (i === 0) res.json(row)
                        client.query(queryString, [row.id, row.text, row.author_id, row.created_at, row.conversation_id, row.lang, jobId], (err, response) => {
                            if (err) {
                                console.log(err.stack);
                            } else {
                                console.log('inserted row')
                            }
                        })
                        const { public_metrics, referenced_tweets } = row;
                        client.query(metricsString, [row.id, now, public_metrics.retweet_count, public_metrics.reply_count, public_metrics.like_count, public_metrics.quote_count],  (err, response) => {
                            if (err) {
                                console.log(err.stack);
                            } else {
                                console.log('inserted row')
                            }
                        })
                        if (referenced_tweets) {
                            referenced_tweets.forEach(tweet => {
                                client.query(referenceString, [row.id, tweet.id, tweet.type],  (err, response) => {
                                    if (err) {
                                        console.log(err.stack);
                                    } else {
                                        console.log('inserted row ref')
                                    }
                                })
                            })
                        }
                    })

                } finally {
                    done()
                }
            });
        })
    
})

module.exports = router;