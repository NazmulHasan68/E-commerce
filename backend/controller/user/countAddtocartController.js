const CartPrdouctMode = require("../../models/cartProduct")

const countaddtocartController = async(req, res)=>{
    try {
        const userId = req?.userId
        const count = await CartPrdouctMode.countDocuments({
            userId: userId
        })
        res.json({
            data: {
                count : count
            },
            message : "okay",
            error : false,
            success : true
        })


    } catch (error) {
        res.json({   
            message : error.message || error, 
            error : true,
            success :false,
        })
    }
}

module.exports = countaddtocartController