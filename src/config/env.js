const { z } = require("zod");

const envSchema = z.object({
    PORT: z.string().default("3000"),

    DATABASE_URL: z.string().url(),

    JWT_SECRET: z.string().min(10, "JWT_SECRET must be at least 10 characters"),

    REDIS_HOST: z.string(),

    REDIS_PORT: z.coerce.number(),

    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("\n❌ Invalid environment variables\n");

    console.table(result.error.flatten().fieldErrors);

    process.exit(1);
}

module.exports = result.data;