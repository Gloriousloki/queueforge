const { Worker } = require("bullmq");
const getRedis = require("../../config/redis");
const getQueueEvents = require("./events");
const { processReport } = require("../../workers/report.worker");
const logger = require("../../config/logger");

getQueueEvents();

new Worker(
    "job-queue",
    async (job) => {
        switch (job.name) {
            case "REPORT_GENERATION":
                return processReport(job);
            default:
                throw new Error(`Unknown Job Type: ${job.name}`);
        }
    },
    {
        connection: getRedis(),
    }
);

logger.info("Worker Started");