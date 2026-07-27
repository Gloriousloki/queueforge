const prisma = require("../../config/prisma");
const producer = require("../queue/producer");
// Create Job
const createJob = async (data, user) => {
    const job = await prisma.job.create({
        data: {
            title: data.title,
            description: data.description,
            type: data.type,
            priority: data.priority,
            payload: data.payload,
            tenantId: user.tenantId,
        },
    });
    await producer.addJob(job);
    return job;
};

// Get All Jobs
const getJobs = async (user) => {
    return await prisma.job.findMany({
        where: {
            tenantId: user.tenantId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

// Get Job By ID
const getJobById = async (id, user) => {
    const job = await prisma.job.findFirst({
        where: {
            id: Number(id),
            tenantId: user.tenantId,
        },
    });

    if (!job) {
        throw new Error("Job not found");
    }

    return job;
};

// Update Job
const updateJob = async (id, data, user) => {
    const job = await prisma.job.findFirst({
        where: {
            id: Number(id),
            tenantId: user.tenantId,
        },
    });

    if (!job) {
        throw new Error("Job not found");
    }

    return await prisma.job.update({
        where: {
            id: Number(id),
        },
        data: {
            title: data.title ?? job.title,
            description: data.description ?? job.description,
            type: data.type ?? job.type,
            priority: data.priority ?? job.priority,
            payload: data.payload ?? job.payload,
            status: data.status ?? job.status,
        },
    });
};

// Delete Job
const deleteJob = async (id, user) => {
    const job = await prisma.job.findFirst({
        where: {
            id: Number(id),
            tenantId: user.tenantId,
        },
    });

    if (!job) {
        throw new Error("Job not found");
    }

    await prisma.job.delete({
        where: {
            id: Number(id),
        },
    });

    return {
        message: "Job deleted successfully",
    };
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
};