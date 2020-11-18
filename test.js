const { runJob } = require('./index');

const options = {interval: '* * * * * *', stopInterval: 30000};

runJob(() => console.log("yuppers puppers"), options)