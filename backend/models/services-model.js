const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Feature', 'Bug', 'Enhancement']
    },
    status: {
        type: String,
        required: true,
        enum: ['In Progress', 'Completed', 'Planned']
    },
    upvotesCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Service = new model("Service", serviceSchema);
module.exports = Service;