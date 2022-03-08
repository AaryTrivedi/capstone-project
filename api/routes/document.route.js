const express = require('express');
const httpResponse = require('../helpers/httpResponse');
const { verifyToken } = require('../helpers/token');
const documentServices = require('../services/document.services');
const documentRouter = express.Router();
const path = require('path');
const fs = require("fs");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

documentRouter.post("/uploadphoto", upload.single('myImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_img, 'base64')
    };
    imageModel.create(final_img, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
})

documentRouter.get('/:userId', verifyToken, async (req, res, next) => {
    try {
        const result = await documentServices.getDocumetnByuserId(req.params.userId);
        httpResponse.sendSuccess(res, "Document fetched successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})
documentRouter.post('/upload/:userId', verifyToken, async (req, res, next) => {
    try {
        const result = await documentServices.uploadDocument(req.body, req.params.userId);
        httpResponse.sendSuccess(res, "document upload successfully");
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

module.exports = documentRouter;