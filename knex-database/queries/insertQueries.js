const { pick } = require('lodash')
const { renameKeys, getGeo } = require('../../utils/helpers');

const cleanUpTweetsData = (data, query) => {
    const mappedKeys =  {
        id: 'id',
        text: 'tweet_text',
        author_id: 'author_id',
        created_at: 'created_at',
    };

    let cleanedData = [];
    for ( const row of data ){
        const updatedObj = renameKeys(row, mappedKeys);
        const coordinates = getGeo(row);
        if(coordinates){
            updatedObj.lng = coordinates[0];
            updatedObj.lat = coordinates[1];
            
        }
        const finalRow = pick(updatedObj, 'id', 'tweet_text', 'author_id', 'created_at', 'lat', 'lng', 'lng', 'possibly_sensitive')
        cleanedData.push({...finalRow, query})
    }

    return cleanedData;
}

const insertIntoTweetsTable = async (data, query, db) => {

    console.log(`attempting to insert ${data.length} rows into the tweet table`)

    const cleaned = cleanUpTweetsData(data, query)
    const inserted = await db('tweets')
        .insert(cleaned)
        .onConflict('id')
        .ignore()
    return inserted;
}

const cleanUpReferencedTweets = (data) => {
    let cleanedData = [];
    data.forEach(row => {
        const { id, referenced_tweets } = row;
        if ( referenced_tweets ){
            referenced_tweets.forEach(tweet => {
                const referenceRow = { tweet_id: id, conversation_id: tweet.id, reference_type: tweet.type };
                cleanedData.push(referenceRow);
            })
        }
    })

    return cleanedData;
}

const insertIntoReferencedTweetsTable = async (data, db) => {
    const cleaned = cleanUpReferencedTweets(data);
    console.log(`attempting to insert ${cleaned.length} rows in to the referenced_tweets table`);
    const inserted = await db('referenced_tweets')
        .insert(cleaned)
        .onConflict(['tweet_id', 'conversation_id'])
        .ignore()

    return inserted;

}

const cleanUpTweetMetricsData = (data) => {
    let cleanedData = [];
    const timeNow = new Date();
    data.forEach(row => {
        const { id, public_metrics } = row;
        if (public_metrics){
            const metricData = { tweet_id: id, collected_at: timeNow, 
                retweet_count: public_metrics.retweet_count, reply_count: public_metrics.reply_count,
                like_count: public_metrics.like_count, quote_count: public_metrics.quote_count
            }
            cleanedData.push(metricData);
        }
    })
    return cleanedData;
}

const insertIntoTweetsMetricsTable = async (data, db) => {
    const cleaned = cleanUpTweetMetricsData(data);
    console.log(`attempting to insert ${cleaned.length} rows in to the tweet_metrics table`);
    const inserted = await db('tweet_metrics')
        .insert(cleaned)
        .onConflict(['tweet_id', 'collected_at'])
        .ignore()

    return inserted;

}



module.exports = { insertIntoTweetsTable, insertIntoReferencedTweetsTable, insertIntoTweetsMetricsTable }
