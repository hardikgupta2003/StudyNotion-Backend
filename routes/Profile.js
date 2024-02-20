const express = require("express")
const router = express.Router();
const {auth} = require("../middlewares/auth");
const {deleteAccount,
updateProfile,
getAllUserDetails,
updateDisplayPicture,
getEnrolledCourses
} = require("../controllers/Profile");


///// profile Routes////


//delete user account

router.delete("/deleteProfile",auth,deleteAccount);

router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,
getAllUserDetails);

//get enrolled courses
router.get("/getEnrolledCourse" , auth, getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports=router;






