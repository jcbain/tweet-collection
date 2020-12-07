const CronJob = require('cron').CronJob;

// const start = Date.now()
// const end = start + 30000;
// let stopped = false;

// const job = new CronJob(
// 	'* * * * * *',
// 	function() {
//         console.log('You will see this message every second');
//         if(Date.now() > end) {
//             this.stop()
//         }
// 	},
// 	null,
// 	true,
// 	'America/Edmonton'
// );


const runJob = (callback, options) => {
    const { interval, stopInterval } = options;

    const start = Date.now();
    const end = start + stopInterval;
    let counter = 0;
    
    const job = new CronJob(
        interval,
        function() {
            callback();
            console.log(counter);
            counter += 1;
            if (Date.now() > end) {
                this.stop()
            }
        },
        null,
        true,
        'America/Edmonton'
    )

}

// const options = {interval: '* * * * * *', stopInterval: 30000};

// runJob(() => console.log("yuppers"), options)

module.exports = { runJob }