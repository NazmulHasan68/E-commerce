const mongoose = require('mongoose')

const CartProduct = new mongoose.Schema({
    productId : {
        ref : 'product',
        type : String
    },
    quantity : Number,
    userId:String
},
{
    timestamps:true
})

const CartPrdouctMode = mongoose.model('addtocart',CartProduct);
module.exports = CartPrdouctMode
