const { ObjectId } = require("mongodb");
const Ride = require("../models/ride");

class RidesService {
    async getRides(filters = {}) {
        if (Object.keys(filters).length === 0) {
            return [];
        }
        const rides = await Ride.find({ ...filters });
        return rides;
    }

    async createRide(rideDetails) {
        this.validateCreateRideFields(rideDetails);
        const ride = new Ride(rideDetails);
        await ride.save();
        return ride;
    }

    async addUserAsPassengerToRideOfId(user, rideId) {
        const { _id } = user;
        if (_id === undefined || _id === null) {
            throw new Error("Token is invalid");
        }
        const ride = await this.getRideById(rideId);
        if (ride === undefined || ride === null) {
            throw new Error("Ride with id does not exist");
        }
        if (this.isUserPassengerOfRide(user, ride)) {
            throw new Error("User is already passenger of ride.");
        }
        const code = this.generatePassengerCodeOfLength(7);
        const passengerProperties = {
            userId: _id,
            code,
        };
        ride.passengers.push(passengerProperties);
        await ride.save();
        return {};
    }

    generatePassengerCodeOfLength(length) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
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
            "driver": new ObjectId(_id)
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
        const passengers = this.removePassengerByIdFromRide(passengerId, ride[0]);
        ride[0].passengers = passengers;
        await ride[0].save();
        return {};
    }

    removePassengerByIdFromRide(passengerId, ride) {
        return ride.passengers.filter(passenger => {
            return passenger.userId.toString() !== passengerId
        })
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

    isUserPassengerOfRide(user, ride) {
        const { _id } = user;
        const isPassenger =
            ride.passengers.findIndex((passenger) => {
                return passenger.userId.toString() === _id;
            }) > -1;
        return isPassenger;
    }
}

module.exports = new RidesService