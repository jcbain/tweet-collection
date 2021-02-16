require('dotenv').config()
const axios = require('axios').default;

// const bearer = process.env.TWITTER_BEARER_TOKEN;
const bearer = process.env.TWITTER_BEARER_IMMIGEO
const headers = { headers: { AUTHORIZATION : `Bearer ${bearer}`} };


const defaultTweetFields = [
    'id','text','author_id','context_annotations',
    'geo','conversation_id','withheld','possibly_sensitive',
    'referenced_tweets', 'public_metrics'
];

const fetchTwitterData = async (query, all = false, tweetFields = defaultTweetFields) => {
    const searchEndpoint = all ? 'all/' : 'recent/'
    const endpoint = 'https://api.twitter.com/2/tweets/search/'
    const queryString = `query=${query}`;
    const tweetReturns = tweetFields.join(',');
    const fullEndpointRequest = `${endpoint}${searchEndpoint}?${queryString}&tweet.fields=${tweetReturns}`;
    const response = await axios.get(fullEndpointRequest, headers);

    return response;
}

const fetchTwitterGeoData = async (query, nextToken, all=false,tweetFields = defaultTweetFields) => {
    const searchEndpoint = all ? 'all/' : 'recent/'
    const endpoint = 'https://api.twitter.com/2/tweets/search/'
    const next = nextToken ? `&next_token:${nextToken}` : '';
    const queryString = `query=${query}`;
    const tweetReturns = tweetFields.join(',');

    const fullEndpointRequest = `${endpoint}${searchEndpoint}?${queryString}${next}&tweet.fields=${tweetReturns}`;
    console.log(fullEndpointRequest)
}


module.exports = { fetchTwitterData, fetchTwitterGeoData };
