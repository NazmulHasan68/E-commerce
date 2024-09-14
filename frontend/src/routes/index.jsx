import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllProduct from "../pages/AllProduct";
import Alluser from "../pages/Alluser";
import CategoryProductListONe from "../pages/CategoryProductListONe";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";



const router = createBrowserRouter([
    {
        path:"/",
         element:<App/>,
         children:[
            {
                path:"", 
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"sign-up",
                element:<SignUp/>
            },
            {
                path : 'product-category',
                element :<CategoryProductListONe/>
            },
            {
                path : "product/:id",
                element: <ProductDetails/>
            },
            {
                path : "cart",
                element :<Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path: 'admin-panel',
                element:<AdminPanel/>,
                children:[
                    {
                        path :'allUser',
                        element :<Alluser/>
                    },
                    {
                        path : 'All-product',
                        element : <AllProduct/>
                    }
                ]
            },
            
         ]
    }
])

export default router