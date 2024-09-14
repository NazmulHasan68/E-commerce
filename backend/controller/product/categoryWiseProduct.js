const PrdouctMode = require("../../models/ProductModel")
const getcategoryWiseProduct = async(req, res) =>{
    try {
        const {category} = req?.body ||req?.query
        const product = await PrdouctMode.find({category})

        res.json({
            data : product,
            message : "Product",
            success : true,
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
module.exports = getcategoryWiseProduct