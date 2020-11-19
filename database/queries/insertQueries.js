const insertIntoTweets = (client, queryString, row, jobId) => {
    client.query(queryString, 
        [row.id, row.text, row.author_id, row.created_at, row.conversation_id, row.lang, jobId],
        (err, res) => {
            if (err) {
                if(err.code === "23505") {
                    console.log(`Error: tweet ${row.id} already exists. Duplicate key violates unique key constraint`)
                } else {
                    console.log(err.stack)
                }   
            } else {
                console.log(`🎉 🐕 SUCCESS: ${row.id} was added to the tweets table!`)
            }
        })
}

const insertIntoTweetMetrics = (client, queryString, row, time_now) => {
    const { public_metrics } = row;
    client.query(queryString, 
        [row.id, time_now, public_metrics.retweet_count, public_metrics.reply_count, public_metrics.like_count, public_metrics.quote_count],
        (err, res) => {
            if (err) {
                if(err.code === "23505") {
                    console.log(`Error: metric ${row.id}, ${time_now} already exists. Duplicate key violates unique key constraint`)
                } else {
                    console.log(err.stack)
                }   
            } else {
                console.log(`🎉 🐕 SUCCESS: ${row.id}, ${time_now} was added to the tweet_metrics table!`)
            }
        })
}

const insertIntoReferencedTweets = (client, queryString, row) => {
    const { referenced_tweets } = row;
    if( !referenced_tweets ) return;
    referenced_tweets.forEach(tweet => {
        client.query(queryString, [row.id, tweet.id, tweet.type],  (err, response) => {
            if (err) {
                if(err.code === "23505") {
                    console.log(`Error: ref tweet ${row.id}, ${tweet.id} already exists. Duplicate key violates unique key constraint`)
                } else {
                    console.log(err.stack)
                }   
            } else {
                console.log(`🎉 🐕 SUCCESS: ${row.id}, ${tweet.id} was added to the referenced_tweets table!`)
            }
        })
    })
}

module.exports = { insertIntoTweets, insertIntoTweetMetrics, insertIntoReferencedTweets }