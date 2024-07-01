//why we use Node.js?
//Ans::  Node.js allows developers to use JavaScript for server-side programming



//||What is express.js?
//ANS:: Express.js is a minimal and flexible Node.js web application
 //framework that provides a robust set of features for building 
 //single and multi-page,

 //||What is advantage express?
 //ANS:: It helps you build single and multi-page applications 
 //quickly by providing a simple API for routing HTTP requests to your code.

 //1 Templating Engines:   like EJS, Pug, or Handlebars to render dynamic HTML pages.

 //:: Routing: Express allows you to define routes for handling different HTTP  (e.g., GET, POST, PUT, DELETE)

 


const express = require("express");
const app = express();
require('dotenv').config();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const Status=require("./Status")
const port = process.env.PORT 



/// ---------------------> Cors -------------------->

const corsOption={
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE , PATCH , HEAD",
    Credential:true,

}
app.use(cors(corsOption))

 
/// app middlers --------------------------------------->

app.use(Status())
app.use(express.json());
app.use(cookiParser());
app.use(router);


app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})



    // const port = process.env.PORT 

    // require('dotenv').config();