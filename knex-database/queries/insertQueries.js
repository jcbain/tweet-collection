const knex = require('../db');

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


const insertIntoTweets = async (data) => {
    console.log('inserting data into tweets');
    await knex('tweets').insert(data).then(resp => console.log(resp));
}

insertIntoTweets(dummyData);

