const express = require("express");
const { userExists } = require("../middleware/user.exists");
const { registerUser, loginUser, optVerifier } = require("../controller/user.controller");
const otpverify = require("../middleware/otp.middleware");

const userRouter = express.Router();

/**
 * @swagger
 * components: 
 *  schemas: 
 *      User: 
 *          type: object
 *          properties:
 *              first_name:
 *                  type: string
 *                  description: user's first name
 *              last_name:
 *                  type: string
 *                  description: user's last name
 *              email:
 *                  type: string
 *                  description: user's email address
 *              password: 
 *                  type: string
 *                  description: user's password for login authnetication
 *              gender:         
 *                  type: string
 *                  description: user's gender
 *              dob:    
 *                  type: string
 *                  method: date
 *                  description: user's Date of Birth
 *              phone: 
 *                  type: integer
 *                  description: user's phone number
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: New users will register themselves to use this application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User is registered successfully.
 */


userRouter.post("/register", userExists, registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     description: Users will login to their respective accounts.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *              email: 
 *                  type: string
 *                  description: user's regestered email address
 *              password: 
 *                  type: string
 *                  description: user's registered password
 *     responses:
 *       '200':
 *         description: User is registered successfully.
 */
userRouter.post("/login", loginUser);


userRouter.post("/verifyotp", otpverify, optVerifier)

module.exports = { userRouter };
