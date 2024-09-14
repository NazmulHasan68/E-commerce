const express = require('express')
const router = express.Router()


//sign up Api
const userSignUpController = require('../controller/user/userSignController')
router.post('/signup',userSignUpController)
//login Api
const userloginController = require('../controller/user/userloginController')
router.post('/login', userloginController)

//user details api 
const userDetailController  = require('../controller/user/userDetailController')
const AuthToken  = require('../middleware/authToken')
router.get('/user-details',AuthToken ,userDetailController)

//logout api
const userLogoutController = require('../controller/user/userLogOutController')
router.get("/userlogout",userLogoutController)

//admin pannel
const AllusersConrtroller = require('../controller/user/AllusersController')
router.get("/all-user",AuthToken, AllusersConrtroller)

//update userRole
const upuserController = require('../controller/user/updateuserController')
router.post("/updateduser",AuthToken, upuserController)






//Upload product  =========================================================================================
const UploadProductController = require('../controller/product/uploadProductController')
router.post("/upload-product",AuthToken, UploadProductController)

//getProduct 
const getproductController = require('../controller/product/GetProductController')
router.get("/get-product",getproductController)

// update product
const UpdateProduct = require('../controller/product/updateProductController')
router.post("/update_product",UpdateProduct)

//get category product for iconsize uper
const getcategoryProduct = require('../controller/product/getcategoryProductController')
router.get('/getcategory-product',getcategoryProduct)


//category product 
const getcategoryWiseProduct = require('../controller/product/categoryWiseProduct')
router.post("/category-product", getcategoryWiseProduct)

//Product Details 
const productDetailsCOntroller = require('../controller/product/productDetailsController')
router.post("/product-details",productDetailsCOntroller)


//user add to cart 
const addtocartController = require('../controller/user/addtocartController')
router.post('/addtocart',AuthToken, addtocartController)


//count data
const countaddtocartController = require('../controller/user/countAddtocartController')
router.get("/countAddtoCartProduct",AuthToken, countaddtocartController)

// view cart product
const addtocartviewProduct = require('../controller/user/addtocartviewProduct')
router.get("/view-cart-product",AuthToken, addtocartviewProduct)

//update cart product
const updateAddTocartProduct = require('../controller/user/updateaddtocartproductController')
router.post("/Update-cart-product",AuthToken, updateAddTocartProduct)

//Deleted cart from cart
const DeleteAddtoCartProductController = require('../controller/user/deleteAddtocartController')
router.post("/delete-cart-product",AuthToken,DeleteAddtoCartProductController)

//searchProduct 
const searchProduct = require('../controller/product/searchProduct')
router.get('/search',searchProduct)

//filter-product
const filterProductController = require('../controller/product/filterProduct')
router.post("/filter_product",filterProductController)


module.exports = router
