const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controller");


router.route("/").get(authControllers.home);
//signup route
router.route("/signup").post(authControllers.signup);
//login route
router.route("/login").post(authControllers.login);
module.exports = router;