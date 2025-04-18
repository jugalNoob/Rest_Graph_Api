
const  Register=require("../model/student")

// http://localhost:9000/v1/delId/6517918a4f599b5c0ef5f01e

//http://localhost:9000/v1/delId/6517918a4f599b5c0ef5f019/Anku
exports.deleteuser= async (req, res) => {

    try {
        const _id = req.params.id;
        const _name = req.params.name;


        const deletedUser = await Register.findOneAndDelete({ _id, name: _name });


        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.send(deletedUser);

        console.log(deletedUser)
    
      
    
        res.status(200).json({ error: "user delete OK" });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Internal server error" });
    }

}