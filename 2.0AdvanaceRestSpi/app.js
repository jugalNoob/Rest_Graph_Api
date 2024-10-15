require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const cookieParser = require('cookie-parser'); // Fixed typo
require('./db/conn'); // Database connection

// Create an instance of Express
const app = express();

// Define port, with a fallback to port 3000 if not in .env
const port = process.env.PORT || 3000;

// CORS options
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true, // Fixed typo
};

// Middleware setup
app.use(cors(corsOptions)); // Applying CORS options
app.use(express.json()); // Parsing incoming JSON requests
app.use(cookieParser()); // Parsing cookies
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies

// Routes
app.use(router);



// Start the server

try {
    app.listen(port, () => {
      console.log(`Worker ${port} started and listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the process with failure
  }
  
  // Handle unhandled promise rejections globally
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optional: Application specific logging, cleanup, etc.
  });
  
  // Handle uncaught exceptions globally
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1); // Exit the process to ensure consistent state
  });