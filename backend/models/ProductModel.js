const mongoose = require('mongoose')

const ProductModelschema = new mongoose.Schema({
    productName :String,
    brandName : String,
    category :String,
    productImage : [],
    description :String,
    price : Number,
    Selling :Number
},
{
    timestamps:true
})

const PrdouctMode = mongoose.model('product', ProductModelschema);
module.exports = PrdouctMode
