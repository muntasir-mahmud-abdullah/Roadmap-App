const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator")
const validate = require("../middlewares/validate-middleware")

router.route("/").get(authControllers.home);
//signup route
router.route("/signup").post(validate(signupSchema), authControllers.signup);
//login route
router.route("/login").post(validate(loginSchema), authControllers.login);
module.exports = router;