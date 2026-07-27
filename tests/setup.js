const prisma = require("../src/config/prisma");

beforeAll(async () => {
    // Clean database before running the test suite.
    // Delete child tables first because of foreign-key constraints.
    await prisma.job.deleteMany();
    await prisma.user.deleteMany();
    await prisma.tenant.deleteMany();
});

afterAll(async () => {
    // Clean again so repeated test runs start fresh.
    await prisma.job.deleteMany();
    await prisma.user.deleteMany();
    await prisma.tenant.deleteMany();

    await prisma.$disconnect();
});