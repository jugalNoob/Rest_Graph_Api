const express = require("express");
const router = new express.Router();


const controller=require("../controller/userControllers.js")
const updates=require('../controller/update.js')
const getes=require("../controller/GetAll.js")


// API versioning and route
//post information
router.post('/v1/signup', controller.forms)


//get information about
router.get("/v2/DataGet",getes.users ) //http://localhost:9000/v2/Dataget/45


// --- get Information Pagination ::::::::::::::::
//  router.get("/v2/DataGet?limites&names&countrys&less&great&equals&truess&agelessValues=150&agegreatValues=500",controller.pagin)



// router.get("/v2/pagination",controller.Pagin)



// Update  information 
router.patch("/updates/:id",updates.updatesAll)


//delete Information about
router.get("/v4/delete/:id",controller.delete)



module.exports = router;
