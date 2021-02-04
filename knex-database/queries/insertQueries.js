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

function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }
  

const mappedKeys =  {
    id: 'id',
    text: 'tweet_text',
    author_id: 'author_id',
    created_at: 'created_at',
};

const list = [
    {
        id: '123',
        text: 'some text',
        author_id: 'akdjafads',
        created_at: new Date()
    },
    {
        id: '124',
        text: 'some text again',
        author_id: 'akdjafads',
        created_at: new Date()
    }
]


const insertIntoTweets = async (data) => {
    let newData = [];
    for( const row of data ){
        const renamedObj = await renameKeys(row, mappedKeys);
        newData.push(renamedObj)
    }
    return newData
}

// const insertIntoTweets = async (data) => {
//     console.log('inserting data into tweets');
//     await knex('tweets').insert(data).then(resp => console.log(resp));
// }

// insertIntoTweets(dummyData);

insertIntoTweets(list).then(resp => console.log(resp))