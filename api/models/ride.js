const mongoose = require('mongoose');
const User = require('./user');

const locationSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
})

const rideException = new mongoose.Schema({
    isCancelled: {
        type: Boolean,
        default: false
    },
    isRescheduled: {
        type: Boolean,
        default: false
    },
    rideDate: {
        type: Date,
        default: Date.now
    }
})

const passengerException = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isCancelled: {
        type: Boolean,
        default: true,
    },
    rideDate: {
        type: Date,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const passenger = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    stopId: {
        type: String,
        default: ""
    }
});

const rideSchema = new mongoose.Schema({
    rideIdentifier: {
        type: String,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    from: {
        type: locationSchema,
        required: true,
    },
    to: {
        type: locationSchema,
        required: true,
    },
    startDateAndTime: Date,
    numberOfSeats: {
        type: Number,
        required: true,
    },
    pricePerSeat: {
        type: Number,
        required: true,
    },
    preferences: [String],
    paymentType: {
        type: String,
        required: true,
        default: "Cash",
    },
    stops: {
        type: [locationSchema],
        default: [],
    },
    isRecurring: {
        type: Boolean,
        default: false,
    },
    occursEvery: {
        type: [String],
        default: [],
    },
    requests: {
        type: [requestSchema],
        default: []
    },
    passengers: {
        type: [passenger],
        default: []
    },
    passengerException: {
        type: [passengerException],
        default: [],
    },
    rideExceptions: {
        type: [rideException],
        default: [],
    },
    code: {
        type: String,
        required: true
    },
    started: {
        type: Boolean,
        default: false
    }
});

const Ride = mongoose.model("ride", rideSchema)

module.exports = Ride