const CartPrdouctMode = require("../../models/cartProduct")

const updateAddTocartProduct = async(req,res) =>{
    try {
        const currentUserId = req.userId
        const addtocartProductId = req.body._id 

        const qty = req.body.quantity
        const updateProduct =await CartPrdouctMode.updateOne({_id:addtocartProductId},{
            ...(qty && {quantity : qty})
        })
        res.json({
            data: updateProduct,
            message : "Product updated",
            error:false,
            success : true
        })
    } catch (error) {
        res.json({   
            message : error?.message || error, 
            error : true,
            success :false,
        })
    }
}

module.exports = updateAddTocartProduct