require('dotenv').config({ path: '../.env' })
const axios = require('axios').default;

const bearer = process.env.TWITTER_BEARER_TOKEN
const headers = { headers: { AUTHORIZATION : `Bearer ${bearer}`} }


const fetchTwitterData = (query, callback) => {
    axios.get(`https://api.twitter.com/2/tweets/search/recent?max_results=50&query=${query}&tweet.fields=id,text,author_id,created_at,geo,lang,conversation_id,referenced_tweets,public_metrics`, headers)
        .then(response => {
            callback(response.data)
        })
        .catch(err => `an error occurred at fetchTwitterData: ${err}`)
}


module.exports = { fetchTwitterData }

