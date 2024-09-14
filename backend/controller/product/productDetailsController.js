const PrdouctMode = require("../../models/ProductModel")
const productDetailsCOntroller = async(req, res)=>{
    try {
        const {productId} = req.body
        const product = await PrdouctMode.findById(productId)

        res.json({
            data : product,
            message : " okay product details",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = productDetailsCOntroller