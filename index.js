const yargs = require('yargs');
const { CronJob } = require('cron');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const { insertIntoTweetsTable } = require('./knex-database/queries/insertQueries');
const { fetchTwitterData } = require('./endpoint_calls/twitter_search_v2');

const start = Date.now();
const intervals = {
    s: "* * * * * *",
    m: "* * * * *",
    h: "* * * *"
}

const argv = yargs
    .option('query', {
        description: 'query for twitter endpoint',
        alias: 'q',
        type: 'string'
    })
    .option('interval', {
        description: 'how often to run the cron',
        alias: 'i',
        type: 'string'
    })
    .option('duration', {
        description: 'duration in minutes to run collection for',
        alias: 'd',
        type: 'number'
    })
    .help()
    .alias('help', 'h')
    .argv;

let chosenInterval = intervals.m;
let end = start + (1000 * 60);
let currentIndex = 0;
let chosenQueries = ['from:npr'];

const { query, interval, duration } = argv;

if ( query ) {
    chosenQueries = [query];
}

if ( interval ) {
    switch(interval){
        case 's':
            chosenInterval = intervals.s;
            break;
        case 'm':
            chosenInterval = intervals.m;
            break;
        case 'h':
            chosenInterval = intervals.h;
            break;
        default:
            console.log('running cron every minute');
    }
}

if ( duration ) {
    end = start + (1000 * 60 * duration);
}


const job = new CronJob(
    chosenInterval,
    function() {
        const currentQuery = chosenQueries[currentIndex];
        currentIndex = currentIndex < chosenQueries.length - 1 ? currentIndex + 1 : 0;
        fetchTwitterData(currentQuery)
            .then(resp => {
                insertIntoTweetsTable(resp.data.data, db)
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => console.log(err))
        // console.log(counter)
        // counter+=1;
        if(Date.now() > end){
            db.destroy();
            this.stop();
        }
    },
    null,
    true,
    'America/Edmonton'

)

// const knex = require('knex');
// const knexConfig = require('./knex-database/knexfile');
// const db = knex(knexConfig.development);

// db.select('id').from('tweets').then(resp => console.log(resp))

// const CronJob = require('cron').CronJob;

// // const start = Date.now()
// // const end = start + 30000;
// // let stopped = false;

// // const job = new CronJob(
// // 	'* * * * * *',
// // 	function() {
// //         console.log('You will see this message every second');
// //         if(Date.now() > end) {
// //             this.stop()
// //         }
// // 	},
// // 	null,
// // 	true,
// // 	'America/Edmonton'
// // );


// const runJob = (callback, options) => {
//     const { interval, stopInterval } = options;

//     const start = Date.now();
//     const end = start + stopInterval;
//     let counter = 0;
    
//     const job = new CronJob(
//         interval,
//         function() {
//             callback();
//             console.log(counter);
//             counter += 1;
//             if (Date.now() > end) {
//                 this.stop()
//             }
//         },
//         null,
//         true,
//         'America/Edmonton'
//     )

// }

// // const options = {interval: '* * * * * *', stopInterval: 30000};

// // runJob(() => console.log("yuppers"), options)

// module.exports = { runJob }