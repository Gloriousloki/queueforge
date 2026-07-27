require("dotenv").config();
const prisma = require("./config/prisma");
const redis = require("./config/redis");

const env = require("./config/env");
const app = require("./app");
const logger = require("./config/logger");

const PORT = env.PORT;

const server = app.listen(PORT, () => {
    logger.info(`QueueForge API running on port ${PORT}`);
});
async function shutdown(signal) {
    logger.info(`${signal} received. Shutting down...`);

    server.close(async () => {
        try {
            logger.info("HTTP server closed");

            await prisma.$disconnect();
            logger.info("Prisma disconnected");

            redis.disconnect();
            logger.info("Redis disconnected");

            process.exit(0);
        } catch (err) {
            logger.error(err, "Error during shutdown");
            process.exit(1);
        }
    });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
module.exports = server;