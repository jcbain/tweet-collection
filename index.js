const CronJob = require('cron').CronJob;

const start = Date.now()
const end = start + 30000;
let stopped = false;

const job = new CronJob(
	'* * * * * *',
	function() {
        console.log('You will see this message every second');
        if(Date.now() > end) {
            this.stop()
        }
	},
	null,
	true,
	'America/Los_Angeles'
);

