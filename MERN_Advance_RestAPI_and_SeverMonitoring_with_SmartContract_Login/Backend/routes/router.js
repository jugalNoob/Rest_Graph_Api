const express = require("express");
const router = new express.Router();
require('dotenv').config()

const Register=require("../models/student")
const controllers=require("../controollers/userControllers")

//Monitoring start row  class Line 



const client = require("prom-client"); //metrice collection
const responseTime = require('response-time');
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");




const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
};

const logger = createLogger(options);

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({  
  name: "http_express_req_res_time_Historgram",
  help: "This tells how much is taken by req and res",
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 50, 100, 200, 500, 800, 1000, 2000]
});


///TotalReq ///////////////////////////////
const totaReq = new client.Counter({
  name: "total_req",
  help: "Tells total req"
});


///activeConnections //////////////////////////ANCHOR - 
const activeConnections = new client.Gauge({
  name: "active_connections",
  help: "Number of active connections",
  labelNames: ['service'],
});


///Summary /////////////////////////////////////////////////////ANCHOR - 
const requestDurationSummary = new client.Summary({  //
  name: "request_duration_summary",
  help: "Summary of request durations",
  labelNames: ['method', 'route' ,'status_code'],
  percentiles: [0.5, 0.9, 0.99],
});
//request_duration_summary{quantile="0.99",method="GET",route="/",status_code="404"} 6.128


  ///Create a middleWare ////!SECTION

  
  
  router.use(responseTime((req, res, time) => {   //this is middle ware 

      // Observe the actual request duration using the 'time' parameter
      requestDurationSummary.labels(
     req.method  || "GET" || "POST" || "PATCH" || "Delete",
        req.url ,// You can use 'req.url' as the route label
        res.statusCode
      ).observe(time);
    

    // Increment the activeConnections gauge for the service when a new connection is established
    activeConnections.labels({ service: 'your_service_name' }).inc();
  
    // Increment the total request counter
    totaReq.inc();
    // totaReq.dec();
  
    // Log the total number of requests
    console.log("Total Requests:", totaReq.hashMap[''].value);
  
    // Log the current date and time
    let datatimes = new Date();
    console.log("Current Date and Time:", datatimes);
  
    // Observe the request-response time using the provided parameters
    reqResTime.labels({
      method: req.method || "GET" || "POST" || "PATCH" || "Delete",
      route: req.url,
      status_code: res.statusCode
    }).observe(time);
  
    // Log the response time
    console.log("Request Time:", time);
  }));
  






  ///Slow check Your  ////////////////////FIXME - 
  router.get("/slow", async (req, res) => {
    try {
      // The response time is captured by the 'response-time' middleware
      // totaReq.inc();
      logger.info('req came on /slow router');
      res.json({
        name: "jugal",
        class: "40"
      });
    } catch (error) {
      logger.error(error.message);
    }
  });

  router.get("/jugal" , (req,res)=>{
    res.send("jugal")
  })

  //Meterix Your 
router.get("/metrics" ,async (req,res)=>{
    res.setHeader("Content-Type" ,client.register.contentType)
    const metrics=await client.register.metrics()
    // res.send(  totaReq.inc())
    res.send(metrics)

    // console.log(metrics)

})




//this is Your End Line Of code




router.post("/signup",controllers.forms )


router.get("/Dataget",controllers.user )

router.get("/Api",controllers.GetData )

router.patch("/updates/:id",controllers.updates)

router.delete("/delete/:id",controllers.delete)



module.exports = router;

// router.get("/finds" ,controllers.getAllDocuments)

// router.get("/signup/:id" , controllers.findId)

// router.get("/Op" ,controllers.AllSearch)
