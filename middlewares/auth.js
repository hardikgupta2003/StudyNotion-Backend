const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/Users");


//auth
exports.auth = async (req,res,next)=>{
    try{
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ","");

        // if token missing, then return response 
        if(!token){
            return res.status(401).send({
                success:false,
                error:"No Token Provided"
                });
        }
        //token verify
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded)
            req.user = decoded;
        }
        catch(err){
            // verification issue 
            res.status(403).send({success: false,error:'Token is not valid'});
        }
        next();
    }
    catch(err){
        console.log('Error in Auth middleware', err);
    }
}


// isStudent middleware
exports.isStudent= async(req,res,next )=>{
    try{
        if(req.user,accountType !== 'student'){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for student only",
            })
    }
    next();
}
    catch(err){
        console.log("Error in is Student MiddleWare ",err);
    }
}


// isInstructor middleware
exports.isInstructor= async(req,res,next )=>{
    try{
        if(req.user,accountType !== 'Instructor'){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Instructor only",
            })
    }
    next();
}
    catch(err){
        console.log("Error in is Instructor MiddleWare ",err);
    }
}


// isAdmin middleware
exports.isAdmin= async(req,res,next )=>{
    try{
        if(req.user,accountType !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Admin only",
            })
    }
    next();
}
    catch(err){
        console.log("Error in is Admin MiddleWare ",err);
    }
}