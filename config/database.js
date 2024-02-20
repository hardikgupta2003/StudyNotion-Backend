const mongoose = require("mongoose");
require("dotenv").config();


exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{})
    .then(()=>
    console.log("first connection to the database is successful")
    )
    .catch((err)=>{
        console.log("DB connection Failed")
    console.log(err)
    process.exit(1)
    }
    
    );

}