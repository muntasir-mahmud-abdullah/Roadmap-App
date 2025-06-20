const mongoose = require('mongoose');
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
})

//collection naming
const User = new mongoose.model("User", userSchema);
module.exports = User;  
