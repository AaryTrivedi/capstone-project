// Import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

// Add http dependency in chai
chai.use(chaiHttp);

// Import server
const app = require('../../app');

chai.should();

// Import function to generate token
const { generateToken } = require('../../helpers/token');

describe("Stripe and payment tests", function () {

    describe("Create customer tests", function () {

        function createCustomer(token) {
            return chai.request(app)
                .post('/payments/customer')
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer " + token)
        }

        it ("Should have route to create stripe customer account", function (done) {
            const token = generateToken({
                userId: "61df6e45bd6fe4e712e20dac",
            });
            createCustomer(token)
                .end(function (err, res) {
                    res.status.should.not.be.equal(404);
                    done();
                })
        })

        it ("Should throw error is email is not in token", function (done) {
            const token = generateToken({
                userId: "61df6e45bd6fe4e712e20dac",
            });
            createCustomer(token)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Token is not valid");
                    done();
                })
        })

        // it ("Should return success if stripe customer is created successfully", function (done) {
        //     const token = generateToken({
        //         userId: "61df6e45bd6fe4e712e20dac",
        //         email: "aarytrivedi@gmail.com",
        //         firstName: "Aary",
        //         lastName: "Trivedi"
        //     });
        //     createCustomer(token)
        //         .end(function (err, res) {
        //             res.status.should.be.equal(200);
        //             res.body.should.haveOwnProperty("status");
        //             res.body.should.haveOwnProperty("message");
        //             res.body.should.haveOwnProperty("data");
        //             res.body.status.should.equal("Success");
        //             res.body.message.should.equal("Customer account created");
        //             res.body.data.should.empty;
        //             done();
        //         })
        // })
    })

    describe ("Create setup intent tests", function () {

        function createSetupIntent(token) {
            return chai.request(app)
                .post('/payments/setup')
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer " + token)
        }

        it ("Should have route to create setup intent", function (done) {
            const token = generateToken({
                email: "abc@test.com"
            });
            createSetupIntent(token)
                .end(function (err, res) {
                    res.status.should.not.be.equal(404);
                    done()
                })
        })

        it ("Should throw an error if token does not contain email", function (done) {
            const token = generateToken({
                userId: "Test"
            })
            createSetupIntent(token)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Token is invalid");
                    done();
                })
        })

        it ("Should throw an error if token email is not a string", function (done) {
            const token = generateToken({
                email: 123
            })
            createSetupIntent(token)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Email must be a string");
                    done();
                })
        })

        it ("Should throw an error if token email is not a valid email", function (done) {
            const token = generateToken({
                email: "test"
            })
            createSetupIntent(token)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Email is not in a valid format");
                    done();
                })
        })

        it ("Should throw an error if user does not have stripe customer account", function (done) {
            const token = generateToken({
                email: "test@gmail.com"
            });
            createSetupIntent(token)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("User does not have stripe customer account");
                    done()
                })
        })

        it ("Should return client secret if all validations pass", function (done) {
            const token = generateToken({
                email: "aarytrivedi@gmail.com"
            })
            createSetupIntent(token)
                .end(function (err, res) {
                    console.log(res.body);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("message");
                    res.body.should.haveOwnProperty("data");
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Setup intent created");
                    res.body.data.should.haveOwnProperty("secret");
                    done()
                })
        })

    })

    describe ("Get all payment methods tests", function () {

        function getPaymentMethods(token) {
            return chai.request(app)
                        .get('/payments/methods')
                        .set("Content-Type", "application/json")
                        .set("Authorization", "Bearer " + token)
        }

        it ("Route should exist", function (done) {
            getPaymentMethods()
                .end(function (err, res) {
                    res.status.should.not.be.equal(404);
                    done();
                })
        })

        it ("Should throw error if email is not present in token", function (done) {
            const token = generateToken({});
            getPaymentMethods(token)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Token is invalid");
                    done();
                })
        })

        it ("Should throw error if customer is not registered in stripe", function (done) {
            const token = generateToken({
                email: "test@test.com"
            })
            getPaymentMethods(token)
                .end(function (err, res) {
                    res.status.should.be.equal(400);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("error");
                    res.body.status.should.equal("Failure");
                    res.body.error.should.equal("Customer is not registered in stripe.");
                    done();
                })
        })

        it ("Should return payment methods", function (done) {
            const token = generateToken({
                email: "aarytrivedi@gmail.com"
            })
            getPaymentMethods(token)
                .end(function (err, res) {
                    res.status.should.be.equal(200);
                    res.body.should.haveOwnProperty("status");
                    res.body.should.haveOwnProperty("message");
                    res.body.should.haveOwnProperty("data");
                    res.body.status.should.equal("Success");
                    res.body.message.should.equal("Payment methods fetched successfully.");
                    res.body.data.should.haveOwnProperty("methods");
                    res.body.data.methods.length.should.be.equal(1);
                    done()
                })
        })

    })

})