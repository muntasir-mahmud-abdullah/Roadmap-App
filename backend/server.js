const express = require('express');
// const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const router = require('./router/auth-router');
app.use("/api/auth",router);
// app.use(cors());
// app.use(express.json());
// app.get("/", (req, res) => res.send("Backend is running"));

app.listen(port, () => console.log("Server running on port 5000"));
