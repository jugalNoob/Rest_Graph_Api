const mongoose=require("mongoose");
// const keysecret=process.env.SECRETY_KEY;




const Students = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  hobbies: {
    type: [String],
    required: true
  },
  identity: {
    hashPanCard: {
      type: Boolean,
      required: true
    },
    hashAdhaarCard: {
      type: Boolean,
      required: true
    }
  },
  bio: {
    type: String,
    required: true
  },
  
eligible:{
  type: Boolean,

},

gender:{
  type : String ,
},

country:{
  type:String,
},
      date: {
        type: Date,
        default: Date.now ,// Default value for date
        required: true
      },
});



///FIXME - Models //SECTION - 

const Register = new mongoose.model("Users", Students)
    // Error handler function
  module.exports = Register;