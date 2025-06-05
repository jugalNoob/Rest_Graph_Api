const express = require("express");
const router = express.Router();
const NorthData=require("../controller/North")
const Updateone=require("../controller/Update")

const GetAdvance=require("../controller/AdvanceGet")
const Deleteone=require("../controller/Delete")
// const SouthData=require("../controller/South")
// const { sendNorthMessage } = require("../producer/producer_north");

router.post("/send", async (req, res) => {

});

router.post('/v1/North', NorthData.NorthData)

router.get("/v2/AdGet",GetAdvance.Advanceusers ) //http://localhost:9000/v2/Dataget/45




// Update  information 
router.patch("/updates/:id",Updateone.updatesAll)


//delete Information about

router.delete("/v1/delId/:id/:name",Deleteone.deleteuser)
// router.post('/v1/South', SouthData.SouthData)

module.exports = router;