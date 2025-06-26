const { Schema, model } = require("mongoose");

const upvoteSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    serviceId: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Upvote = new model("Upvote", upvoteSchema);
module.exports = Upvote;