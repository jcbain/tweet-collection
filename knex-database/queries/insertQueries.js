// const knex = require('../db');

const knex = require('knex');
const { pick } = require('lodash')
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const { renameKeys, getGeo } = require('../../utils/helpers');

const dummyData = [
    {
        id: 'asdlkasj39234',
        tweet_text: "This is just a sample of the tweet text i am going to feed you",
        author_id: 'bain1',
        created_at: new Date(),
        lat: 93.000023,
        lng: 34.2343,
        lang: 'en'
    },
    {
        id: 'sdfaksjdf342',
        tweet_text: "Here is the second sample",
        author_id: 'bain1',
        created_at: new Date(),
        lat: 93.000023,
        lng: 34.2343,
        lang: 'en'
    },
]

const list = [
    {
        id: '127',
        text: 'some text',
        author_id: 'akdjafads',
        created_at: new Date(),
        geo: {
            place_id: "2595040ad5860917",
            coordinates: {
                type: "Point",
                coordinates: [
                    -111.9927,
                    41.17666
                ]
            }
        }
    },
    {
        id: '129',
        text: 'some text again',
        author_id: 'akdjafads',
        created_at: new Date(),
        geo: {
            place_id: "2595040ad5860917",
        }
    }
]





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

const insert = async (data, db) => {
    const cleaned = cleanUpTweetsData(data)
    const inserted = await db('tweets')
        .insert(cleaned)
        .onConflict('id')
        .ignore()
    return inserted;
}

insert(list, db).then(resp => console.log(resp))
