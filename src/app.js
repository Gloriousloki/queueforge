const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const authRoutes = require("./modules/auth/auth.routes");
const app = express();
const jobRoutes = require("./modules/jobs/job.routes");
//const bullBoard = require("./modules/queue/bullboard");
const errorHandler = require("./middlewares/error.middleware");

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health Check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is healthy
 */
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ status: "UP", timestamp: new Date() });
});
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/auth", authRoutes);
if (process.env.NODE_ENV !== "test") {
    const bullBoard = require("./modules/queue/bullboard");
    app.use("/admin/queues", bullBoard.getRouter());
}
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(errorHandler);
module.exports = app;