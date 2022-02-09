// Import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

// Add http dependency in chai
chai.use(chaiHttp);

// Import server
const app = require('../../app');

// Import function to generate token
const { generateToken } = require('../../helpers/token');
const ridesService = require('../../services/rides.service');

chai.should();

describe("Rides Tests", function () {

    describe("Create ride tests", function () {

        function createRide(ride) {
            const token = generateToken({
                userId: "61fafe0d8e5a5aae6fae4e1c",
            });
            return chai.request(app)
                .post('/rides')
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(ride)
        }

        it ("Should have route to create ride", function (done) {
            createRide({})
                .end(function (err, res) {
                    res.status.should.not.be.equal(404)
                    done()
                })
        })

        it ("Should throw error if from is not present", function (done) {
            const ride = {};
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("from location is required")
                    done()
                })
        })

        it ("Should throw error if from is not an object", function (done) {
            const ride = {
                from: "Toronto"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("from location must be an object")
                    done()
                })
        })

        it ("Should throw error if from is empty", function (done) {
            const ride = {
                from: {}
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("from location cannot be empty")
                    done()
                })
        })

        it ("Should throw error if from.locationName is not present", function (done) {
            const ride = {
                from: {
                    test: "x"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Location name of from is required")
                    done()
                })
        })

        it ("Should throw error if from.locationName is empty", function (done) {
            const ride = {
                from: {
                    locationName: ""
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Location name of from is required")
                    done()
                })
        })

        it ("Should throw error if from.latitude is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of from is required")
                    done()
                })
        })

        it ("Should throw error if from.latitude is not number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: "test"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of from must be a number")
                    done()
                })
        })

        it ("Should throw error if from.longitude is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 10
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Longitude of from is required")
                    done()
                })
        })

        it ("Should throw error if from.longitude is not number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: "Test"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Longitude of from must be a number")
                    done()
                })
        })

        it ("Should throw error if to is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("to location is required")
                    done()
                })
        })

        it ("Should throw error if to is empty", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {}
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("to location cannot be empty")
                    done()
                })
        })

        it ("Should throw error if to is not an object", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: "Toronto"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("to location must be an object")
                    done()
                })
        })

        it ("Should throw error if to.locationName is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    tet: "x"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Location name of to is required")
                    done()
                })
        })

        it ("Should throw error if to.locationName is empty", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "   "
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Location name of to is required")
                    done()
                })
        })

        it ("Should throw error if to.latitude is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of to is required")
                    done()
                })
        })

        it ("Should throw error if to.latitude is not a number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto",
                    latitude: "20"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of to must be a number")
                    done()
                })
        })

        it ("Should throw error if to.longitude is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto",
                    latitude: 20
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Longitude of to is required")
                    done()
                })
        })

        it ("Should throw error if to.longitude is not a number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: "40"
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Longitude of to must be a number")
                    done()
                })
        })

        it ("Should throw error if from and to have same latitude and longitude", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("from and to must be different locations")
                    done()
                })
        })

        it ("Should throw error if startDateAndTime is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                }
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Start date and time are required")
                    done()
                })
        })

        it ("Should throw error if startDateAndTime is not valid date time string", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "test"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Start date and time value is not valid date time string")
                    done()
                })
        })

        it ("Should throw error if number of seats is not present", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Number of seats is required")
                    done()
                })
        })

        it ("Should throw error if number of seats is not a number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: "4"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Number of seats must be a number")
                    done()
                })
        })

        it ("Should throw error if price per seat is absent", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Price per seat is required")
                    done()
                })
        })

        it ("Should throw error if price per seat is not a number", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: "25"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Price per seat must be a number")
                    done()
                })
        })

        it ("Should throw error if preferences is not an array", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: "dog, no_smoke"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Preferences must be an array")
                    done()
                })
        })

        it ("Should throw error if preferences is not an array", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "Test"
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Payment type must be 'cash' or 'card'")
                    done()
                })
        })

        it ("Should throw error if any stop is not a valid location field", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 90,
                        "longitude": 100
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": "x",
                        "longitude": "y"
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Latitude of Stop[1] must be a number")
                    done()
                })
        })

        it ("Should throw error if any stop is repeated", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 90,
                        "longitude": 100
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": 90,
                        "longitude": 100
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Stop[0] and Stop[1] must be different locations")
                    done()
                })
        })

        it ("Should throw error if any stop is same as from", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 20,
                        "longitude": 40
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": 35,
                        "longitude": 47
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Stop[0] and from must be different locations")
                    done()
                })
        })

        it ("Should throw error if any stop is same as to", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 15,
                        "longitude": 35
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": 40,
                        "longitude": 80
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("error")
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Stop[1] and to must be different locations")
                    done()
                })
        })

        it ("Should create ride if all fields are valid", function (done) {
            const ride = {
                from: {
                    locationName: "Toronto",
                    latitude: 20,
                    longitude: 40
                },
                to: {
                    locationName: "Ottawa",
                    latitude: 40,
                    longitude: 80
                },
                startDateAndTime: "2011-10-05T14:48:00.000Z",
                numberOfSeats: 4,
                pricePerSeat: 25,
                preferences: ["dog", "no_smoke"],
                paymentType: "card",
                stops: [
                    {
                        "locationName": "Test 1",
                        "latitude": 27,
                        "longitude": 45
                    },
                    {
                        "locationName": "Test 2",
                        "latitude": 37,
                        "longitude": 77
                    }
                ]
            };
            createRide(ride)
                .end(function (err, res) {
                    res.status.should.be.equal(200);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("message")
                    res.body.should.haveOwnProperty("data")
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Ride created successfully")
                    res.body.data.should.haveOwnProperty("_id");
                    done()
                })
        })

    })

    describe("Filter rides tests", function () {
        function getRides(filters={}) {
            const token = generateToken({ userId: 1 });
            return chai.request(app)
                .post('/rides/filter')
                .send(filters)
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer " + token)
        }

        it ("Should have endpoint to get rides", function (done) {
            getRides()
                .end(function (err, res) {
                    res.status.should.not.be.equal(404)
                    done();
                })
        })

        it ("Should return empty array if no filters present", function (done) {
            getRides()
                .end(function(err, res) {
                    res.status.should.be.equal(200);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("message")
                    res.body.should.haveOwnProperty("data")
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Rides fetched successfully")
                    res.body.data.should.have.length(0);
                    done();
                })
        })

        it ("Should return rides array if filters provided", function (done) {
            const filters = {
                "from.locationName": "Toronto",
                "to.locationName": "Ottawa"
            }
            getRides(filters)
                .end(function(err, res) {
                    res.status.should.be.equal(200);
                    res.body.should.haveOwnProperty("status")
                    res.body.should.haveOwnProperty("message")
                    res.body.should.haveOwnProperty("data")
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Rides fetched successfully")
                    res.body.data.length.should.be.greaterThan(0);
                    done()
                })
        })
    })

    describe("Get ride by id test", function () {

        function getRide(id) {
            const token = generateToken({
                email: "test@test.com"
            })
            return chai.request(app)
                        .get("/rides/" + id)
                        .set("Content-Type", "application/json")
                        .set("Authorization", "Bearer " + token)
        }

        it("Route should exist", async function () {
            const request = await getRide("test");
            request.status.should.not.equal(404);
        })

        it("Should return ride with id if found", async function () {
            const request = await getRide("61fd8ee3823e1044fa2097e0");
            request.status.should.be.equal(200);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("message");
            request.body.should.haveOwnProperty("data");
            request.body.status.should.equal("Success");
            request.body.message.should.equal("Ride fetched successfully");
            request.body.data.should.haveOwnProperty("ride");
        });

    })

    describe("Add ride request tests", function () {

        async function getRides() {
            const rides = await ridesService.getRides({
                "from.locationName": "Toronto",
                "to.locationName": "Ottawa",
            });
            return rides;
        }

        async function addRequest(token, customRideId) {
            const rides = await getRides();
            const rideId = customRideId ? customRideId : rides[0]._id;
            return chai
                .request(app)
                .post("/rides/" + rideId + "/request")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer " + token);
        }

        it ("Route should exist", async function () {
            const request = await addRequest("");
            request.status.should.not.be.equal(404);
        })

        it ("Should throw error if id is not present in token", async function () {
            const token = generateToken({
                email: "aarytrivedi@gmail.com"
            });
            const request = await addRequest(token);
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal("Token is invalid");
        })

        it ("Should throw error if ride with provided id does not exist", async function () {
            const token = generateToken({
                email: "aarytrivedi@gmail.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await addRequest(token, "61fafe0d8e5a5aae6fae4e1c");
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal(
                "Ride with provided id does not exist"
            );
        })

        it("Should create request for user", async function () {
            const token = generateToken({
                email: "aarytrivedi@gmail.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await addRequest(token);
            request.status.should.be.equal(200);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("message");
            request.body.should.haveOwnProperty("data");
            request.body.status.should.equal("Success");
            request.body.message.should.equal("Request created successfully");
        });

        it ("Should throw error if request for user already exist", async function () {
            const token = generateToken({
                email: "aarytrivedi@gmail.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await addRequest(token);
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal(
                "Request for user already exists"
            );
        })

    })

    describe("Add as passenger test", function () {

        async function getRide() {
            const rides = await ridesService.getRides({
                "from.locationName": "Toronto",
                "to.locationName": "Ottawa"
            });
            return rides;
        }

        async function addAsRider(token, customRideId) {
            const rides = await getRide();
            const rideId = customRideId ? customRideId : rides[0]._id;
            return chai.request(app)
                        .post("/rides/" + rideId + "/passenger")
                        .set("Content-Type", "application/json")
                        .set("Authorization", "Bearer " + token)
        }

        it ("Route should exist", async function () {
            const request = await addAsRider("test");
            request.status.should.not.be.equal(404);
        })

        it ("Should throw user if token does not have user id", async function () {
            const token = generateToken({
                email: "aarytrivedi@gmail.com",
            });
            const request = await addAsRider(token)
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal("Token is invalid");
        })

        it ("Should throw error if ride with id does not exist", async function () {
            const token = generateToken({
                email: "aarytrivedi@gmail.com",
                _id: "61faf3a4d5c29ac07e7e041d",
            });
            const request = await addAsRider(
                token, "61faf3a4d5c29ac07e7e041d"
            );
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal("Ride with id does not exist");
        })

        it ("Should add user a passenger of ride", async function () {
            const token = generateToken({
                email: "aarytrivedi@gmail.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await addAsRider(token)
            request.status.should.be.equal(200);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("message");
            request.body.should.haveOwnProperty("data");
            request.body.status.should.equal("Success");
            request.body.message.should.equal("User added as passenger");
        })

        it ("Should throw error if user is already passenger of a ride", async function () {
            const token = generateToken({
                email: "aarytrivedi@gmail.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await addAsRider(token);
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal("User is already passenger of ride.");
        })

    })

    describe("Get rides of user as passenger tests", function () {

        function getRides(token) {
            return chai.request(app)    
                        .get("/rides/of-user/as-passenger")
                        .set("Content-Type", "application/json")
                        .set("Authorization", "Bearer " + token)
        }

        it ("Route should exist", function (done) {
            getRides("")
                .end(function (err, res) {
                    res.status.should.not.equal(404);
                    done();
                })
        })

        it ("Should throw error if id is not present in token", function (done) {
            const token = generateToken({
                email: "test"
            })
            getRides(token)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Token is invalid");
                    done();
                });
        })

        it("Should return the rides user is passenger of", function (done) {
            const token = generateToken({
                email: "aarytrivedi@gmail.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            getRides(token).end(function (err, res) {
                res.status.should.equal(200);
                res.body.should.haveOwnProperty("status");
                res.body.should.haveOwnProperty("message");
                res.body.should.haveOwnProperty("data");
                res.body.status.should.equal("Success");
                res.body.message.should.equal("Rides fetched successfully.");
                res.body.data.should.haveOwnProperty("rides");
                res.body.data.rides.should.be.an('array');
                res.body.data.rides.length.should.be.greaterThan(0);
                done();
            });
        });
        
    })

    describe("Get rides of user as driver tests", function () {

        function getRides(token) {
            return chai
                .request(app)
                .get("/rides/of-user/as-driver")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer` " + token);
        }

        it ("Route should exist", async function () {
            const request = await getRides();
            request.status.should.not.be.equal(404);
        })

        it ("Should throw error if token does not have userId", async function () {
            const token = generateToken({
                email: "test@test.com"
            })
            const request = await getRides(token);
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal("Token is invalid");
        })

        it ("Should return rides if everything is valid", async function () {
            const token = generateToken({
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await getRides(token);
            request.status.should.be.equal(200);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("message");
            request.body.should.haveOwnProperty("data");
            request.body.status.should.equal("Success");
            request.body.message.should.equal("Rides fetched successfully.");
            request.body.data.should.haveOwnProperty("rides");
            request.body.data.rides.length.should.be.greaterThan(0);
        })

    })

    describe("Remove as passenger tests", function () {

        async function getRides() {
            const rides = await ridesService.getRides({
                "from.locationName": "Toronto",
                "to.locationName": "Ottawa",
            });
            return rides;
        }

        async function removeAsPassenger(token, options={}) {
            const { customRideId, customUserId } = options;
            const rides = await getRides();
            const targetId = customRideId ? customRideId : rides[0]._id;
            const passengerId = customUserId
                ? customUserId
                : "61fafe0d8e5a5aae6fae4e1c";
            return chai.request(app)
                        .delete(`/rides/${targetId}/passengers/${passengerId}`)
                        .set("Content-Type", "application/json")
                        .set("Authorization", "Bearer " + token)
        }

        it ("Route should exist", async function () {
            const request = await removeAsPassenger();
            request.status.should.not.be.equal(404);
        })

        it ("Should throw error if ride with id does not exist", async function () {
            const token = generateToken({
                email: "test@test.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await removeAsPassenger(
                token,
                {
                    customRideId: "61fafe0d8e5a5aae6fae4e1c"
                }
            );
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal("Ride with provided id does not exist");
        })

        it("Should throw error if user with id is not passenger of ride", async function () {
            const token = generateToken({
                email: "test@test.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await removeAsPassenger(token, {
                customUserId: "61fd5edbc4887d1f2f15de56",
            });
            request.status.should.be.equal(400);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("error");
            request.body.status.should.equal("Failure");
            request.body.error.should.equal("User is not a passenger of ride");
        });

        it("Should remove user as passenger from ride", async function () {
            const token = generateToken({
                email: "test@test.com",
                _id: "61fafe0d8e5a5aae6fae4e1c",
            });
            const request = await removeAsPassenger(token);
            request.status.should.be.equal(200);
            request.body.should.haveOwnProperty("status");
            request.body.should.haveOwnProperty("message");
            request.body.status.should.equal("Success");
            request.body.message.should.equal(
                "Remove from passenger successfully."
            );
        })

    })

})