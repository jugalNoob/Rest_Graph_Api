require('dotenv').config();
const express = require('express');
const redisClient = require('./redisClient'); // Import Redis client
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const router = require('./routes/router');
const startServer = require('./Cluster/clust');
const cookieParser = require('cookie-parser');
require('./db/conn'); // Database connection

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: true,
  statusCode: 400,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
    requestWasSuccessful: false
  }
});

app.get('/', limiter, (req, res) => {
  res.send('Hello, World!');
});

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
app.use(router);

module.exports = app; // Export only `app`
