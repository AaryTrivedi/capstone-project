const Chat = require("../models/chat");
const User = require("../models/user");

class ChatService {

    async getChats(user) {
        const forUserChats = await Chat.find({
            fromUser: user._id
        })
        .select("toUser")
        .distinct("toUser")
        const fromUserChats = await Chat.find({
            toUser: user._id
        })
        .select("fromUser")
        .distinct("fromUser")
        const userIds = [];
        for (const userId of forUserChats) {
            const isUserAdded = userIds.findIndex(u => u.toString() === userId.toString()) > -1;
            if (isUserAdded === false) {
                userIds.push(userId);
            }
        }
        for (const userId of fromUserChats) {
            const isUserAdded = userIds.findIndex(u => u.toString() === userId.toString()) > -1;
            if (isUserAdded === false) {
                userIds.push(userId);
            }
        }
        const users = await User.find({
            _id: userIds
        });
        console.log(users);
        return users;
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
        })
        .populate("fromUser toUser")
        .sort([["dateSent", "desc"]]);
        return messages;
    }
    
}

module.exports = new ChatService;