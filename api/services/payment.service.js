// Set current environment
const env = process.env.NODE_ENV || "development";

// Get config for environment
const config = require('../config/config.json')[env];

// Get stripe secret from config
const { STRIPE_SECRET_KEY } = config;

// Import and initialize stripe
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// Get email validator
const validEmail = require('../helpers/validEmail');

class PaymentService {

    async createCustomer(userDetails) {
        const { email, firstName, lastName } = userDetails;
        if (email === undefined || email === null) {
            throw new Error("Token is not valid");
        }
        const name = firstName + " " + lastName;
        const customer = await stripe.customers.create({
            email, name
        })
        return {}; 
    }

    async createSetupIntent(userDetails) {
        const { email } = userDetails;
        if (email === undefined || email === null) {
            throw new Error("Token is invalid")
        }
        if (typeof email !== "string") {
            throw new Error("Email must be a string");
        }
        if (!validEmail(email)) {
            throw new Error("Email is not in a valid format");
        }
        const customer = await this.getCustomerByEmail(email);
        if (customer.data.length === 0) {
            throw new Error("User does not have stripe customer account");
        }
        const setupIntent = await stripe.setupIntents.create({
            customer: customer.data[0].id
        });
        return setupIntent.client_secret;
    }

    async getCustomerByEmail(email) {
        const customer = await stripe.customers.list({
            email,
            limit: 1
        })
        return customer;
    }

    async getPaymentMethods(user) {
        const { email } = user;
        if (email === undefined || email === null) {
            throw new Error("Token is invalid");
        }
        const customer = await this.getCustomerByEmail(email);
        if (customer.data.length === 0) {
            throw new Error("Customer is not registered in stripe.");
        }
        const methods = await stripe.customers.listPaymentMethods(
            customer.data[0].id,
            { type: "card" }
        )
        return methods.data;
    }
    
}

module.exports = new PaymentService;