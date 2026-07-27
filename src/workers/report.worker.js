const prisma = require("../config/prisma");
//const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const logger = require("../config/logger");
const processReport = async (job) => {
    logger.info("Generating report...");

    await prisma.job.update({
        where: { id: job.data.id },
        data: { status: "PROCESSING" }
    });

    // generate report...
    //await sleep(5000);
    await prisma.job.update({
        where: { id: job.data.id },
        data: { status: "COMPLETED" }
    });
};

module.exports = { processReport };