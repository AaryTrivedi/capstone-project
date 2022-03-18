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

userRouter.post("/review", verifyToken, async function (req, res, next) {
    try {
        const result = await userService.createReview(req.user, req.body);
        httpResponse.sendSuccess(res, "Review added successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
        console.log(e);
    }
})

userRouter.get("/:userId/reviews", verifyToken, async function (req, res, next) {
    try {
        const result = await userService.getReviewOfUser(req.params.userId);
        httpResponse.sendSuccess(res, "Review added successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

module.exports = userRouter;