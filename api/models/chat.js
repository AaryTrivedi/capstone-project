const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    dateSent: {
        type: Date,
        default: Date.now,
    }

})
const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;