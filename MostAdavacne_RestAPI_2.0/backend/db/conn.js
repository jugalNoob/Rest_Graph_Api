const mongoose = require('mongoose');
require('dotenv').config(); // If you're using dotenv to manage environment variables

const DB = process.env.DATAS;


(async () => {
    try {
      if (!DB) {
        throw new Error("Database URL not provided. Please set the DATAS environment variable.");
      }
  
      await mongoose.connect(DB, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
      });
  
      console.log("Connected to the database");
    } catch (err) {
      console.error("Error connecting to the database:", err.message);
    }
  })();


// const { MongoMemoryServer } = require("mongodb-memory-server");

// let mongod;

// beforeAll(async () => {
//   mongod = await MongoMemoryServer.create();
// mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })


// https://dev.to/ali_adeku/guide-to-writing-integration-tests-in-express-js-with-jest-and-supertest-1059



