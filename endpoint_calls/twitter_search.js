require('dotenv').config({ path: '../.env' })
const axios = require('axios').default;
const pool = require('../database/db');

const bearer = process.env.TWITTER_BEARER_TOKEN
const headers = { headers: { AUTHORIZATION : `Bearer ${bearer}`} }
const query = 'INSERT INTO tweets(id, tweet_text) VALUES($1, $2)'


const fetchTwitterData = (query, callback) => {
    axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${query}&tweet.fields=id,text,author_id,created_at,conversation_id`, headers)
        .then(response => {
            callback(response.data)
        })
        .catch(err => `an error occurred at fetchTwitterData: ${err}`)
}

module.exports = { fetchTwitterData }
// fetch tweets from a certain endpoint
// const fetchTwitterData = (callback) => {
//     axios.get('https://api.twitter.com/2/tweets/search/recent?query=from:petersagal&tweet.fields=referenced_tweets,author_id,created_at', headers)
//        .then(res => {
//          callback(res.data);
//     })
//     .catch(err => `error: ${err}`)
// }

// fetchTwitterData(res => {
//     res.data.forEach(element => {
//         console.log(`tweet: ${element.id} text: ${element.text} author: ${element.author_id} created_at: ${element.created_at}`)
//         if(element.referenced_tweets){
//             console.log(element.referenced_tweets)
//         }
        
//     });
// })

// invoke fetch tweets and save the results to the database
// fetchTwitterData((res) => {
//     pool.connect((err, client, done) => {
//         if ( err ) throw `error: ${err}`;
//         try {
//             console.log('🕶 Connected to the database. Grab a coffee ☕️ and call it a day!')
//             res.data.forEach( row => {
//                 console.log(row)
//                 client.query(query, [row.id, row.text], (err, response) => {
//                     if ( err ){
//                         console.log(err.stack)
//                     } else {
//                         console.log("inserted")
//                     }
//                 })
//             })
//         } finally {
//             done()
//         }
//     })
// })
