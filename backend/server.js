require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDb = require("./db/db")
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const router = require('./router/auth-router');
app.use(express.json());
app.use(cors());
app.use("/api/auth", router);


connectDb().then(() => {
  app.listen(port, () => console.log(`Server running on port : ${port}`));
})
