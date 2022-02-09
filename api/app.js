// Import dependencies
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize environment
const env = process.env.NODE_ENV || "development";

// Get config for current environment
const config = require('./config/config.json')[env];

// Initialize express app
const app = express();

// Enable accepting json body
app.use(bodyParser.json())

// Enable cors
app.use(cors())

// Start app on environment port
app.listen(config.PORT, async function () {
    console.log(`Listening on port ${config.PORT}`);
    console.log(`Connecting to mongo...`);
    const { MONGO_PORT, MONGO_DB_NAME, MONGO_HOST } = config
    try {
        await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`);
        console.log("Connected to mongo");
    } catch (e) {
        console.error(e);
    }
})

// Test route
app.get('/', function (req, res) {
    res.status(200).send("Server started");
})

// Import routers and use in server
const userRouter = require('./routes/user.routes');
app.use('/users', userRouter);

const ridesRouter = require('./routes/rides.routes');
app.use('/rides', ridesRouter)

const paymentRouter = require('./routes/payment.routes');
app.use('/payments', paymentRouter);

// Export app for testing
module.exports = app