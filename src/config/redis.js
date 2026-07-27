const IORedis = require("ioredis");
const env = require("./env");
const logger = require("./logger");

let redis;

function getRedis() {
    if (!redis) {
        redis = new IORedis({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            maxRetriesPerRequest: null,
        });

        redis.on("connect", () => {
            logger.info("Redis Connected");
        });

        redis.on("error", (err) => {
            logger.error(err, "Redis Error");
        });
    }

    return redis;
}

module.exports = getRedis;