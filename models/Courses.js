const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }],
    ratingAndReview:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'RatingAndReviews',
    }],
    thumbnail:{
        type:String
    },
    tag: {
		type: [String],
		required: true,
	},
    price:{
        type:Number,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],


});

module.exports=mongoose.model("Course",courseSchema);