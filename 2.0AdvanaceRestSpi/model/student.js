const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: {type: Date, default: Date.now ,required: true// Default value for date required: true
      },
});


const Register = new mongoose.model("Users", userSchema)
    // Error handler function
  module.exports = Register;