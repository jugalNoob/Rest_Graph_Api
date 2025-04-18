require('dotenv').config();
const express = require('express');
const redisClient = require('./redisClient'); // Import Redis client
const cors = require('cors');
const router = require('./routes/router');
const startServer = require('./Cluster/clust');
const cookieParser = require('cookie-parser');
require('./db/conn'); // Database connection

// const redget=require("./controller/GetAll")

const TimeDate = require("./rateLimite/rate"); // Correct import

const app = express();
const port = process.env.PORT || 9000;



app.get("/home", (req, res) => { 

  res.send("jugal sharma")
 })



const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

startServer(app, port);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(TimeDate); // Apply the middleware globally
app.use(router);







module.exports = app; // Export only `app`
