const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const { verifyToken } = require('../helpers/token');
const chatServices = require('../services/chat.services');
const router = express.Router();

router.get("/", verifyToken, async (req, res, next) => {
    try {
        const chats = await chatServices.getChats(req.user);
        httpResponse.sendSuccess(res, "Chats fetched", { chats })
    } catch (e) {
        console.log(e);
        httpResponse.sendFailure(res, e.message);
    }
})

router.get("/:userId", verifyToken, async (req, res, next) => {
    try {
        const messages = await chatServices.getChatsBetweenUser(req.user._id, req.params.userId);
        httpResponse.sendSuccess(res, "Chats fetched", { messages })
    } catch (e) {
        console.log(e);
        httpResponse.sendFailure(res, e.message);
    }
})

module.exports = router;