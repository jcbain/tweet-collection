require('dotenv').config()
const axios = require('axios').default;
const pool = require('./database/db');

const bearer = process.env.TWITTER_BEARER_TOKEN
const headers = { headers: { AUTHORIZATION : `Bearer ${bearer}`} }
const query = 'INSERT INTO tweets(id, tweet_text) VALUES($1, $2)'

// fetch tweets from a certain endpoint
const fetchTwitterData = (callback) => {
    axios.get('https://api.twitter.com/2/tweets/search/recent?query=(grumpy cat) -is:retweet', headers)
       .then(res => {
         callback(res.data);
    })
    .catch(err => `error: ${err}`)

}

const queryFormatter = (queryParams, version=2) => {
    let queryString = ""
    if( version ===  2) {
        for( const [key, value] of Object.entries(queryParams)) {
            if( queryParams.initialParams ) {
                queryString += `(${value.split(",").join(" ")})`
            }
        }
    }
    return queryString
}

const queryParams = {
    initialParams: "dog,cat"
}

console.log(queryFormatter(queryParams, 2))

// const fetchTwitterData2 = (callback, version=2, queryParams, responseParams) => {
//     const domain = "https://api.twitter.com";
//     const endpoint = version === 2 ? `${domain}/2/tweets/search/recent?query=` : `${domain}/search/tweets.json?q=`;
//     let queryString = ""

// }



// // invoke fetch tweets and save the results to the database
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
