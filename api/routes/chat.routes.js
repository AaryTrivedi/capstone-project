const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const { verifyToken } = require('../helpers/token');
const chatServices = require('../services/chat.services');
const chatRouter = express.Router();

chatRouter.get('/',verifyToken,async(req,res,next)=>{
    try {
        const result = await chatServices.getChatHistory();
        httpResponse.sendSuccess(res, "Chat fetched successfully",  result );
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})
chatRouter.post('/sendMessage', verifyToken, async (req, res, next) => {
    try {
        const result = await chatServices.sendMessage(req.body);
        httpResponse.sendSuccess(res, "message sent successfully");
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

module.exports = chatRouter;