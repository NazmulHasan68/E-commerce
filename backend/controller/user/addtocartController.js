const CartPrdouctMode = require("../../models/cartProduct")

const addtocartController = async(req, res) =>{
    try {
        const {productId} = req?.body
        const currentUser = req?.userId

        const isProductAvailable = await CartPrdouctMode.findOne({productId})
        if(isProductAvailable){
            return res.json({
                message : "Already exist add to cart",
                success: false,
                error : true
            })
        }else{
            const payload = {
                productId : productId,
                quantity : 1,
                userId:currentUser
            }
            const newAddTocart = new CartPrdouctMode(payload)
            const saveProduct = await newAddTocart.save()
    
            return res.json({
                data: saveProduct,
                message : "Product Add in cart",
                success : true,
                error : false
            })
        }
        

    } catch (error) {
        res.json({   
            message : error.message || error, 
            error : true,
            success :false,
        })
    }
}

module.exports = addtocartController