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

//ensuring one upvote per user per item
upvoteSchema.index({ userId: 1, serviceId: 1 }, { unique: true });

const Upvote = new model("Upvote", upvoteSchema);

module.exports = Upvote;