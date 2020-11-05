require('dotenv').config({ path: '../.env' })
const axios = require('axios').default;
const pool = require('../database/db');

const bearer = process.env.TWITTER_BEARER_TOKEN
const headers = { headers: { AUTHORIZATION : `Bearer ${bearer}`} }


const config = {
    method: 'POST',
    url: 'https://api.twitter.com/2/tweets/search/stream/rules',
    data: { "add": [{ "value": "cat has:images", "tag": "cats with images" }]},
    headers: { AUTHORIZATION : `Bearer ${bearer}`}
}




axios(config)
    .then(response => {
        console.log(JSON.stringify(response.data));
    })
    .catch(error => {
        console.log(error);
    });

