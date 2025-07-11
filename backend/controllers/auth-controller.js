const User = require("../models/user-model");
const bcrypt = require('bcrypt');
const Service = require("../models/services-model");
const Upvote = require("../models/upvote-model");
const Comment = require("../models/comment-model");
//Home logic
const home = async (req, res) => {
    try {
        res.status(200).send("welcome to backend from controller");
    } catch (error) {
        console.log(error)
    }
}

// signup logic
const signup = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "email already exists" })
        }

        const userCreated = await User.create({ email, password });

        res.status(201).json({
            msg: "Registration Sucessfull",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        })
    } catch (error) {
        // res.status(500).json({ msg: "page not found" })
        console.log(req.body);
        next(error);
    }
};

//login logic

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(400).json({ message: "Invalid Credentials" });
        }

        // const validPassword = await bcrypt.compare(password, userExist.password);
        const validPassword = await userExist.comparePassword(password);

        if (validPassword) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });

        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

// get all users logic 

const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        if (!response) {
            //handle if no services were found
            res.status(404).json({ msg: "No users were found" })
        }


        res.status(200).json({ msg: response })
    } catch (error) {
        console.log(`users: ${error}`)
    }
}

const getAllServices = async (req, res) => {
    try {
        const { category, status, sort } = req.query;
        let filter = {};
        let sortQuery = {};
        if (category) {
            filter.category = category;
        }
        if (status) {
            filter.status = status;
        }
        if (sort === "popular") {
          sortQuery = {"upvotesCount" : -1}
        }
        const response = await Service.find(filter).sort(sortQuery);
        if (!response) {
            //handle if no services were found
            res.status(404).json({ msg: "No services were found" })
        }


        res.status(200).json({ msg: response })
    } catch (error) {
        console.log(`services: ${error}`)
    }
}

//record new upvotes logic

const createUpvote = async (req, res) => {
    const id = req.params.id;
    const userId = req.userID;

    try {
        const existingUpvote = await Upvote.findOne({ userId, serviceId: id });

        if (existingUpvote) {
            return res.json({ message: 'You have already upvoted this item' });
        }
        const upvote = await Upvote.create({ userId, serviceId: id });

        await Service.findByIdAndUpdate(id, {
            $inc: { upvotesCount: 1 }
        });
        res.status(200).json({ message: 'Upvote recorded' });

    } catch (error) {
        res.status(500).json({ message: 'Error upvoting', error: error.message });
    }
}

const getUpvote = async (req, res) => {
    const id = req.params.id;
    const userId = req.userID;

    try {
        const upvote = await Upvote.findOne({ userId, serviceId: id });
        res.json({ hasUpvoted: !!upvote });
    } catch (error) {
        res.status(500).json({ message: "Error checking upvote status", error: error.message })
    }
}


// post a comment
const postComment = async (req, res) => {
    const id = req.params.id;
    const userId = req.userID;
    const { content, parentCommentId } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }


    try {
        let depth = 0;
        if (parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId);
            if (!parentComment) {
                return res.status(404).json({ message: 'Parent comment not found' });
            }
            depth = parentComment.depth + 1;
            if (depth > 3) {
                return res.status(400).json({ message: 'Maximum nesting depth of 3 reached' });
            }
        }

        const comment = await Comment.create({
            serviceId: id,
            userId,
            content,
            parentCommentId: parentCommentId || null,
            depth
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Error posting comment", error: error.message });
    }
}


// edit comment 
const editComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.userID;

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        console.log(comment.userId);
        if (comment.userId !== userId.toString()) {
            return res.status(403).json({ message: "You can only edit your own comments" });
        }
        comment.content = content;
        comment.updateAt = new Date();
        await comment.save();
        res.json({ message: 'Comment updated successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
}

// delete comment 
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.userID;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        if (comment.userId !== userId.toString()) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }
        await Comment.deleteOne({ _id: commentId });
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "error deleting comment", error: error.message });
    }
}

// fetch comments for a service item
const fetchComments = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comment.find({ serviceId: id }).lean();
        const commentTree = buildCommentTree(comments);
        res.json(commentTree);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
}


function buildCommentTree(comments, parentId = null) {
    return comments
        .filter(comment => (comment.parentCommentId ? comment.parentCommentId.toString() : null) === parentId)
        .map(comment => ({
            ...comment,
            replies: buildCommentTree(comments, comment._id.toString())
        }));
}

module.exports = { home, signup, login, getAllUsers, getAllServices, createUpvote, getUpvote, postComment, editComment, deleteComment, fetchComments };