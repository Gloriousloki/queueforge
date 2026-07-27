const authService = require("./auth.service");

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message,
        });

    }
};
const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);

        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({
            message: err.message,
        });
    }
};
const me = async (req, res) => {

    try {

        const result = await authService.getProfile(req.user);

        res.json(result);

    } catch (err) {

        res.status(404).json({
            message: err.message,
        });

    }

};
module.exports = {
    register,
    login,
    me,
};