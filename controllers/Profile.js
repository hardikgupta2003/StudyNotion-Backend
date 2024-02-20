const Profile = require("../models/Profile");
const User= require("../models/Users");
const {uploadImageToCloudinary}=require("../utils/imageUploader")

//methods for updating profile
exports.updateProfile= async (req,res)=>{
    try{
        const {dateOfBirth = "",about="",contactNumber}= req.body;
        const id = req.user.id;

        //find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        //update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about=about;
        profile.contactNumber = contactNumber;

        //save the updated profile
        await profile.save();

        return res.json({
            success:true,
            message:"profile updated successfully",
            profile,
        })

    }
    catch(error){
        console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});

    }

}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.deleteAccount = async (req,res)=>{
    try{
        // todo find more on job schedule
        // const job = schedule.scheduleJob("10 * * * *",function(){
        //     console.log(first);
        // })
        // console.log(first);

        const id= req.user.id;
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(404).json({
				success: false,
				message: "User not found",
			});
        }

        //delete associated profile with the user
        await Profile.findByIdAndDelete({
            _id:user.userDetails
        });

        //todo: unenroll user from all the enrolled courses 
        //now delete the user
        await user.findByIdAndDelete({
            _id:id
        });
        res.status(200).json({
            success:true,
            message:"user deleted successfully",
        })


    }
    catch(err){
        console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
    }
}

exports.getAllUsrDetails = async (req,res)=>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec();
        console.log(userDetails);
        res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
    }
    catch(error){
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
//update display picture

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};