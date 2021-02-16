require('dotenv').config()
const axios = require('axios').default;

// const bearer = process.env.TWITTER_BEARER_TOKEN;
const bearer = process.env.TWITTER_BEARER_IMMIGEO
const headers = { headers: { AUTHORIZATION : `Bearer ${bearer}`} };


const defaultTweetFields = [
    'id','text','author_id','context_annotations',
    'geo','conversation_id','withheld','possibly_sensitive',
    'referenced_tweets', 'public_metrics', 'created_at'
];

const fetchTwitterData = async (query, all = false, tweetFields = defaultTweetFields) => {
    const searchEndpoint = all ? 'all' : 'recent'
    const endpoint = 'https://api.twitter.com/2/tweets/search/'
    const queryString = `query=${query}`;
    const tweetReturns = tweetFields.join(',');
    const fullEndpointRequest = `${endpoint}${searchEndpoint}?${queryString}&tweet.fields=${tweetReturns}`;
    const response = await axios.get(fullEndpointRequest, headers);

    return response;
}

const fetchTwitterGeoData = async (query, nextToken, all = false, starting = '2015', tweetFields = defaultTweetFields) => {
    const searchEndpoint = all ? 'all' : 'recent'
    const endpoint = 'https://api.twitter.com/2/tweets/search/'
    const next = nextToken ? `&next_token=${nextToken}` : '';
    const startDate = starting ? `&start_time=${starting}-01-01T00:00:00Z` : ''
    const queryString = `query=${query}`;
    const tweetReturns = tweetFields.join(',');

    const fullEndpointRequest = `${endpoint}${searchEndpoint}?${queryString}${next}${startDate}&tweet.fields=${tweetReturns}&max_results=50`;
    const response = await axios.get(fullEndpointRequest, headers);
    return response;
}


module.exports = { fetchTwitterData, fetchTwitterGeoData };
