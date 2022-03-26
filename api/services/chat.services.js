const Chat =require('../models/chat')
var bodyParser = require('body-parser')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


class ChatService{

    async getChatHistory(){
        const chatHistory = await Chat.find({});
        return { chatHistory }
    }

    async sendMessage(chatDetails){
        const { toUser, message, fromUser } = chatDetails;
        
        
            // console.log(toUser)
            // socket.on('message', async (data) => {
            //     const message = {
            //         fromUser: data.fromUser,
            //         toUser: data.toUser,
            //         message: data.message
            //     }
            //     console.log(`${data.fromUser} send a message to ${data.toUser}`)
                try {
                    const newMsg = Chat({
                        fromUser,
                        toUser,
                        message
                    })
                    await newMsg.save()
                }
                catch (e) {
                    throw new Error(e.message)
                } 
            //     const client = io()
            //     messageSend = {
            //         toUser: toUser,
            //         message: message,
            //         fromUser: fromUser
            //     }
            //     client.emit('message', messageSend)
            // return { messageSend }
          

    
        // const { toUser } = chatDetails
        // const result = await Chat.find({ toUser: toUser })
        // return {result}
    }
    
}

module.exports = new ChatService