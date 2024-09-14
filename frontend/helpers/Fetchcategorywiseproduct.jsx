import SummaryApi from "../src/common"

const FatchcategorywiseProduct = async(category) =>{
    const response = await fetch(SummaryApi.categorywiseProduct.url,{
        method:SummaryApi.categorywiseProduct.method,
        headers :{
            "content-type" : 'application/json'
        },
        body : JSON.stringify({
            category: category
        })
    })
    const datarespose = await response.json()
    return datarespose
}
export default FatchcategorywiseProduct
