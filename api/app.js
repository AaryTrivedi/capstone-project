// Import dependencies
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const logger = require('morgan');
const socketio = require('socket.io');

// Initialize environment
const env = process.env.NODE_ENV || "development";

// Get config for current environment
const config = require('./config/config.json')[env];
// Initialize express app

// Enable accepting json body
app.use(bodyParser.json())
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));
// Enable cors
app.use(cors())

// Use logger
app.use(logger('dev'));

// Start app on environment port
app.listen(config.PORT, async function () {
    console.log(`Listening on port ${config.PORT}`);
    console.log(`Connecting to mongo...`);
    const { MONGO_PORT, MONGO_DB_NAME, MONGO_HOST } = config
    try {
        // await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`);
        await mongoose.connect(`mongodb+srv://aary:123@cluster0.ra2w9.mongodb.net/capstone?retryWrites=true&w=majority`)
        console.log("Connected to mongo");
    } catch (e) {
        console.error(e);
    }
})

// Test route
app.get('/', function (req, res) {
    res.status(200).send("Server started");
})

const httpServer = require('http').createServer(app);
const io = new socketio.Server(httpServer);
httpServer.listen(3001);

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("message_send", async data => {
        const { forUserId, fromUserId, message } = data;
        await chatServices.addChat(fromUserId, forUserId, message);
        io.emit("message_receive", data);
    });
});

// Import routers and use in server
const userRouter = require('./routes/user.routes');
app.use('/users', userRouter);

const ridesRouter = require('./routes/rides.routes');
app.use('/rides', ridesRouter)

const paymentRouter = require('./routes/payment.routes');
app.use('/payments', paymentRouter);

const notificationRouter = require('./routes/notification.routes');
app.use("/notifications", notificationRouter);

const documentRouter = require('./routes/document.route');
app.use("/document", documentRouter);

const chatRouter = require('./routes/chat.routes');
const chatServices = require('./services/chat.services');
app.use("/chats", chatRouter)
// Export app for testing
module.exports = app