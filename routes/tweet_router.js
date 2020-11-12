const express = require('express');
const router = express.Router();
const cors = require('cors')
const pool = require('../database/db');


// const origin  = 'http://localhost:3000';

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

pool.connect( () => console.log("connected to thd db"))

const getAllJobs = async () => {
    const query = "SELECT * FROM jobs";
    return await pool.query(query)
        .then(resp => resp.rows)
        .catch(err => `There was an error thrown at getAllJobs(): ${err}`)
}

router.get('/', cors(corsOptions), (req, res) => {
    getAllJobs()
        .then(resp => res.json(resp))
        .catch(err => console.log(err.stack))
})

router.post('/:id', cors(corsOptions), (req, res) => {
    console.log(req.body)
})

module.exports = router;