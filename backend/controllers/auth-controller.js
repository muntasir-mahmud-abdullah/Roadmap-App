const User = require("../models/user-model");
const bcrypt = require('bcrypt');
const Service = require("../models/services-model")
const Upvote = require("../models/upvote-model")
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
            res.status(404).json({ msg: "No services were found" })
        }


        res.status(200).json({ msg: response })
    } catch (error) {
        console.log(`services: ${error}`)
    }
}

const getAllServices = async (req, res) => {
    try {
        const response = await Service.find();
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


module.exports = { home, signup, login, getAllUsers, getAllServices, createUpvote, getUpvote };