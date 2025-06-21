const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.werzz.mongodb.net/roadmapData?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri);
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

// securing the password with the bcrypt
userSchema.pre("save", async function (next) {
    // console.log("pre method", this)
    const user = this;

    if (!user.isModified('password')) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error)
    }
});

//collection naming
const User = new mongoose.model("User", userSchema);
module.exports = User;  
