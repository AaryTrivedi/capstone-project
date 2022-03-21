const mongoose = require('mongoose');

const schema = mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    forUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
        required: true
    }
});

const Review = mongoose.model("Review", schema);

module.exports = Review;