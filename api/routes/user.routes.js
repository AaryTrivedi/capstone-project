// Import dependencies
const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const userService = require('../services/user.service');
const { verifyToken } = require('../helpers/token');
// Initialize router
const userRouter = express.Router();

// Get current user route
userRouter.get("/", verifyToken, async function (req, res, next) {
    const { user } = req;
    console.log(user);
    httpResponse.sendSuccess(res, "User retrieved successfully", { user })
})

// Edit user route
userRouter.put("/", verifyToken, async function (req, res, next) {
    try {
        const response = await userService.updateUser(req.user._id, req.body);
        httpResponse.sendSuccess(res, "User updated successfully", response);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

// Get ride by id route
userRouter.get("/:userId", verifyToken, async function (req, res, next) {
    try {
        const userId = req.params.userId || req.user._id;
        const user = await userService.getUserById(userId);
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

userRouter.post('/approveDocument', async function (req, res, next) {
    try {
        const result = await userService.ApproveUser(req.body);
        httpResponse.sendSuccess(res, "Authenticated successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

userRouter.get('/approved-driver-details-list', async function (req, res, next) {
    try {
        const result = await userService.approvedDriverList(req.body);
        httpResponse.sendSuccess(res, "data fetched successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})
userRouter.get('/pending-driver-details-list', async function (req, res, next) {
    try {
        const result = await userService.pendingDriverList(req.body);
        httpResponse.sendSuccess(res, "data fetched successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})


module.exports = userRouter;