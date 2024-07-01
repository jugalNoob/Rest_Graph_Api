
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