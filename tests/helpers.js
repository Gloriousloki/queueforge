const request = require("supertest");
const app = require("../src/app");

/**
 * Register a new test user.
 */
async function registerTestUser(overrides = {}) {
    const unique = Date.now() + "-" + Math.floor(Math.random() * 100000);
    const user = {
        companyName: `QueueForge Test ${unique}`,
        name: "John Doe",
        email: `john${Date.now()}@test.com`,
        password: "password123",
        ...overrides,
    };

    const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user);

    return {
        user,
        response: res,
    };
}

/**
 * Login an existing user.
 */
async function loginTestUser(email, password = "password123") {
    const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
            email,
            password,
        });

    return res;
}

/**
 * Register + Login and return JWT token.
 */
async function createAuthenticatedUser() {
    const { user } = await registerTestUser();

    const login = await loginTestUser(
        user.email,
        user.password
    );

    return {
        token: login.body.token,
        user,
    };
}

module.exports = {
    registerTestUser,
    loginTestUser,
    createAuthenticatedUser,
};