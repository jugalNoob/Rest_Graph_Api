
//// without a redis connection  :::::::::::::::::::::::::::::::::::::::

/// --- http://localhost:9000/v2/Dataget?limites&names=janad 
/// -- http://localhost:9000/v2/Dataget?limites=4
//http://localhost:9000/v2/Dataget?names&countrys=Vietnam
//http://localhost:9000/v2/Dataget?limites&names&countrys&less=15
//http://localhost:9000/v2/Dataget?limites&names&countrys&less&great=20
//http://localhost:9000/v2/Dataget?limites&names&countrys&less&great&equals&truess=false
//http://localhost:9000/v2/Dataget?limites&names&countrys&less&great&equals&truess=false
//http://localhost:9000/v2/Dataget?limites&names&countrys&less&great&equals&truess&agelessValues=150&agegreatValues=500
//http://localhost:9000/v2/Dataget?limites&hoobies=Reading  
//http://localhost:9000/v2/Dataget?ones=Gaming&twos=Reading
//http://localhost:9000/v2/Dataget?removes=0
//http://localhost:9000/v2/Dataget?year=2024

//http://localhost:9000/v2/DataGet?page=1&limit=5&pricegreat=100&priceless=200 --> False 

//http://localhost:9000/v2/DataGet?page=1&limit=5&pricegreat=100&priceless=200 -->True 

// /http://localhost:9000/v2/DataGet?page=1&limit=5&pricegreat=200&priceless=100 -->False



const  Register=require("../model/student")

exports.users = async (req, res) => {
    try {
      let page = Number(req.query.page) || 1; 
      let limit = Number(req.query.limit) || 5;
      let skip = (page - 1) * limit;
  
      const {
        limites, sorts, names, countrys, lesses, agegreats, prices ,pricegreat ,priceless,
        equals, truess, ageless, agegreat, ones, twos, hoobies, removes, year
      } = req.query;
  
     
   
      const equalsValue = !isNaN(parseFloat(equals)) ? parseFloat(equals) : undefined;
      const agelessValues = !isNaN(parseFloat(ageless)) ? parseFloat(ageless) : undefined;
      const agegreatValues = !isNaN(parseFloat(agegreat)) ? parseFloat(agegreat) : undefined;
  
      // Build the query object with validated values
      const query = {
        ...(names && { name: { $regex: names, $options: "i" } }), // name search
        ...(countrys && { country: { $regex: countrys, $options: "i" } }), // country search
        ...(lesses  && { age: { $lt: lesses } }), // age less than
        ...(prices &&  { price: { $lte: prices } }),
        ...(pricegreat && priceless && { price: { $gt: pricegreat, $lt: priceless } }),
        ...(agegreats && { age: { $gt: agegreats } }), // age greater than
        ...(equalsValue !== undefined && { age: { $eq: equalsValue } }), // age equal to specified value
        ...(truess && { isEligible: { $eq: truess === 'true' } }), // check true or false, parsed as boolean
        ...(agelessValues !== undefined && agegreatValues !== undefined && {
          age: {
            $gte: agelessValues,
            $lte: agegreatValues
          }
        }),
        ...(ones && twos && { hobbies: { $in: [ones, twos] } }), // check multiple hobbies
        ...(hoobies && { hobbies: { $in: [hoobies] } }), // single array check
        ...(year && {
          date: { 
            $gte: new Date(`${year}-01-01T00:00:00.000Z`), // Start of the year
            $lte: new Date(`${year}-12-31T23:59:59.999Z`)  // End of the year
          }
        })
      };
  
      // Projection to exclude _id if removes=0
      const projection = removes === '0' ? { _id: 0 } : {}; // Exclude _id if removes=0, otherwise include it
  
      // Fetch data with the constructed query, optional limit, and sorting
      const totalCount = await Register.countDocuments(query); // Get total count based on query
      const data = await Register.find(query, projection).skip(skip).limit(limit);
  
      res.json({ data, totalCount });  // Return data and total count
    } catch (error) {
      console.error(`Error: ${error.message}`);
      console.log(error)
      res.status(500).json({
        status: "Error",
        message: "Server Error"
      });
    }
  };
  
  


  exports.user = async (req, res) => { 

try {
  
} catch (error) {
  
}

  }

