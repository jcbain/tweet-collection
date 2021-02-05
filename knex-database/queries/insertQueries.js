const { pick } = require('lodash')
const { renameKeys, getGeo } = require('../../utils/helpers');

const cleanUpTweetsData = (data) => {
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
        cleanedData.push(finalRow)
    }

    return cleanedData;
}

const insertIntoTweetsTable = async (data, db) => {

    console.log(`attempting to insert ${data.length} rows into the tweet table`)

    const cleaned = cleanUpTweetsData(data)
    const inserted = await db('tweets')
        .insert(cleaned)
        .onConflict('id')
        .ignore()
    return inserted;
}

module.exports = { insertIntoTweetsTable }
