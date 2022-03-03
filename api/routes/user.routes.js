// Import dependencies
const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const userService = require('../services/user.service');
const { verifyToken } = require('../helpers/token');
// Initialize router
const userRouter = express.Router();

// Get ride by id route
userRouter.get("/:userId", verifyToken, async function (req, res, next) {
    try {
        const user = await userService.getUserById(req.params.userId);
        httpResponse.sendSuccess(res, "User fetched successfully", { user });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})
userRouter.post('/', async function (req, res, next) {
    try {
        const result = await userService.createUser(req.body);
        httpResponse.sendSuccess(res, "User created successfully", result);
    }catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
});

userRouter.post('/login', async function (req, res, next) {
    try {
        const result = await userService.loginUser(req.body);
        httpResponse.sendSuccess(res, "Authenticated successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})


module.exports = userRouter;