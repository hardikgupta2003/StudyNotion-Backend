//import the required modules
const express= require("express")
const router= express.Router()


// import the controllers 
//course controllers import
const {createCourse,getAllCourses,getCourseDetails}=require("../controllers/Course");


//categories controllers import
const { 
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category");

//sections controllers import
const { 
    createSection,
    updateSection,
    deleteSection,
}=require("../controllers/Section")


// Sub section constrollers import 
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/SubSection")

// rating controllers import
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview")

//importing middlewares
const {
    auth,
    isInstructor,
    isStudent,
    isAdmin
}=require("../middlewares/auth")


///// course routes ///
// courses can only be crated by instructor
router.post("/createCourse",auth,isInstructor,createCourse)
//add section
router.post("/addSection",auth,isInstructor,createSection)
//update section
router.post("/updateSection",auth,isInstructor,updateSection)
// delete section
router.post("/deleteSection",auth,isInstructor,deleteSection)

//add subsection
router.post("/addSubSection",auth,isInstructor,createSubSection)
// update subsection
router.post("/updateSubSection",auth,isInstructor,updateSubSection)
// delete subsection 
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)

//get all registered courses
router.get("/getAllCourses",getAllCourses);
//getDetails for a specefic Courses
router.post("/getCourseDetails",getCourseDetails);



///// category routes for ( admin only)


//category can only be created by admin
// todo : put isAdmin middleware here

router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllCategories);
router.post("/getCategoryPageDetails",categoryPageDetails)




///////Rating and review/////


router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRating);

module.exports= router;
