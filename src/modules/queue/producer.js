const jobQueue = require("./queue");

const addJob = async (job) => {

    const delay = job.scheduledAt
        ? Math.max(new Date(job.scheduledAt).getTime() - Date.now(), 0)
        : 0;

    const priorityMap = {
        HIGH: 1,
        MEDIUM: 5,
        LOW: 10,
    };

    const queuedJob = await jobQueue.add(
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

            removeOnComplete: true,
            removeOnFail: false,
        }
    );

    console.log(`✅ Job ${queuedJob.id} added to queue`);
};

module.exports = {
    addJob,
};