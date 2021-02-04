// const knex = require('../db');

// knex.schema.dropTableIfExists('tweet_metrics')
//     .then(() => knex.schema.dropTableIfExists('referenced_tweets'))
//     .then(() => knex.schema.dropTableIfExists('tweets'))
//     .then(() => {
//         console.log('creating tweets table 🏓')
//         knex.schema.createTable('tweets', (t) => {
//             t.text('id').primary();
//             t.text('tweet_text');
//             t.text('author_id');
//             t.timestamp('created_at');
//             t.double('lat');
//             t.double('lng');
//             t.string('lang', 10);
//         }) 
//     })
//     .then(() => {
//         console.log('creating referenced_tweets table 🏓')
//         knex.schema.createTable('referenced_tweets', (t) => {
//             t.text('tweet_id');
//             t.text('conversation_id');
//             t.text('reference_type');
//             t.primary(['tweet_id', 'conversation_id'])
//             t.foreign('tweet_id').references('id').inTable('tweets');
            
//         })

//     })
//     .then(() => {
//         console.log('creating tweet_metrics table 🏓')
//         knex.schema.createTable('tweet_metrics', (t) => {
//             t.text('tweet_id');
//             t.timestamp('collected_at');
//             t.integer('retweet_count');
//             t.integer('reply_count');
//             t.integer('like_count');
//             t.integer('quote_count');
//             t.primary(['tweet_id', 'collected_at'])
//             t.foreign('tweet_id').references('id').inTable('tweets');    
//         })

//     })
//     .catch(err => console.log(err))
    // .finally(() => knex.destroy())

// knex.schema.createTable('tweets', (t) => {
//     console.log("maybe creating a table tweets")
//     t.text('id').primary();
//     t.text('tweet_text');
//     t.text('author_id');
//     t.timestamp('created_at');
//     t.double('lat');
//     t.double('lng');
//     t.string('lang', 10);
// }).then(resp => console.log('yup'))

// const up = (knex, Promise) => {
//     return knex.schema
//         .createTable('tweets', (t) => {
//                 console.log("maybe creating a table tweets")
//                 t.text('id').primary();
//                 t.text('tweet_text');
//                 t.text('author_id');
//                 t.timestamp('created_at');
//                 t.double('lat');
//                 t.double('lng');
//                 t.string('lang', 10);
//         })
//         .createTable('referenced_tweets', (t) => {
//                         t.text('tweet_id');
//                         t.text('conversation_id');
//                         t.text('reference_type');
//                         t.primary(['tweet_id', 'conversation_id'])
//                         t.foreign('tweet_id').references('id').inTable('tweets');
                        
//                     })

// }

// up(knex, () => console.log('done'))
