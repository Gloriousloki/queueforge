const { Queue } = require("bullmq");
const getRedis = require("../../config/redis");

let jobQueue;

function getQueue() {
    if (!jobQueue) {
        jobQueue = new Queue("job-queue", {
            connection: getRedis(),
        });
    }

    return jobQueue;
}

module.exports = getQueue;