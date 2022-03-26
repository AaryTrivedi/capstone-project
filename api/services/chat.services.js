const Chat = require("../models/chat");

class ChatService {

    async getChats(user) {
        const forUserChats = await Chat.find({
            fromUser: user._id
        }).select("forUser").distinct("forUser")
        const fromUserChats = await Chat.find({
            forUser: user._id
        }).select("fromUser").distinct("forUser");
    }

    async addChat(fromUser, toUser, message) {
        const chat = new Chat({
            fromUser,
            toUser,
            message
        });
        await chat.save();
    }

    async getChatsBetweenUser(user1Id, user2Id) {
        const messages = await Chat.find({
            $or: [
                {
                    $and: [
                        {
                            fromUser: user1Id, toUser: user2Id
                        }
                    ]
                },
                {
                    $and: [
                        {
                            toUser: user1Id, fromUser: user2Id
                        }
                    ]
                }
            ]
        }).populate("fromUser toUser");
        return messages;
    }
    
}

module.exports = new ChatService;