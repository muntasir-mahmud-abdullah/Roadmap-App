const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator")
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/").get(authControllers.home);
//signup route
router.route("/signup").post(validate(signupSchema), authControllers.signup);
//login route
router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/service").get(authControllers.getAllServices);

router.route("/users").get(authControllers.getAllUsers);

router.route("/service/:id/upvote").post(authMiddleware, authControllers.createUpvote);
router.route("/service/:id/upvote").get(authMiddleware, authControllers.getUpvote);

router.route("/service/:id/comment").post(authMiddleware, authControllers.postComment);
router.route("/comments/:commentId").put(authMiddleware, authControllers.editComment);
router.route("/comments/:commentId").delete(authMiddleware, authControllers.deleteComment);


router.route("/service/:id/comments").get(authMiddleware, authControllers.fetchComments);

module.exports = router;