const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.werzz.mongodb.net/roadmapData?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.connect(uri);

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log("connection successful to DB");

    } catch (error) {
        console.log("Database connection failed");
        process.exit(0);
    }
}

module.exports = connectDb;