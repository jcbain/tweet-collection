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
    butts: 'super_butts'
};

const list = [
    {
        id: '123',
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
        id: '124',
        text: 'some text again',
        author_id: 'akdjafads',
        created_at: new Date(),
        geo: {
            place_id: "2595040ad5860917",
        }
    }
]

const obj = {
    name: 'james',
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
}

const obj2 = {
    name: 'james',
    geo: {
        place_id : "2595040ad5860917"
    }
}

const { geo: { coordinates: { coordinates = null } = {coordinates: null} } = { geo: null }} = obj2;

console.log(coordinates)


const insertIntoTweets = async (data) => {
    let newData = [];
    for( const row of data ){
        const renamedObj = await renameKeys(row, mappedKeys);
        const { geo: { coordinates: { coordinates = null } = {coordinates: null} } = { geo: null }} = row;
        if(coordinates){
            renamedObj.lng = coordinates[0];
            renamedObj.lat = coordinates[1];
        }
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