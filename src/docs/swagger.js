const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "QueueForge API",
            version: "1.0.0",
            description: "Distributed Job Queue Platform API",
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Development",
            },
        ],

        components: {
    securitySchemes: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },

    schemas: {

        User: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 1,
                },
                name: {
                    type: "string",
                    example: "John Doe",
                },
                email: {
                    type: "string",
                    example: "john@example.com",
                },
                role: {
                    type: "string",
                    example: "ADMIN",
                }
            }
        },

        Job: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 12,
                },
                title: {
                    type: "string",
                    example: "Generate Monthly Report",
                },
                description: {
                    type: "string",
                    example: "Generate sales report for June",
                },
                type: {
                    type: "string",
                    example: "REPORT_GENERATION",
                },
                status: {
                    type: "string",
                    example: "PENDING",
                },
                priority: {
                    type: "string",
                    example: "HIGH",
                },
                tenantId: {
                    type: "integer",
                    example: 1,
                }
            }
        },

        Error: {
            type: "object",
            properties: {
                success: {
                    type: "boolean",
                    example: false,
                },
                message: {
                    type: "string",
                    example: "Something went wrong",
                }
            }
        }

    }
},

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [
        "./src/modules/**/*.js",
    ],
};

module.exports = swaggerJsdoc(options);