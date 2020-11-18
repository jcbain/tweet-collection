const { runJob } = require('./index');

const options = {interval: '* * * * * *', stopInterval: 60000};

runJob(() => console.log("yuppers"), options)