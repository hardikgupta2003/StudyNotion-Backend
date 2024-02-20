const User = require("../models/Users");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto");


//reset password token
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const email = req.body.email;

        //check user for this email, email validation
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            });
        }
        // generate token 
        const token = crypto.randomBytes(20).toString("hex");
        console.log(token);
        // update user by adding token and expiration time 
        const updatedDetails = await User.findOneAndUpdate({ email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 3600000, //expire in 5 mins
        }, { new: true });
        console.log("DETAILS", updatedDetails);
        //create frontend url which will be send to  the user via email
        const url = `http://localhost:3000/update-password/${token}`;
        //send email with link to the user containing the url
        await mailSender(email, "Password Reset Link", `Your Link for email verification is ${url}. Please click this url to reset your password`);
        return res.status(200).json({
            success: true,
            message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



//reset Password
exports.resetPassword = async (req, res) => {
    try {
        //data fetch
        const { password, confirmPassword, token } = req.body;
        // validate 
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: 'Passwords are not matching!'
            });
        }
        //get userDetails from db using token
        const userDetails = await User.findOne({token:token});
        //check if user is found or not - invalid token
        if (!userDetails) {
            return res.json({
                success:false,
                message:'Invalid Token'
            })
        }
        // token time check 
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({success:false,message:"Token Expired! Please reset your password again."})
        }
        //hashing the password and updating it in the database
        // userDetails.password=await bcrypt.hash(password, 12);
        const hashedPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )
        
        //sending response to frontend
        res.json({
            success: true,
            message: "Password has been successfully changed!"
        });
    } catch (err) {
        console.log("Error : ", err);
        res.status(400).send("Something went wrong while sending reset password mail");
    }
}
