const { QueueEvents } = require("bullmq");
const getRedis = require("../../config/redis");
const logger = require("../../config/logger");

let events;

function getQueueEvents() {
    if (!events) {
        events = new QueueEvents("job-queue", {
            connection: getRedis(),
        });

        events.on("completed", ({ jobId }) => {
            logger.info({ jobId }, "Job completed");
        });

        events.on("failed", ({ jobId, failedReason }) => {
            logger.error({ jobId, reason: failedReason }, "Job failed");
        });

        events.on("waiting", ({ jobId }) => {
            logger.info({ jobId }, "Job waiting");
        });
    }

    return events;
}

module.exports = getQueueEvents;