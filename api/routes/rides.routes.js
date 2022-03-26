// Import dependencies
const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const { verifyToken } = require('../helpers/token');
const ridesService = require('../services/rides.service');

// Initialize router
const ridesRouter = express.Router();

// Get ride by id route
ridesRouter.get("/:rideId", verifyToken, async function (req, res, next) {
    try {
        const ride = await ridesService.getRideById(req.params.rideId);
        httpResponse.sendSuccess(res, "Ride fetched successfully", { ride });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

ridesRouter.post("/connecting-rides", async function (req, res, next) {
    try {
        const response = await ridesService.getConnectedRides(
            req.body.fromLocation,
            req.body.toLocation
        );
        httpResponse.sendSuccess(res, "Rejected request", response);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
});

// Get rides request
ridesRouter.post("/filter", verifyToken, async function (req, res, next) {
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
        // Set driver id of ride to current logged in user id
        const { _id: driverId } = req.user;
        req.body.driver = driverId;
        const ride = await ridesService.createRide(req.body);
        console.log("DONE");
        httpResponse.sendSuccess(res, "Ride created successfully", ride);
    } catch (e) {
        console.log(e);
        httpResponse.sendFailure(res, e.message);
    }
})

// Create ride request route
ridesRouter.post("/:rideId/request", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.createRequestForRide(
            req.params.rideId, req.user, req.body.stopId
        );
        httpResponse.sendSuccess(res, "Request created successfully", {});
    } catch (e) {
        console.log(e.message);
        httpResponse.sendFailure(res, e.message);
    }
})

// Delete ride request route
ridesRouter.delete("/:rideId/request", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.removeRideRequest(
            req.params.rideId, req.user
        );
        httpResponse.sendSuccess(res, "Request removed successfully", {});
    } catch (e) {
        console.log(e.message);
        httpResponse.sendFailure(res, e.message);
    }
})
//to get all ride request
ridesRouter.get("/:rideId/request", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.getRequestList(
            req.params.rideId
        );
        httpResponse.sendSuccess(res, "Requests fetched successfully", response);
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

// Get rides of current user as passenger
ridesRouter.get("/of-user/as-passenger", verifyToken, async function (req, res, next) {
    try {
        const rides = await ridesService.getRidesOfUserAsPassenger(
            req.user,
        );
        httpResponse.sendSuccess(res, "Rides fetched successfully.", { rides });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

ridesRouter.get("/current-ride/of-user/as-passenger", verifyToken, async function (req, res, next) {
    try {
        const rides = await ridesService.getCurrentRideOfUserAsPassenger(
            req.user,
        );
        httpResponse.sendSuccess(res, "Rides fetched successfully.", { rides });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

ridesRouter.get("/current-ride/of-user/as-driver", verifyToken, async function (req, res, next) {
    try {
        const rides = await ridesService.getCurrentRideOfUserAsDriver(
            req.user,
        );
        httpResponse.sendSuccess(res, "Rides fetched successfully.", { rides });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

// Get rides of current user as driver
ridesRouter.get("/of-user/as-driver", verifyToken, async function (req, res, next) {
    try {
        const rides = await ridesService.getRidesOfUserAsDriver(req.user);
        httpResponse.sendSuccess(res, "Rides fetched successfully.", { rides });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

// Remove as passenger route
ridesRouter.delete("/:rideId/passengers/:passengerId", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.removeAsPassengerByUserIdAndRideId(
            req.params
        );
        httpResponse.sendSuccess(
            res,
            "Remove from passenger successfully.",
            {}
        );
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

ridesRouter.get("/around/user", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.getRidesAroundUser(
            req.query
        );
        httpResponse.sendSuccess(
            res,
            "Remove from passenger successfully.",
            response
        );
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
});

ridesRouter.post("/:rideId/request/accept", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.acceptRequest(
            req.params.rideId, req.body.passengerId, req.user._id
        );
        httpResponse.sendSuccess(
            res,
            "Request accepted",
            response
        );
    } catch (e) {
        console.log(e);
        httpResponse.sendFailure(res, e.message);
    }
});

ridesRouter.post("/:rideId/request/reject", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.rejectRequest(
            req.params.rideId, req.body.passengerId, req.user._id
        );
        httpResponse.sendSuccess(
            res,
            "Rejected request",
            response
        );
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
});

ridesRouter.post("/:rideId/mark-present", verifyToken, async function (req, res, next) {
    try {
        const response = await ridesService.markAsPresent(
            req.user,
            req.body.paymentDetails,
            req.body.rideDetails
        );
        httpResponse.sendSuccess(res, "Rejected request", response);
    } catch (e) {
        console.log(e.message);
        httpResponse.sendFailure(res, e.message);
    }
})

//Update ride details

ridesRouter.post("/updateRide", verifyToken, async function (req, res, next) {
    try {
        // Set driver id of ride to current logged in user id
        const { _id: driverId } = req.user;
        req.body.driver = driverId;
        const ride = await ridesService.updateRide(req.body);
        console.log("DONE");
        httpResponse.sendSuccess(res, "Ride Update successfully", ride);
    } catch (e) {
        console.log(e);
        httpResponse.sendFailure(res, e.message);
    }
})



module.exports = ridesRouter;