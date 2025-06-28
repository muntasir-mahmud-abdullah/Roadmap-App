const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 300
    },
    parentCommentId: {
        type: String,
        default: null,
    },
    depth: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;