const { QueueEvents } = require("bullmq");

const redis = require("../../config/redis");

const events = new QueueEvents("job-queue", {
    connection: redis,
});

events.on("completed", ({ jobId }) => {
    console.log(`✅ ${jobId} completed`);
});

events.on("failed", ({ jobId, failedReason }) => {
    console.log(`❌ ${jobId} failed`);

    console.log(failedReason);
});

events.on("waiting", ({ jobId }) => {
    console.log(`⌛ ${jobId} waiting`);
});