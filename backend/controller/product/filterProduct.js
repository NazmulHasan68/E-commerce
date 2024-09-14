const PrdouctMode = require("../../models/ProductModel")
const filterProductController =async(req, res) =>{
    try {
        const categoryList = req?.body?.category || []
        const product = await PrdouctMode.find({
            category : {
                "$in" : categoryList
            }
        })
        res.json({
            data : product,
            message : "Product",
            error : false,
            success : true
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
module.exports = filterProductController