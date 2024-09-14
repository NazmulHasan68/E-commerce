import { toast } from "react-toastify"
import SummaryApi from "../src/common"

const addtocart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.addtocartproduct.url,{
        method : SummaryApi.addtocartproduct.method,
        credentials:'include',
        headers :{
            'content-type' : 'application/json'
        },
        body : JSON.stringify(
          { productId: id}
        )
    })
    const responseData = await response.json()
    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }
    return responseData
    
}
export default addtocart