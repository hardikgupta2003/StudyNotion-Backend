const express = require("express")
const router = express.Router();

const {
    login,
    signup,
    sendotp,
    changePassword,
}=require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword
}=require("../controllers/ResetPassword");

const {auth}=require("../middlewares/auth");

//routes for login ,signup and Authentication


//authentication routes

//route for login
router.post("/login",login);

//route for signup
router.post("/signup",signup);

//route for sending otp to the user's email
router.post("/sendotp",sendotp);

//route for changing the password
router.post("/changepassword",auth,changePassword);


//reset password

//Route for generating a reset password token

router.post("/reset-password-token",resetPasswordToken);

//Route for resetting user's password verification
router.post("/reset-password",resetPassword)

//export
module.exports=router
