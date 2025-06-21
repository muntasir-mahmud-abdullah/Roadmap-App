const { z } = require("zod");


// Creating an object schema for signup
const signupSchema = z.object({
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(7, { message: "Password must be at least of 7 characters" })
        .max(1024, { message: "Email must not be more than 1024 characters" })

})

module.exports = signupSchema;