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
            const query = counter === 0 ? 'from:realdonaldtrump' : `conversation_id:${tweetId}`;
            callback(query, counter === 0);
            counter += 1;
            conversationIndex = conversationIndex < conversations.length ? conversationIndex + 1 : 0;
            if (Date.now() > end) {
                this.stop()
            }
        },
        null,
        true,
        'America/Edmonton'
    )

}

const mainFunction = (endpointQuery, isParent) => {
    const tweetString = 'INSERT INTO tweets(id, tweet_text, author_id, created_at, conversation_id, lang, job_query) VALUES($1, $2, $3, $4, $5, $6, $7)';
    const metricsString = 'INSERT INTO tweet_metrics(tweet_id, collected_at, retweet_count, reply_count, like_count, quote_count) VALUES($1, $2, $3, $4, $5, $6)';
    const referenceString = 'INSERT INTO referenced_tweets(tweet_id, conversation_id, reference_type) VALUES($1, $2, $3)';

    fetchTwitterData(endpointQuery, resp => {
        pool.connect((err, client, done ) => {
            if(err) throw `error: ${err}`;
            try {
                const now = new Date;
                if(isParent) conversations = resp.data;
                if(resp.data){
                    resp.data.forEach( (row, i) => {
                        insertIntoTweets(client, tweetString, row, endpointQuery)
                        insertIntoTweetMetrics(client, metricsString, row, now)
                        insertIntoReferencedTweets(client, referenceString, row)
                        if(isParent) insertIntoAllJobs(client, row)
                    })
                }
            } finally {
                done()
            }
        })
    })
}


runJobs( mainFunction, options )

// if from user you are wanting to pull tweets from, 
// pull tweets