const express = require('express');
const Document = require('../models/document')
const httpResponse = require('../helpers/httpResponse');
const { verifyToken } = require('../helpers/token');
const documentServices = require('../services/document.services');
const documentRouter = express.Router();
const multer = require("multer");


var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function (req, file, cb) {
            console.log(file);
            const fileTypeInfo = file.originalname.split('.')
            const fileType = fileTypeInfo[fileTypeInfo.length - 1];
            const name = Date.now() +'.'+ fileType
            cb(null, name);
        }
    }
);
// var upload = multer({
//  storage: storage 
// });
const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf|PDF|jpg|JPG|jpeg|JPEG|png|PNG)$/))
            return cb(new Error('File format is incorrect'))
        cb(undefined, true)
    },
    storage: storage,
})

documentRouter.post('/upload', verifyToken, upload.single('file'), async (req, res, next) => {
    try {
        const result = await documentServices.uploadDocument(req.file.filename, req.body.type, req.user._id);
        httpResponse.sendSuccess(res, "Document sent successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

documentRouter.get('/:userId', verifyToken, async (req, res, next) => {
    try {
        const result = await documentServices.getDocumetnByuserId(req.params.userId);
        httpResponse.sendSuccess(res, "Document fetched successfully", result);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

documentRouter.get("/file/:fileName", (req, res) => {
    res.sendFile(process.cwd() + '/uploads/' + req.params.fileName)
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