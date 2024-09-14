const userModel = require("../../models/userMode")

async function AllusersConrtroller(req, res) {
    try {
        const allusers = await userModel.find()
        res.json({
            message : "All user ",
            data : allusers,
            success:true,
            error:false
        })
    } catch (error) {
        res.json({   
            message : error.message || error, 
            error : true,
            success :false,
        })
    }
}
module.exports = AllusersConrtroller