const PrdouctMode = require("../../models/ProductModel")

const searchProduct = async(req, res) =>{
    try {
        const query = req.query.q
        const regex = new RegExp(query,"i","g")
        const product = await PrdouctMode.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category: regex
                },
                {
                    brandName: regex
                }
            ]
        })
        res.json({
            data: product,
            message : "search Product list",
            error:false,
            success :true
        })

    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


module.exports = searchProduct