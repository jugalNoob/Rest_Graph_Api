const express = require("express");
const router = new express.Router();


const controller=require("../controller/userControllers.js")


// API versioning and route
//post information
router.get('/v1/signup/:id', controller.forms)


//get information about
router.get("/v2/Dataget/:id",controller.user )

// Update  information 
router.get("/v3/updates/:id",controller.updates)


//delete Information about
router.get("/v4/delete/:id",controller.delete)



module.exports = router;
