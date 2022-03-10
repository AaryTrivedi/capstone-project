// Import dependencies
const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const userService = require('../services/user.service');

// Initialize router
const userRouter = express.Router();

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