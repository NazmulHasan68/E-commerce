const userModel = require("../models/userMode")

const uploadProductpermission = async(userId) =>{
    const user =await userModel.findById(userId)
    console.log(user);
    
    if(user?.role !== 'ADMIN'){
        return false
    }
    return true
}
module.exports = uploadProductpermission