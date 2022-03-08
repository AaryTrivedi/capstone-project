const Document = require('../models/document')
var bodyParser = require('body-parser')
const app = require('express')()


class DocumentService {
    async getDocumetnByuserId(userId) {
        const document = await Document.find({userId});
        return  document 
    }

    async uploadDocument(documentDetails,userId) {
        const { documentCollection } = documentDetails;

        try {
            const newDocument = Document({
                userId,
                documentCollection
            })
            await newDocument.save()
        }
        catch (e) {
            throw new Error(e.message)
        }
    }

}

module.exports = new DocumentService