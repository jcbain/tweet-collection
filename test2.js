const { runJob } = require('./index');
const CronJob = require('cron').CronJob;
const pool = require('./database/db');
const { getAllJobs } = require('./database/queries/pullQueries');

const options = {interval: '* * * * * *', stopInterval: 60000};

const runJobs = (callback, options) => {
    const { interval, stopInterval } = options;

    const start = Date.now();
    const end = start + stopInterval;
    let counter = 0;
    let allJobs;
    
    
    const job = new CronJob(
        interval,
        function() {
            callback(counter);
            counter += 1;
            if (Date.now() > end) {
                this.stop()
            }
            if (!allJobs){
                console.log('fetching jobs')
                getAllJobs(pool).then(res => allJobs = res)
            } else {
                console.log('already got dem jobs')
                console.log(allJobs)
            }
        },
        null,
        true,
        'America/Edmonton'
    )

}

// runJob(() => console.log("yuppers"), options)
runJobs( console.log, options )

// if from user you are wanting to pull tweets from, 
// pull tweets