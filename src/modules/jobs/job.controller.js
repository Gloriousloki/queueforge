const jobService = require("./job.service");

// Create
const createJob = async (req, res) => {
    try {
        const job = await jobService.createJob(req.body, req.user);
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

// Get All
const getJobs = async (req, res) => {
    try {
        const jobs = await jobService.getJobs(req.user);
        res.json(jobs);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

// Get One
const getJobById = async (req, res) => {
    try {
        const job = await jobService.getJobById(req.params.id, req.user);
        res.json(job);
    } catch (err) {
        res.status(404).json({
            message: err.message,
        });
    }
};

// Update
const updateJob = async (req, res) => {
    try {
        const job = await jobService.updateJob(
            req.params.id,
            req.body,
            req.user
        );

        res.json(job);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

// Delete
const deleteJob = async (req, res) => {
    try {
        const result = await jobService.deleteJob(
            req.params.id,
            req.user
        );

        res.json(result);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
};