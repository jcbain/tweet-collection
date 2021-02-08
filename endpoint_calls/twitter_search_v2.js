require('dotenv').config()
const axios = require('axios').default;

const bearer = process.env.TWITTER_BEARER_TOKEN;
const headers = { headers: { AUTHORIZATION : `Bearer ${bearer}`} };

const defaultTweetFields = [
    'id','text','author_id','context_annotations',
    'geo','conversation_id','withheld','possibly_sensitive',
    'referenced_tweets', 'public_metrics'
];

const fetchTwitterData = async (query, tweetFields = defaultTweetFields) => {
    const endpoint = 'https://api.twitter.com/2/tweets/search/recent'
    const queryString = `query=${query}`;
    const tweetReturns = tweetFields.join(',');
    const fullEndpointRequest = `${endpoint}?${queryString}&tweet.fields=${tweetReturns}`;
    const response = await axios.get(fullEndpointRequest, headers);

    return response;
}

// fetchTwitterData('frm:mtgreenee')
//     .then(resp => console.log(resp))
//     .catch(err => console.log(err))

module.exports = { fetchTwitterData };
