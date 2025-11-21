
require('module-alias/register');
const cron = require("node-cron");
const CRON_TIMER = process.env.CRON_TIMER || "* * * * *";

cron.schedule(`${CRON_TIMER}`, async () => {
    console.log(`Cron run at ${CRON_TIMER}...`);
});