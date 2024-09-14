const PrdouctMode = require("../../models/ProductModel")

const getproductController = async(req, res) =>{
    try {
        const allProduct = await PrdouctMode.find()
        res.json({
            message : "All Product",
            success : true,
            error:false,
            data: allProduct
        })
    } catch (error) {
        res.json({   
            message : error.message || error, 
            error : true,
            success :false,
        })
    }
}

module.exports = getproductController