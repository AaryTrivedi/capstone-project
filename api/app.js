// Import dependencies
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chatServices = require('./services/chat.services')
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// Initialize environment
const env = process.env.NODE_ENV || "development";

// Get config for current environment
const config = require('./config/config.json')[env];
// Initialize express app

io.on('connection', (socket) => {
    socket.on(message,(data)=>{
        io.emit(data)
        chatServices.saveMessage(data)
    })
})

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

// Start app on environment port
app.listen(config.PORT, async function () {
    console.log(`Listening on port ${config.PORT}`);
    console.log(`Connecting to mongo...`);
    const { MONGO_PORT, MONGO_DB_NAME, MONGO_HOST } = config
    try {
        //await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`);
         await mongoose.connect(`mongodb+srv://rutikpatel:Rutik123@com3123.4rasi.mongodb.net/test`)
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

const notificationRouter = require('./routes/notification.routes');
app.use("/notifications", notificationRouter);

const chatRouter = require('./routes/chat.routes');
app.use("/chat", chatRouter);
// Export app for testing
module.exports = app