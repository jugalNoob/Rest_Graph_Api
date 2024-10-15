
//// create  a RestAPi



// Post use  infoirmation in restAPI


exports.forms = (req, res) => {
    const userId = req.params.id;
    // Add your logic to handle the request
    res.send(`User ID is: ${userId}`);
};




//  --- Get user Information ---- ///>>>

exports.user = async (req, res) => {

    const userId = req.params.id;
    // Add your logic to handle the request
    res.send(`User ID is: ${userId} getUser Information ` );

}




// Update User Infomrations ---- v>>>>


exports.updates = async (req, res) => {
    res.send("Update Datas")
}




/// Delete User Infomation  =============>>>
exports.delete= async (req, res) => {

    res.send("Delete Datas")

}
