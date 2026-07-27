const getQueue = require("./queue");
const logger = require("../../config/logger");
const addJob = async (job) => {

    const delay = job.scheduledAt
        ? Math.max(new Date(job.scheduledAt).getTime() - Date.now(), 0)
        : 0;

    const priorityMap = {
        HIGH: 1,
        MEDIUM: 5,
        LOW: 10,
    };

    const queuedJob = await getQueue().add(
        job.type,
        job,
        {
            attempts: 3,

            backoff: {
                type: "exponential",
                delay: 3000,
            },

            priority: priorityMap[job.priority] ?? 10,

            delay,

            removeOnComplete: { age: 3600 },
            removeOnFail: false,
        }
    );

    logger.info(
    { jobId: queuedJob.id },
    "Job added to queue"
);
};

module.exports = {
    addJob,
};