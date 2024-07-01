const express = require("express");
const app = express();
require("./db/conn"); // Assuming this file connects to a database
require('dotenv').config(); // Loads environment variables from a .env file
const router = require("./routes/router"); // Assuming this file contains route definitions
const cors = require("cors"); // Enables Cross-Origin Resource Sharing
const cluster = require("cluster");
const os = require("os");
const totalCPUs = os.cpus().length;


if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < totalCPUs; i++) {
       let worker = cluster.fork();
       worker.send('hi there'); // Sending a message to the worker
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        if (signal) {
            console.log(`Worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
            console.log(`Worker exited with error code: ${code}`);
        } else {
            console.log('Worker success!');
        }
    });

    cluster.on('disconnect', (worker) => {
        console.log(`The worker #${worker.id} has disconnected`);
    });
} else {
    // Listen for messages from the parent process
    process.on('message', (message) => {
        console.log(`Worker ${process.pid} received message: ${message}`);
    });

     const app = express();
    const port = process.env.PORT
    app.use(express.json());
    app.use(cors());
    app.use(router);
    app.get("/", (req, res) => {
        console.log(`Request received on worker ${process.pid}`);
        res.json({ message: `Hello, this is the response from the server. Worker ${process.pid}` });
    });
  ///REVIEW - //////////////

app.listen(port, () => {
        console.log(` Worker ${process.pid} is running on port ${port}`);
    });
}
