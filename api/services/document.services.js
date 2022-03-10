const Document = require('../models/document')
var bodyParser = require('body-parser')
const app = require('express')()


class DocumentService {
    async getDocumetnByuserId(userId) {
        const document = await Document.find({ userId });
        return document
    }

    async uploadDocument(documentName, documentType, userId) {
        try {
            const newDocument = Document({
                userId,
                documentName,
                documentType
            })
            await newDocument.save()
        }
        catch (e) {
            throw new Error(e.message)
        }
    }

}

module.exports = new DocumentService