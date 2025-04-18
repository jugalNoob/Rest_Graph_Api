
let one = 0; // Persistent counter across requests
let resetInProgress = false; // Prevent multiple resets

// Middleware for counter logic
const counterMiddleware = (req, res, next) => {
    if (one >= 25) {
        if (!resetInProgress) {
            resetInProgress = true;
            console.log("Reset will occur in 5 seconds.");

            setTimeout(() => {
                one = 0;
                resetInProgress = false;
                console.log("Counter reset.");
            }, 5000); // 5-second delay
        }

        // Improved error response for better client understanding
        return res.status(429).json({
            error: "Too Many Requests",
            message: "Please wait a few seconds before trying again. because user try Too Many Requests just wait 5 second",
            retryAfter: 5 // Recommended delay (in seconds)
        });
    }

    req.counterValue = one; // Track counter value in request object
    one++;
    next(); // Continue to the next middleware
};

module.exports = counterMiddleware;

// let one = 0; // Declare outside to persist across requests
// let resetInProgress = false; // To avoid multiple resets at the same time

// // Middleware to handle the counter logic
// const counterMiddleware = (req, res, next) => {
//     if (one >= 5) {
//         if (!resetInProgress) {
//             resetInProgress = true;
//             console.log("Reset will occur in 5 seconds.");
//             setTimeout(() => {
//                 one = 0;
//                 resetInProgress = false;
//                 console.log("Counter reset.");
//             }, 5000); // 5-second delay
//         }
//         return res.send(`Limit reached: wait for a few seconds`);
//     }
//     req.counterValue = one; // Store the value in the request object
//     one++;
//     next();
// };


module.exports=counterMiddleware;


// const TimeDate = (req, res, next) => {
//     let date = new Date();
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let seconds = date.getSeconds();

//     console.log(`Date: ${day}/${month}/${year} Time: ${hours}:${minutes}:${seconds}`);

//     next(); // Ensure the request proceeds to the next middleware or route handler
// };




