const CartPrdouctMode = require("../../models/cartProduct")

const addtocartviewProduct = async (req, res) =>{
    try {
        const currentUser = req?.userId
        const allproduct = await CartPrdouctMode.find({
            userId : currentUser
        }).populate("productId")
        
        res.json({
            data : allproduct,
            success : true,
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
module.exports = addtocartviewProduct