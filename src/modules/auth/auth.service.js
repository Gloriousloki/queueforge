const prisma = require("../../config/prisma");
const { hashPassword } = require("../../utils/hash");
const { generateToken } = require("../../utils/jwt");
const generateSlug = require("../../utils/slug");
const { comparePassword } = require("../../utils/hash");

const register = async ({
    companyName,
    name,
    email,
    password,
}) => {

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Everything below runs as one transaction
    return await prisma.$transaction(async (tx) => {

        const tenant = await tx.tenant.create({
            data: {
                name: companyName,
                slug: generateSlug(companyName),
            },
        });

        const hashedPassword = await hashPassword(password);

        const user = await tx.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "ADMIN",
                tenantId: tenant.id,
            },
        });

        const token = generateToken(user);

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            tenant: {
                id: tenant.id,
                name: tenant.name,
                slug: tenant.slug,
            },
        };
    });
};

const loginUser = async ({ email, password }) => {

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            tenant: true,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        tenant: {
            id: user.tenant.id,
            name: user.tenant.name,
            slug: user.tenant.slug,
        },
    };
};
const getProfile = async ({ userId }) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            tenant: true,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenant: {
            id: user.tenant.id,
            name: user.tenant.name,
            slug: user.tenant.slug,
        },
    };
};
module.exports = {
    register,
    loginUser,
    getProfile,
};

