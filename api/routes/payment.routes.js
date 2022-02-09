// Import dependencies
const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const { verifyToken } = require('../helpers/token');
const paymentService = require('../services/payment.service');

const paymentRouter = express.Router();

// Create stripe customer route
paymentRouter.post('/customer', verifyToken, async function (req, res, next) {
    try {
        await paymentService.createCustomer(req.user);
        httpResponse.sendSuccess(res, "Customer account created", {});
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
});

// Create stripe SetupIntent route
paymentRouter.post('/setup', verifyToken, async function (req, res, next) {
    try {
        const secret = await paymentService.createSetupIntent(req.user);
        httpResponse.sendSuccess(res, "Setup intent created", { secret });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

// Get all payment methods route
paymentRouter.get("/methods", verifyToken, async function (req, res, next) {
    try {
        const methods = await paymentService.getPaymentMethods(req.user);
        httpResponse.sendSuccess(res, "Payment methods fetched successfully.", { methods });
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

module.exports = paymentRouter;