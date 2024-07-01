const mongoose=require("mongoose");

const Students=new mongoose.Schema({
   
    
    name: { type: String,Number, lowercase: true, trim: true },
 
    classs:{type:String,Number ,required: true 
     },
    roll_no:{type:String,Number,  required: true    
     },
 
    gender:{type:String , required: true },
 
     subject:{type:String,required: true
     },
     date: {
         type: Date,
         default: Date.now ,// Default value for date
         required: true
       },
       //  //timestamps: true ,
 })
 


const Register = new mongoose.model("Dataalls" , Students)
    // Error handler function
  module.exports = Register;
