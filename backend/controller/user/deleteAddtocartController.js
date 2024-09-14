const CartPrdouctMode = require("../../models/cartProduct")

const DeleteAddtoCartProductController = async(req, res)=>{
    try {
        const currentUserId = req.userId
        const addtocartproductId = req.body._id
        const deleteProduct = await CartPrdouctMode.deleteOne({_id:addtocartproductId})
        res.json({
            data:deleteProduct,
            message : "Product Deleted to Cart",
            error: false,
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

module.exports = DeleteAddtoCartProductController