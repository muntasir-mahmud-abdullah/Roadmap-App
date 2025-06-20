const User = require("../models/user-model");

//Home logic
const home = async (req, res) => {
    try {
        res.status(200).send("welcome to backend from controller");
    } catch (error) {
        console.log(error)
    }
}

// registration logic
const signup = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: "email already exists" })
        }

       const userCreated = await User.create({ email, password });

        res.status(200).json({ msg: userCreated })
    } catch (error) {
        res.status(500).json({ msg: "page not found" })
    }
}

module.exports = { home, signup };