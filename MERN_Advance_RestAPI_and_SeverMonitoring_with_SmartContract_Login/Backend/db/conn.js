// const mongoose=require("mongoose")

// const DB =process.env.DATAS
// // Create a new error handler function
// const errorHandler = (err) => {
//     // Log the error to the console
//     console.error(err);
  
//     // Check if the error is a connection error
//     if (err.code === mongoose.Error.CONNECTION_FAILED) {
//       // Retry the connection after 5 seconds
//       setTimeout(() => {
//         mongoose.connect(DB, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true
//         });
//       }, 5000);
//     } else {
//       // Throw the error
//       throw err;
//     }
//   };
  
//   // Add the error handler to the connection promise
//   mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(() => {
//     console.log("connect");
//   }).catch(errorHandler);


const mongoose = require('mongoose');
require('dotenv').config(); // If you're using dotenv to manage environment variables

const DB = process.env.DATAS;

(async () => {
  try {
    if (!DB) {
      throw new Error("Database URL not provided. Please set the DATAS environment variable.");
    }

    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();