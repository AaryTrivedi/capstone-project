const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    documentType: {
        type: "String",
        required: true,
        enum: ["Licence", "Insurance" , "Workpermit" , "profilePhoto"]
    },
    documentName: {
        type: "String",
        required: true,
    }

})
const Document = mongoose.model("Document", DocumentSchema);
module.exports = Document;