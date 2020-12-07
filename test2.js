const { runJob } = require('./index');
const CronJob = require('cron').CronJob;
const pool = require('./database/db');
const { getAllJobs } = require('./database/queries/pullQueries');
const { fetchTwitterData } = require('./endpoint_calls/twitter_search');
const { insertIntoTweets, insertIntoTweetMetrics, insertIntoReferencedTweets, insertIntoAllJobs } = require('./database/queries/insertQueries');

const options = {interval: '* * * * *', stopInterval: 180000};

const runJobs = (callback, options) => {
    const { interval, stopInterval } = options;

    const start = Date.now();
    const end = start + stopInterval;
    let counter = 0;
    conversations = []
    let conversationIndex = -1;
    
    const job = new CronJob(
        interval,
        function() {
            const tweetId = conversations.length > 0 ? conversations[conversationIndex].id : '';
            callback(counter, `conversation_id:${tweetId}`);
            counter += 1;
            conversationIndex += 1;
            if (Date.now() > end) {
                this.stop()
            }
        },
        null,
        true,
        'America/Edmonton'
    )

}

const someFunction = (endpointQuery='from:realdonaldtrump') => {

    const tweetString = 'INSERT INTO tweets(id, tweet_text, author_id, created_at, conversation_id, lang, job_query) VALUES($1, $2, $3, $4, $5, $6, $7)';
    const metricsString = 'INSERT INTO tweet_metrics(tweet_id, collected_at, retweet_count, reply_count, like_count, quote_count) VALUES($1, $2, $3, $4, $5, $6)';
    const referenceString = 'INSERT INTO referenced_tweets(tweet_id, conversation_id, reference_type) VALUES($1, $2, $3)';
        fetchTwitterData(endpointQuery, resp => {
            pool.connect((err, client, done ) => {
                if(err) throw `error: ${err}`;
                try {
                    const now = new Date;
                    conversations = resp.data;
                    resp.data.forEach( (row, i) => {
                        insertIntoTweets(client, tweetString, row, endpointQuery)
                        insertIntoTweetMetrics(client, metricsString, row, now)
                        insertIntoReferencedTweets(client, referenceString, row)
                        insertIntoAllJobs(client, row)
                    })

                } finally {
                    done()
                }
            })
        })
}

const someFunction2 = (endpointQuery) => {

    const tweetString = 'INSERT INTO tweets(id, tweet_text, author_id, created_at, conversation_id, lang, job_query) VALUES($1, $2, $3, $4, $5, $6, $7)';
    const metricsString = 'INSERT INTO tweet_metrics(tweet_id, collected_at, retweet_count, reply_count, like_count, quote_count) VALUES($1, $2, $3, $4, $5, $6)';
    const referenceString = 'INSERT INTO referenced_tweets(tweet_id, conversation_id, reference_type) VALUES($1, $2, $3)';
        fetchTwitterData(endpointQuery, resp => {
            pool.connect((err, client, done ) => {
                if(err) throw `error: ${err}`;
                try {
                    const now = new Date;
                    if(resp.data) {

                        resp.data.forEach( (row, i) => {
                            insertIntoTweets(client, tweetString, row, endpointQuery)
                            insertIntoTweetMetrics(client, metricsString, row, now)
                            insertIntoReferencedTweets(client, referenceString, row)
                        })
                    }

                } finally {
                    done()
                }
            })
        })
}

const runFunction = (counter, newQuery) => {
    if(counter === 0) {
        someFunction('from:realdonaldtrump')
    } else {
        someFunction2(newQuery)
    }
    
}

// runJob(() => console.log("yuppers"), options)
runJobs( runFunction, options )

// if from user you are wanting to pull tweets from, 
// pull tweets