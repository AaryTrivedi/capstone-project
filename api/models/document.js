const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    documentUri: {
        type: String,
        required: true,
        trim: true,
    }

})
const Document = mongoose.model("Document", DocumentSchema);
module.exports = Document;