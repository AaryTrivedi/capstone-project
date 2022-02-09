// Import dependencies
const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const { verifyToken } = require('../helpers/token');
const ridesService = require('../services/rides.service');

// Initialize router
const ridesRouter = express.Router();

// Get rides request
ridesRouter.post("/filter",async function (req, res, next) {
    try {
        const rides = await ridesService.getRides(req.body);
        httpResponse.sendSuccess(res, "Rides fetched successfully", rides);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

// Create rides route
ridesRouter.post("/", verifyToken, async function (req, res, next) {
    try {
        const ride = await ridesService.createRide(req.body);
        httpResponse.sendSuccess(res, "Ride created successfully", ride);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

// Add as rider route
ridesRouter.post("/:rideId/passenger", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.addUserAsPassengerToRideOfId(
            req.user, req.params.rideId
        );
        httpResponse.sendSuccess(res, "User added as passenger", response);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

// Get rides of current user
ridesRouter.get("/of-user/as-passenger", verifyToken, async function (req, res, next) {
    try {
        const rides = await ridesService.getRidesOfUser(
            req.user,
        );
        httpResponse.sendSuccess(res, "Rides fetched successfully.", { rides });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

module.exports = ridesRouter;