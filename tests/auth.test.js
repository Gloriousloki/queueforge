const request = require("supertest");
const app = require("../src/app");

const {
    registerTestUser,
    loginTestUser,
    createAuthenticatedUser,
} = require("./helpers");

describe("Authentication API", () => {

    describe("POST /register", () => {

        it("should register a new user", async () => {

            const { response } = await registerTestUser();
            //console.log(response.body);
            expect(response.statusCode).toBe(201);

            expect(response.body).toHaveProperty("token");

            expect(response.body).toHaveProperty("user");

        });

        it("should reject duplicate email", async () => {

            const email = `duplicate${Date.now()}@test.com`;

            await registerTestUser({ email });

            const { response } = await registerTestUser({ email });

            expect(response.statusCode).toBe(400);

        });

    });

    describe("POST /login", () => {

        it("should login successfully", async () => {

            const { user } = await registerTestUser();

            const response = await loginTestUser(
                user.email,
                user.password
            );

            expect(response.statusCode).toBe(200);

            expect(response.body).toHaveProperty("token");

            expect(response.body.user.email).toBe(user.email);

        });

        it("should reject invalid password", async () => {

            const { user } = await registerTestUser();

            const response = await loginTestUser(
                user.email,
                "wrongpassword"
            );

            expect(response.statusCode).toBe(401);

            expect(response.body.message).toMatch(/invalid/i);

        });

    });

    describe("GET /me", () => {

        it("should return current user", async () => {

            const { token } =
                await createAuthenticatedUser();

            const response = await request(app)
                .get("/api/v1/auth/me")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );

            expect(response.statusCode).toBe(200);

            expect(response.body).toHaveProperty("email");

        });

        it("should reject missing token", async () => {

            const response = await request(app)
                .get("/api/v1/auth/me");

            expect(response.statusCode).toBe(401);

        });

        it("should reject invalid token", async () => {

            const response = await request(app)
                .get("/api/v1/auth/me")
                .set(
                    "Authorization",
                    "Bearer invalid-token"
                );

            expect(response.statusCode).toBe(401);

        });

    });

});