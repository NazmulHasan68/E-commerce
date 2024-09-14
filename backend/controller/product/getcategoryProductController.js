const PrdouctMode = require("../../models/ProductModel")


const getcategoryProduct = async(req, res) =>{
    try {
        const productcategory = await PrdouctMode.distinct("category")
        //array to store one product from each category
       const productByCategory = []
       for(const category of productcategory){
        const product = await PrdouctMode.findOne({category})
        if(product){
            productByCategory.push(product)
        }
       }


       res.json({
        message: "category product",
        data : productByCategory,
        success:true,
        error:false
       })
        

    } catch (error) {
        res.json({   
            message : error.message || error, 
            error : true,
            success :false,
        })
    }
}

module.exports = getcategoryProduct