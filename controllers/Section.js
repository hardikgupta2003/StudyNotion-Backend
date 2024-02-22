const Section = require("../models/Section");
const Course = require("../models/Courses");


//create new section

exports.createSection= async (req,res)=>{
    try{
        //fetch data from the request body
        const {sectionName,CourseId}=req.body;
        console.log(sectionName,CourseId);

        //validtion
        if(!sectionName || !CourseId){
            return res.status(404).json({
                success:false,
                message:'please fill all fields'
            });
        }

        //create new section with fetched data
        const newSection = await Section.create({sectionName});

        // add the new section to the course 
        const updatedCourse = await Course.findByIdAndUpdate(CourseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true})
            .populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

            //Return the updated course object in the response

            console.log(updatedCourse)
            res.status(200).json({
                success:true,
                message:"section created successfully",
                data:updatedCourse,
            });



    }
    catch(error){
        // handle errors
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}

// update a section
exports.updateSection=async (req,res)=>{
   try{
    const {sectionName,sectionId }=req.body;

    const section = await Section.findByIdAndUpdate({sectionId},
        {sectionName},
    {new:true});
    res.status(200).json({
        success:true,
        message:section,
    })
    
   } 
   catch(error){
    console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});

   }
}
// delete a section
exports.deleteSection=async (req,res)=>{
   try{
    const {sectionName,sectionId }=req.params;

    await Section.findByIdAndDelete(sectionId);
    res.status(200).json({
        success:true,
        message:`section : ${sectionName} deleted successfully`,
    })
    
   } 
   catch(error){
    console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});

   }
}