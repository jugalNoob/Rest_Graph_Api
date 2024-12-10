const Register=require("../models/student")

// {
//     "name": "bitcoin",
//     "age": 18,
//     "hobbies": ["gaming", "rapping"],
//     "identity": {
//       "hashPanCard": true,
//       "hashAdhaarCard": false
//     },
//     "bio": "I am a YouTuber and biker",
//     "eligible":true
//   }
exports.forms = async (req, res) => {
    const { name, age, hobbies, identity, bio,eligible , gender , country } = req.body;
    try {
      // Check for missing fields
     
      // Create a new user document using the User model
      const userData = new Register({
        name,
        age,
        hobbies,
        identity,
        bio,
        eligible,
        gender , 
        country
      })
      const savedData = await userData.save();
      console.log(savedData);
  
      res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  

//Get Information User

// http://localhost:9000/post?name=janadjugal&roll_no_gt=4

///http://localhost:9000/post?limites=1
// http://localhost:9000/post?roll_no_gt=20
// http://localhost:9000/post?limites=5&gerten=5
//this is man show all Your
// http://localhost:9000/post?limites=&gerten=&name=andtv

//

////////////////////////////////////////////////////FIXME - //!SECTION
//AllNew Link 
//// db.users.find().sort({age: 1})
//http://localhost:9000/Get?name=&gerten=10&lessthen=20
//http://localhost:9000/Get?name&gerten&lessthen&limites=2
//http://localhost:9000/Get?name&gerten&lessthen&&one=gaming&two=rapping
///db.users.updateMany({age:{$lte:14}} , {$set:{isEligible:false}}) // add nuw Data and $get is graten then 14
//db.dataall.updateMany({age:{$gte:14}} , {$set:{isEligible:true}}) // add nuw Data and $get is graten then 14



// Import your Mongoose model

// // db.users.find().sort({age: 1})
        //{ category: { $nin: ["A", "B"] } }

exports.user = async (req, res) => {
    try {
        const startTime = performance.now();
        const { names, gerten, lessthen, limites, one, two , hoobies , sorts } = req.query;
        const query = {
            ...(names && { name: { $regex: names, $options: "i" } }),
            ...(gerten && lessthen && { age: { $gt: gerten, $lt: lessthen } }),
            ...(one && two && { hobbies: { $in: [one, two] } }),
            ...(hoobies && { hobbies: { $in: [hoobies] } }),
        
        };
        const documents = await Register.find(query)
            .limit(parseInt(limites))
            .sort({  age: 1 });

        if (!documents) {
            // Handle case when no documents are found
            res.status(404).json({ message: "No matching documents found" });
            return;
        }

        const endTime = performance.now();
        const resultShow = await Register.countDocuments(query);
        const totalDocumentCount = await Register.countDocuments({});

        console.log("Time taken for the search (ms):", endTime - startTime);
        console.log(resultShow, "this result show" , 'helloo');
        console.log(totalDocumentCount, "this totalDocumentCount");
        res.status(200).json(documents);
   

     
        // const responesData={
        //     resultShow: resultShow,
        //     totalDocumentCount : totalDocumentCount,
        //     data: documents,
        //     timeTaken : (endTime-startTime)/1000

        // }

        // res.json(responesData);
      


    } catch (error) {
        console.error(error);
        res.status(402).json({ error: " server error" });
    }
};



//Aggregate start row class Line time 
exports.GetData = async (req, res) => {
    try {
        const resultShow = await Register.aggregate([
            { 
                $sort: { "age": -1}  // sort age 
              },
            {
                $match: { gender: "female" } // Use $match stage separately
            },
            {
                $group: {
                    _id: "$age",
                    userInfo: {
                        $push: {
                            name: "$name",
                            gender: "$gender",
                            age:"$age",
                            hobbies: "$hobbies",
                            identity:"$identity",
                            bio:"$bio",
                            country:"$country",
                            isEligible:"$isEligible"
                        }
                    }
                }
            },
            {
                $limit: 5 // Place the $limit stage here to limit the number of results
            }
        ]);

        const totalDocumentCount = await Register.countDocuments({});
        console.log(totalDocumentCount, "totaldocument");

        // console.log(resultShow);
        res.send(resultShow);
    } catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




// const query = { age: { $gt: 25 } }; // Find documents where age is greater than 25
// const projection = { name: 1, age: 1 }; // Include only name and age fields
// const sort = { age: 1 }; // Sort by age in ascending order
// const limit = 10; // Limit results to 10 documents

// const cursor = collection.find(query);
// const results = cursor.project(projection).sort(sort).limit(limit).toArray();



///Search your information bu id
// exports.update= async (req, res) => { 

//     const {id} = req.params;
//     const { name , subject } = req.body;
//     try {       
//         const updateUserdata = await Register.findByIdAndUpdate({_id:id},{
//           name , subject 
//         },{new:true});

//        let latain= await updateUserdata.save();
//         console.log(latain)
//         res.status(200).json(updateUserdata)
//     } catch (error) {
//         res.status(400).send(error);
//         console.log("catch block error" , error
//         )
//     }
// }




///This is Update Your Data With Advance 
// {
//     "name": "bitcoin",
//     "age": 19,
//     "hobbies": ["rapping", "YouTuber"],
//     "identity": {
//       "hashPanCard": true,
//       "hashAdhaarCard": true
//     },
//     "bio": "I am a YouTuber and biker",
//     "eligible": true
//   }


///http://localhost:9000/updates/6517918a4f599b5c0ef5f017

// {
//     "name":"Ether",
//         "age": 69,
//         "bio": "I am a YouTuber and biker",
//       "country":"indian"
//       }


// db.users.updateMany(
//     { age: { $gte: 14 } },
//     { $set: { gender: "male" } },
//     { writeConcern: { w: "majority" } }
//   );
// const startTime = performance.now();
// const endTime = performance.now();
// console.log("Time taken for the search (ms):", endTime - startTime);
  



exports.updates = async (req, res) => {
    try {
        const { name,age,bio,country } = req.body;

        const _id = req.params.id;

        // Update the data in the database
        const updateyourdata = await Register.updateMany({ _id }, {
         name,   age,  bio,  country 
        });
        if (updateyourdata) {
            res.status(200).json({ status: "success" });
        } else {
            res.status(404).json({ status: "unsuccessful", error: "No matching records found" });
        }
        console.log(updateyourdata); // For debugging purposes
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "An error occurred" });
    }
};


// age,
// hobbies,
// identity,
// bio,
// eligible

//DeletYour Information

exports.delete= async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedUser = await Register.findByIdAndDelete(_id); // Use findByIdAndDelete method
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log(deletedUser)
        res.send(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Internal server error" });
    }
}



//::::::::: Multi Build Error Handle  -------------->><<>
    // Example routes
// app.get('/', (req, res, next) => {
//     // Simulate a bad request error
//     next(new BadRequestError('Invalid request body'));
// });

// app.get('/user/:id', (req, res, next) => {
//     const userId = req.params.id;

//     // Simulate a not found error
//     if (userId !== '123') {
//         return next(new NotFoundError('User not found'));
//     }

//     // Simulate success
//     res.json({ userId, username: 'john_doe' });
// });




// app.use((err, req, res, next) => {
//     if (err instanceof BadRequestError) {
//         return res.status(400).json({ error: err.message });
//     }

//     if (err instanceof NotFoundError) {
//         return res.status(404).json({ error: err.message });
//     }

//     // Handle other types of errors
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
// })

