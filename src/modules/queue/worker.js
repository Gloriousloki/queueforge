const { Worker } = require("bullmq");
const redis = require("../../config/redis");
const { processReport } = require("../../workers/report.worker");
require("./events");

new Worker(

    "job-queue",

    async(job)=>{

        switch(job.name){

            case "REPORT":

                await processReport(job);

                break;

            default:

                throw new Error("Unknown Job Type");

        }

    },

    {
        connection:redis
    }

);

console.log("🚀 Worker Started");