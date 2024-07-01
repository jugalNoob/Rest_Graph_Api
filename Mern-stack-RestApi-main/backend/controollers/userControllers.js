

const Register=require("../models/student")
exports.forms= async (req, res) => {
    const { name, classs, roll_no, gender, subject } = req.body;
    try {
   
        // Check for missing fields
        if (!name || !classs || !roll_no || !gender || !subject) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const userData = new Register({
            name, classs, roll_no, gender, subject
        });
        const savedData = await userData.save();
        console.log(savedData);

        res.status(201).json({ message: "Data saved successfully" });

    } catch (error) {
        console.error(error);
        res.status(41).json({ error: "An error occurred" });
    
    }
};


//Get Information User
// http://localhost:9000/post?limites=&gerten=$&name
// http://localhost:9000/post?limites=&gerten=$&name
// http://localhost:9000/post?name=janadjugal&roll_no_gt=4

///http://localhost:9000/post?limites=1
// http://localhost:9000/post?roll_no_gt=20
// http://localhost:9000/post?limites=5&gerten=5
//this is man show all Your
// http://localhost:9000/post?limites=&gerten=&name=andtv



exports.user = async (req, res) => {
    try {

    

        // Extract query parameters from the request URL
        const { name, limites, gerten } = req.query;
        const query = {
            ...(name && { name: { $regex: name, $options: "i" } }), // Filter by name if provided
            roll_no: { $gt: gerten }
        };
        console.log("Query:", query);
        const documents = await Register.find(query)
            .limit(parseInt(limites))
            .sort({ name: 1, roll_no: 1 });
        console.log("Documents:", documents);
        console.log(limites);
        const resultShow = await Register.countDocuments(query);
        const total = await Register.countDocuments({});
        // Create an object that includes documents, resultShow, and total
        const responseData = {
            documents: documents,
            resultShow: resultShow,
            total: total
        };
        // Send the combined object as a JSON response
        res.json(responseData);
    } catch (error) {
        console.log(error);
    
        res.status(500).json({ error: "Internal server error" });
    }
};



///Search your information bu id
exports.update= async (req, res) => { 

    const {id} = req.params;
    const { name , subject } = req.body;
    try {       
        const updateUserdata = await Register.findByIdAndUpdate({_id:id},{
          name , subject 
        },{new:true});

       let latain= await updateUserdata.save();
        console.log(latain)
        res.status(200).json(updateUserdata)
    } catch (error) {
        res.status(400).send(error);
        console.log("catch block error" , error
        )
    }
}


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




////!SECTION last row class Line  Start 

// exports.AllSearch= async(req, res) => {
//     const search=req.query.search || "" ;
//     console.log(search)
//     const status=req.query.status || "" ;
//     console.log("search" , search)
//     const query={
//         name:{$regex:search , $options:"i"} // 
//     }
//     try {
//         const check=await Register.find(query)
//         res.send(check)
//     } catch (error) {
//         console.log(error)
//         res.status(401).json({error:"not_good_io"})
//     }
// }