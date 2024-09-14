import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import productCategory from "../../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../../helpers/uploadImage";
import Displayimage from "./Displayimage";
import SummaryApi from '../common';
import { toast } from "react-toastify";



export default function UploadProduct({
    onclose,
    Datafetch
}) {

    const [data, setdata] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        Selling : ""
    })

   const [openfullscreenImage, setOnpenfullscreenImage] = useState(false)
   const [fullscrenImage , setfullscreenImage] = useState("")
   
// for input all the field
    const handleOnChange = (e) =>{
        const {name , value} = e.target
        setdata((preve)=>{
          return{
            ...preve,
            [name] : value
          }
        })
    }

    //for upload product image
    const handleUploadProduct = async(e) =>{
      const file = e.target.files[0]
      const uploadImageCloudinary = await uploadImage(file)
      setdata((preve)=>{
        return{
          ...preve,
          productImage : [...preve.productImage, uploadImageCloudinary.url]
        }
      })
      
    }

    // delete product image
    const handleproductImage = async(index) =>{
      const newProductImage = [...data.productImage]
      newProductImage.splice(index,1)
      setdata((preve)=>{
        return{
          ...preve,
          productImage : [...newProductImage]
        }
      })
    }


    //upload product
    const handleSumite = async(e) =>{
      e.preventDefault()
      const response = await fetch(SummaryApi.UploadProduct.url,{
        method : SummaryApi.UploadProduct.method,
        headers : {
          'content-type' : 'application/json'
        },
        body :JSON.stringify(data)
      })
      const responseData = await response.json()
      if(responseData.success){
        toast.success(responseData?.message)
        Datafetch()
        onclose()
      }
      if(responseData.error){
        toast.error(responseData?.message)
      }
    }

  return (
    <div className=" fixed w-full h-full top-0 bg-slate-300 bg-opacity-40 bottom-0 left-0 right-0 flex 
        justify-center items-center">
      <div className="bg-slate-50 p-4 rounded shadow-lg w-full max-w-2xl h-full max-h-[80%]">
        <div className="flex justify-between items-center">
            <h2 className="font-semibold ">  Upload Product</h2>
            <div className="p-2 rounded-full hover:bg-red-100 hover:text-red-600 cursor-pointer">
                <IoClose className="text-xl" onClick={onclose}/>
            </div>
        </div>
       
       <form className="grid p-4 gap-2" onSubmit={handleSumite}>
        {/* product name and brand name */}
        <div className="flex justify-between items-center">
          <label htmlFor="productName" className="text-[16px]">Product Name</label>
          <input 
              type="text" 
              id="productName" 
              required
              placeholder="Enter Product Name"
              name="productName"
              value={data.productName} 
              onChange={handleOnChange}
              className="py-1 px-2 bg-slate-100 text-slate-700 border rounded-sm outline-none 
                          focus:ring focus:ring-slate-300"
          />


          <label htmlFor="brandName" className="text-[16px]">Brand Name</label>
          <input 
              type="text" 
              id="brandName" 
              required
              name="brandName"
              placeholder="Enter Brand Name"
              value={data.brandName} 
              onChange={handleOnChange}
              className="py-1 px-2 bg-slate-100 text-slate-500 border rounded-sm outline-none 
                          focus:ring focus:ring-slate-300"
          />
        </div>
      
        {/* product selection nad price */}
        <div className="flex justify-between items-center">
            <label htmlFor="Category">Category</label>
            <select value={data.category} onChange={handleOnChange}  required name="category" className="py-1 px-4 w-[200px] ml-2 bg-slate-100 text-slate-500 border rounded-sm outline-none 
                            focus:ring focus:ring-slate-300">
                <option value={" "}>Slect Category</option>
                {
                  productCategory.map((el, index)=>{
                    return(
                      <option key={index} value={el.value}>
                          {el.lablel}
                      </option>
                    )
                  })
                }

            </select>

            <label htmlFor="price"  className="text-[16px]">Price</label>
            <input 
                type="number" 
                required
                id="price" 
                name="price"
                placeholder="EnterPrice"
                value={data.price} 
                onChange={handleOnChange}
                className="py-1 px-2 bg-slate-100 text-slate-500 border rounded-sm outline-none 
                            focus:ring focus:ring-slate-300"
            />
        </div>
        {/* description and Selling */}
        <div className="flex justify-between items-center">
          <label htmlFor="description" className="text-[16px]">Description </label>
          <input 
              type="text" 
              required
              id="description" 
              placeholder="Enter Product description"
              name="description"
              value={data.description} 
              onChange={handleOnChange}
              className="py-1 px-2 bg-slate-100 text-slate-700 border rounded-sm outline-none 
                          focus:ring focus:ring-slate-300"
          />


          <label htmlFor="Selling" className="text-[16px]">Selling price</label>
          <input 
              type="number"
              required 
              id="Selling" 
              name="Selling"
              placeholder="Enter Selling"
              value={data.Selling} 
              onChange={handleOnChange}
              className="py-1 px-2 bg-slate-100 text-slate-500 border rounded-sm outline-none 
                          focus:ring focus:ring-slate-300"
          />
        </div>


        {/* images upload */}
        <label htmlFor="Category">Product Image  </label>
        <label className="uploadImageinput">
          <div className="p-2 bg-slate-100 border  h-32 w-full flex justify-center items-center cursor-pointer">
            
                <div className="text-slate-500 flex justify-center items-center flex-col cursor-pointer">
                  <span className="text-4xl"><FaCloudUploadAlt/></span>
                  <p className="text-sm">Upload Product Image</p>
                  <input type="file" id="uploadImageinput" className="hidden" onChange={handleUploadProduct}/>
                </div>
          </div>
        </label>
        <div>
          {
            data?.productImage[0] ? (
             <div className="flex gap-2 ">
              {
                 data.productImage.map((el, index) =>{
                  return (
                     <div  key={index} className=" relative group">
                        <img 
                        src={el} 
                        alt={el} 
                        required
                        width={80} 
                        height={80}
                        className="bg-slate-100 shadow-md cursor-pointer" 
                        onClick={()=>{setfullscreenImage(el) 
                          setOnpenfullscreenImage(true)
                        }}
                      />
                      <div className=" absolute top-0 right-0 p-1 text-white bg-red-500 hover:bg-red-600
                       rounded-full cursor-pointer hidden group-hover:block" onClick={()=>handleproductImage(index)}>
                        <MdDelete />
                      </div>
                     </div>    
                  )
                })
              }
             </div>
            ) : (
              <p className="text-red-500 text-sm">*Please Upload Product image</p>
            )
          }
          
        </div>
        <button className="py-1 px-3 bg-red-600 text-white mb-2 hover:bg-red-700">Upload Product</button>
       </form>
      </div>

      {/* show image in big screen */}
      {
        openfullscreenImage && (
          <Displayimage onclose={()=>setOnpenfullscreenImage(false)} imageurl={fullscrenImage}/>
        )
      }
     
    </div>
  )
}
