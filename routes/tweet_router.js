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
    const queryString = 'INSERT INTO tweets(id, tweet_text, author_id, created_at, conversation_id, job_id) VALUES($1, $2, $3, $4, $5, $6)'
    console.log(query)
    fetchTwitterData(query, resp => {
            pool.connect(( err, client, done ) => {
                if (err) throw `error: ${err}`;
                try {
                    console.log("🔌 Connected to the db");
                    resp.data.forEach( (row, i) => {
                        if (i === 0) res.json(row)
                        client.query(queryString, [row.id, row.text, row.author_id, row.created_at, row.conversation_id, jobId], (err, response) => {
                            if (err) {
                                console.log(err.stack);
                            } else {
                                console.log('inserted row')
                            }
                        })
                    })

                } finally {
                    done()
                }
            });
        })
    
})

module.exports = router;