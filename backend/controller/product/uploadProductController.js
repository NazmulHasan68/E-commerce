const uploadProductpermission = require("../../helpers/permission")
const PrdouctMode = require("../../models/ProductModel")

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId
        if(!uploadProductpermission(sessionUserId)){
            throw new Error("Permission Denaied")
        }
        const uploadProduct = new PrdouctMode(req.body)
        const saveProduct = await uploadProduct.save()
        res.status(200).json({
            data : saveProduct,
            message: "Product Upload Successfully",
            error: false,
            success: true,
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
module.exports = UploadProductController