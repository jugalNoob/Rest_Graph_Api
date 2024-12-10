
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




//// Redis connect Tion >..............
exports.user = async (req, res) => {
    try {
   
    
  
      // Check Redis cache for data
      const cachedData = await redisClient.get('apiGet');
      if (cachedData) {
        console.log('Data fetched from cache');
        return res.json(JSON.parse(cachedData));
      }
  
      const { limites, sorts , names } = req.query;

      const query = {
        ...(names && { name: { $regex: names, $options: "i" } }),

      }
    
      const count = await Register.find({query})
      .limit(parseInt(limites))
      .sort({  age: 1 });;
  
      const totalDocumentCount = await Register.countDocuments({});
      console.log(totalDocumentCount);
  
      // Cache the retrieved data in Redis
      await redisClient.set('apiGet', JSON.stringify(count), { EX: 3600 });
  
      res.status(200).json(count);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({
        status: "Error",
        message: "Server Error"
      });
    }
  };
  


  $or: [
    { qty: { $lt: 30 } }, { item: { $regex: '^p' } }
  ]


  db.dataall.find({} , {name:1 , _id:0}) // only all name and remove all id

  .skip(10) ///skip mena (10) man 

  var dataSize = cursor.dataSize();
db.users.dataSize({})
db.users.totalSize()
db.users.storageSize()
db.users.totalIndexSize()
db.users.countDocuments()

.$all
db.students.find({hobbies: {$all:['jugal','sharma']}}) // all meaning is jugal sharma both is true

https://github.com/jugalNoob/Rest_Graph_Api/blob/main/MERN_Advance_RestAPI_and_SeverMonitoring_with_SmartContract_Login/Backend/controollers/userControllers.js


////
This URL includes all the parameters the API expects:

limites: The maximum number of records to return, e.g., 10.
sorts: Sorting parameter (although it's not implemented in the code, you can add it if needed).
names: A regex search term for name, e.g., John.
countrys: A regex search term for country, e.g., USA.
less: Sets the maximum age, e.g., 30.
great: Sets the minimum age, e.g., 18.
equals: Searches for an exact age, e.g., 25.
truess: Filters based on isEligible being true.
ageless: A price less-than condition, e.g., 100.
agegreat: A price greater-than condition, e.g., 300.


 ...(year && {
          date: {
            $gte: new Date(`${year}-01-01T00:00:00.000Z`),  // start of the year
            $lte: new Date(`${year}-12-31T23:59:59.999Z`)   // end of the year
          }
        })





        
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