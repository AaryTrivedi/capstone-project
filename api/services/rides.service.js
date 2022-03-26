const { ObjectId } = require("mongodb");
const {
    getLongitudeDifference,
    getLatitudeDifference,
} = require("../helpers/location");
const notificationModel = require("../models/notification");
const Ride = require("../models/ride");
const User = require("../models/user");
const ConnectedRides = require("./connected-rides.service");
const paymentService = require("./payment.service");

class RidesService {
    async getRides(filters = {}) {
        console.log(filters);
        if (Object.keys(filters).length === 0) {
            return [];
        }
        const rides = await Ride.find({ ...filters });
        return rides;
    }

    async createRide(rideDetails) {
        this.validateCreateRideFields(rideDetails);
        const rideIdentifier = await this.getRideIdentifier(rideDetails);
        const rideCode = this.generateRideCodeOfLength(6);
        rideDetails.rideIdentifier = rideIdentifier;
        rideDetails.code = rideCode;
        const ride = new Ride(rideDetails);
        await ride.save();
        return ride;
    }

    async getRideIdentifier(rideDetails) {
        const user = await User.findOneAndUpdate(
            { _id: rideDetails.driver },
            {
                $inc: { numberOfRides: 1 },
            }
        );
        const { numberOfRides } = user;
        const rideIdentifier = `Ride ${numberOfRides + 1}`;
        return rideIdentifier;
    }

    async addUserAsPassengerToRideOfId(userId, rideId) {
        const ride = await this.getRideById(rideId);
        if (ride === undefined || ride === null) {
            throw new Error("Ride with id does not exist");
        }
        if (this.isUserPassengerOfRide(userId, ride)) {
            throw new Error("User is already passenger of ride.");
        }
        const passengerProperties = {
            userId
        };
        ride.passengers.push(passengerProperties);
        await ride.save();
        return {};
    }

    generateRideCodeOfLength(length) {
        let result = "";
        let characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    async getRideById(_id) {
        return await Ride.findOne({ _id });
    }

    async getRidesOfUserAsPassenger(user) {
        const { _id } = user;
        if (_id === undefined || _id === null) {
            throw new Error("Token is invalid");
        }
        const rides = await Ride.find({
            "passengers.userId": new ObjectId(_id),
        });
        return rides;
    }

    async getRidesOfUserAsDriver(user) {
        const { _id } = user;
        if (_id === undefined || _id === null) {
            throw new Error("Token is invalid");
        }
        const rides = await Ride.find({
            driver: new ObjectId(_id),
        });
        return rides;
    }

    async removeAsPassengerByUserIdAndRideId(rideAndUserDetails) {
        const { rideId, passengerId } = rideAndUserDetails;
        const ride = await Ride.find({ _id: new ObjectId(rideId) });
        if (ride.length === 0) {
            throw new Error("Ride with provided id does not exist");
        }
        const user = { _id: passengerId };
        if (!this.isUserPassengerOfRide(user, ride[0])) {
            throw new Error("User is not a passenger of ride");
        }
        const passengers = this.removePassengerByIdFromRide(
            passengerId,
            ride[0]
        );
        ride[0].passengers = passengers;
        await ride[0].save();
        return {};
    }

    async createRequestForRide(rideId, user, stopId = "") {
        const { _id: userId } = user;
        if (userId === null || userId === undefined) {
            throw new Error("Token is invalid");
        }
        const ride = await this.getRideById(rideId);
        if (ride === null) {
            throw new Error("Ride with provided id does not exist");
        }
        if (this.userHasRequestToJoin(userId, ride)) {
            throw new Error("Request for user already exists");
        }
        if (typeof stopId === "object") {
            stopId = ""
        }
        const request = {
            userId,
            stopId,
        };
        console.log(request);
        const notification = new notificationModel({
            fromUser: userId,
            forUser: ride.driver,
            ride: ride._id,
            type: "join-request",
        });
        ride.requests.push(request);
        await notification.save();
        await ride.save();
        return {};
    }

    async removeRideRequest(rideId, user) {
        const { _id: userId } = user;
        if (userId === null || userId === undefined) {
            throw new Error("Token is invalid");
        }
        const ride = await this.getRideById(rideId);
        if (ride === null) {
            throw new Error("Ride with provided id does not exist");
        }
        const newRideRequests = ride.requests.filter(
            (request) => request.userId.toString() !== userId
        );
        ride.requests = newRideRequests;
        await ride.save();
        return {};
    }

    async getRidesAroundUser({ latitude, longitude }) {
        const numLatitude = Number(latitude);
        const numLongitude = Number(longitude);

        const longitudeDistance = getLongitudeDifference(numLatitude);
        const latitudeDistance = getLatitudeDifference();

        const longFiveKMPlus = longitudeDistance + numLongitude;
        const latFiveKMPlus = latitudeDistance + numLatitude;

        const longFiveKMMinus = numLongitude - longitudeDistance;
        const latFiveKMMinus = numLatitude - latitudeDistance;

        const rides = await Ride.find({
            "from.latitude": {
                $gt: latFiveKMMinus,
                $lt: latFiveKMPlus,
            },
            "from.longitude": {
                $gt: longFiveKMMinus,
                $lt: longFiveKMPlus,
            },
        });

        return {
            longFiveKMPlus,
            latFiveKMPlus,
            longFiveKMMinus,
            latFiveKMMinus,
            rides,
        };
    }

    async acceptRequest(rideId, passengerId, userId) {
        await this.addUserAsPassengerToRideOfId(passengerId, rideId);
        await this.removeRideRequest(rideId, { _id: passengerId });
        const notification = new notificationModel({
            fromUser: userId,
            forUser: passengerId,
            ride: rideId,
            type: "accept-request",
        });
        await notification.save();
        return {};
    }

    async rejectRequest(rideId, passengerId, userId) {
        await this.removeRideRequest(rideId, { _id: passengerId });
        const notification = new notificationModel({
            fromUser: userId,
            forUser: passengerId,
            ride: rideId,
            type: "reject-request",
        });
        await notification.save();
        return {};
    }

    async markAsPresent(user, paymentDetails, rideDetails) {
        const { email } = user;
        if (paymentDetails.method === "wallet") {
            await paymentService.payByWallet(email, paymentDetails.amount);
        } else {
            await paymentService.payFromCustomerPayment(
                email,
                paymentDetails.paymentMethodId,
                paymentDetails.amount
            );
        }
        return {};
    }

    async getConnectedRides(fromLocation, toLocation) {
        const connectedRide = new ConnectedRides(fromLocation, toLocation);
        const rides = await connectedRide.getConnectingRides();
        return {
            rides
        };
    }

    userHasRequestToJoin(userId, ride) {
        return (
            ride.requests.findIndex((request) => {
                return request.userId.toString() === userId;
            }) > -1
        );
    }

    removePassengerByIdFromRide(passengerId, ride) {
        return ride.passengers.filter((passenger) => {
            return passenger.userId.toString() !== passengerId;
        });
    }

    validateCreateRideFields(rideDetails) {
        this.validateLocationField("from", rideDetails.from);
        this.validateLocationField("to", rideDetails.to);
        this.validateLocationsAreDifferent(
            rideDetails.from,
            rideDetails.to,
            "from",
            "to"
        );
        console.log(rideDetails.stops);
        this.validateStartDateAndTime(rideDetails.startDateAndTime);
        this.validateNumberOfSeats(rideDetails.numberOfSeats);
        this.validatePricePerSeat(rideDetails.pricePerSeat);
        this.validatePreferences(rideDetails.preferences);
        this.validatePaymentType(rideDetails.paymentType);
        this.validateStops(rideDetails.stops, rideDetails.from, rideDetails.to);
    }

    validateLocationField(type, value) {
        if (value === undefined || value === null) {
            throw new Error(`${type} location is required`);
        }
        if (typeof value !== "object") {
            throw new Error(`${type} location must be an object`);
        }
        if (Object.keys(value).length === 0) {
            throw new Error(`${type} location cannot be empty`);
        }
        if (
            value.locationName === undefined ||
            value.locationName === null ||
            value.locationName.trim() === ""
        ) {
            throw new Error(`Location name of ${type} is required`);
        }
        if (value.latitude === undefined || value.latitude === null) {
            throw new Error(`Latitude of ${type} is required`);
        }
        if (typeof value.latitude !== "number") {
            throw new Error(`Latitude of ${type} must be a number`);
        }
        if (value.longitude === undefined || value.longitude === null) {
            throw new Error(`Longitude of ${type} is required`);
        }
        if (typeof value.longitude !== "number") {
            throw new Error(`Longitude of ${type} must be a number`);
        }
    }

    validateLocationsAreDifferent(
        location1,
        location2,
        location1Name,
        location2Name
    ) {
        if (
            location1.latitude === location2.latitude &&
            location1.longitude === location2.longitude
        ) {
            throw new Error(
                `${location1Name} and ${location2Name} must be different locations`
            );
        }
    }

    validateStartDateAndTime(dateTime) {
        if (dateTime === undefined || dateTime === null) {
            throw new Error("Start date and time are required");
        }
        const parsedDate = Date.parse(dateTime);
        if (isNaN(parsedDate)) {
            throw new Error(
                "Start date and time value is not valid date time string"
            );
        }
    }

    validateNumberOfSeats(numberOfSeats) {
        if (numberOfSeats === undefined || numberOfSeats === null) {
            throw new Error("Number of seats is required");
        }
        if (typeof numberOfSeats !== "number") {
            throw new Error("Number of seats must be a number");
        }
    }

    validatePricePerSeat(pricePerSeat) {
        if (pricePerSeat === undefined || pricePerSeat === null) {
            throw new Error("Price per seat is required");
        }
        if (typeof pricePerSeat !== "number") {
            throw new Error("Price per seat must be a number");
        }
    }

    validatePreferences(preferences) {
        if (!(preferences instanceof Array)) {
            throw new Error("Preferences must be an array");
        }
    }

    validatePaymentType(paymentType) {
        if (paymentType !== "cash" && paymentType !== "card") {
            throw new Error("Payment type must be 'cash' or 'card'");
        }
    }

    validateStops(stops, from, to) {
        for (let stopIndex = 0; stopIndex < stops.length; stopIndex++) {
            const stop = stops[stopIndex];
            this.validateLocationField("Stop[" + stopIndex + "]", stop);
            this.validateLocationsAreDifferent(
                stop,
                from,
                `Stop[${stopIndex}]`,
                `from`
            );
            this.validateLocationsAreDifferent(
                stop,
                to,
                `Stop[${stopIndex}]`,
                `to`
            );
            for (
                let repeatIndex = 0;
                repeatIndex < stops.length;
                repeatIndex++
            ) {
                if (repeatIndex === stopIndex) {
                    continue;
                }
                const checkStop = stops[repeatIndex];
                this.validateLocationsAreDifferent(
                    stop,
                    checkStop,
                    `Stop[${stopIndex}]`,
                    `Stop[${repeatIndex}]`
                );
            }
        }
    }

    formatFilters(filters) {
        const { from, to, ...otherFilters } = filters;
        const formattedFilters = {
            ...otherFilters,
        };
        if (from) {
            formattedFilters["from.locationName"] = from;
        }
        if (to) {
            formattedFilters["to.locationName"] = to;
        }
        return formattedFilters;
    }

    isUserPassengerOfRide(_id, ride) {
        const isPassenger =
            ride.passengers.findIndex((passenger) => {
                console.log(passenger);
                return passenger.userId.toString() === _id;
            }) > -1;
        return isPassenger;
    }

    async getRequestList(_id) {
        const result = await Ride.findOne({ _id }).populate({
            path: "requests",
            populate: {
                path: "userId",
            },
        });
        const requestList = result.requests;
        return requestList;
    }
}

module.exports = new RidesService