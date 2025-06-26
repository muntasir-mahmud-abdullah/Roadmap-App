require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDb = require("./db/db")
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const errorMiddleware = require("./middlewares/error-middleware")
const port = process.env.PORT || 5000;
const authRoute = require('./router/auth-router');
const serviceRoute = require('./router/services-router')
//tackling cors
const corsOptions = {
  origin: ["http://localhost:5173", "https://roadmap-app-1810005.netlify.app"],
  methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
  credentials: true,

}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
// app.use("/api/data", serviceRoute);
app.use(errorMiddleware);


connectDb().then(() => {
  app.listen(port, () => console.log(`Server running on port : ${port}`));
})
