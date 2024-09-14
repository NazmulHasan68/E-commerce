const uploadProductpermission = require("../../helpers/permission")
const PrdouctMode = require("../../models/ProductModel")

async function UpdateProduct(req, res) {
    try {
        if(!uploadProductpermission(req.userId)){
            throw new Error("Permission Denaied")
        }
        const {_id, ...resBody} = req.body
        const updateProduct = await PrdouctMode.findByIdAndUpdate(_id,resBody)
        res.json({
            message :"Product Upated",
            success:true,
            error: false,

        })

    } catch (error) {
        res.json({   
            message : error.message || error, 
            error : true,
            success :false,
        })
    }
}

module.exports = UpdateProduct