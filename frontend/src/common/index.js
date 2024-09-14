const backendDomin = "http://localhost:8000"
const SummaryApi = {
    SignUp :{
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    SignIn :{
        url : `${backendDomin}/api/login`,
        method : "post"
    },
    current_user :{
        url : `${backendDomin}/api/user-details`,
        method :"get"
    },
    logiut_user : {
        url : `${backendDomin}/api/userlogout`,
        method :"get"
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method :"get"
    },
    updateuser : {
        url : `${backendDomin}/api/updateduser`,
        method :"post"
    },
    UploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method :"post"
    },
    GetProduct : {
        url : `${backendDomin}/api/get-product`,
        method :"get"
    },
    UpdateProduct : {
        url : `${backendDomin}/api/update_product`,
        method :"post"
    },
    CategoryProduct : {
        url : `${backendDomin}/api/getcategory-product`,
        method :"get"
    },
    categorywiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method :"post"
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method :"post"
    },
    addtocartproduct : {
        url : `${backendDomin}/api/addtocart`,
        method :"post"
    },
    countAddtoCartProduct : {
        url : `${backendDomin}/api/countAddtoCartProduct`,
        method :"get"
    },
    viewCartProduct:{
        url : `${backendDomin}/api/view-cart-product`,
        method :"get"
    },
    UpdatecartProduct:{
        url : `${backendDomin}/api/Update-cart-product`,
        method :"post"
    },
    DeleteCartProduct:{
        url : `${backendDomin}/api/delete-cart-product`,
        method :"post"
    },
    SearchProduct:{
        url : `${backendDomin}/api/search`,
        method :"get"
    },
    FilterProduct:{
        url : `${backendDomin}/api/filter_product`,
        method :"post"
    },
   
    
    
    
}
export default SummaryApi