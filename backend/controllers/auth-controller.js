const User = require("../models/user-model");
const bcrypt = require('bcrypt');
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
            return res.status(400).json({ msg: "email already exists" })
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

module.exports = { home, signup, login };