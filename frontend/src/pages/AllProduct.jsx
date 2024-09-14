import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import AddminProduct from "../components/addminProduct";

export default function AllProduct() {
  const [openUploadProduct, setopenloadProduct] = useState(false)
  const [allproduct ,setallproduct] = useState([])

  const fetchallProduct = async() =>{
    const response = await fetch(SummaryApi.GetProduct.url,{
      method: SummaryApi.GetProduct.method,
      credentials:'include'
    })
    const getdata = await response.json();
    if(getdata.success){
      setallproduct(getdata?.data || [])
    }
    if(getdata.error){
      toast.error(getdata.message)
    }
  }

  useEffect(()=>{fetchallProduct()},[])
  return (
    <div>
      <div className="bg-white p-2 flex justify-between">
        <h1 className="font-bold text-lg">All Product</h1>
        <button 
        onClick={()=>setopenloadProduct(true)}
        className=" cursor-pointer border-2 py-1 px-3 rounded-full border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all">
          Upload a product
        </button>
      </div>


      {/* get allproduct */}
      <div className="flex gap-5 p-2 mt-2 flex-wrap h-[calc(100vh-170px)] overflow-y-scroll ">
        {
          allproduct?.map((el,index)=>{
            return(
              <AddminProduct data={el} key={index} fetch={fetchallProduct}/>
            )
          })
        }
      </div>
      {/* upload product component */}
      {
        openUploadProduct && (<UploadProduct onclose={()=>setopenloadProduct(false)} Datafetch={fetchallProduct}/>)
      }
      
    </div>
  )
}
