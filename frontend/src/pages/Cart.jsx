// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context';
import displayCurency from '../../helpers/DisplayCurrency';
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function Cart() {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)


    const fetchData = async() =>{
        const response = await fetch(SummaryApi.viewCartProduct.url,{
            method : SummaryApi.viewCartProduct.method,
            credentials:"include",
            headers:{
                'content-type':'application/json'
            }
        })
        const responseData = await response.json()
        if(responseData.success){
            setdata(responseData.data)
        }
        
    }

    const handleloading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setloading(true)
        handleloading()
        setloading(false)
    },[])

    const context = useContext(Context)
    const loadingCart = new Array(context?.cartproductcount).fill(null)
 
   
    //update cart
    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.UpdatecartProduct.url,{
            method : SummaryApi.UpdatecartProduct.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(
                {
                    _id:id,
                    quantity:qty+1
                }
            )
        })
        const responseData = await response.json()

        if(responseData.success){
            console.log("success");
            
            fetchData()          
        }
    }
    const dicreaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.UpdatecartProduct.url,{
            method : SummaryApi.UpdatecartProduct.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(
                {
                    _id:id,
                    quantity:qty-1
                }
            )
            
            
        })
        
        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }

    //detele product
    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.DeleteCartProduct.url,{
            method : SummaryApi.DeleteCartProduct.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(
                {
                    _id:id,
                }
            )
            
            
        })
        
        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUseraddTocard()
            toast.success(responseData.message)
        }
    }

    const totalqty = data.reduce((previousvalue, curresntvalue)=>previousvalue + curresntvalue.quantity,0)
    const totalPrice = data.reduce((preve, current)=>preve+ (current?.quantity*current?.productId.Selling),0 )

  return (
    <div className=' container mx-auto'>
       <div className='text-center text-lg py-1 my-1'>
       {
            data?.length === 0 && !loading && (
                <p className='bg-white py-5'>No Data </p>
            )
        }
       </div>
       <div className='flex flex-col md:flex-row gap-8 justify-between p-4'>
            {/* view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading?(
                        loadingCart?.map((el,index) =>{
                            return<div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>

                            </div>
                        })
                        
                    ) :(
                       data.map((product, index)=>{
                        return<div key={index} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-full bg-slate-200 p-1 overflow-hidden'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/* deletethe product  */}
                                    <div className=' absolute right-0 top-0 p-2 bg-red-100 rounded-full m-1 cursor-pointer hover:bg-red-600 hover:text-white transition-all text-slate-700 text-lg'>
                                        <MdDelete onClick={()=>deleteCartProduct(product?._id)}/>
                                    </div>
                                     {/* deletethe product  */}
                                    <h2 className='font-semibold text-lg md:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className=' capitalize text-slate-500'>{product?.productId?.category}</p>
                                    <div className='flex items-start justify-between'>
                                        <p className='text-red-600 font-medium text-md'>{displayCurency(product?.productId?.Selling)}</p>
                                        <p className='text-slate-600 font-base font-semibold text-md'>{displayCurency(product?.productId?.Selling *product?.quantity )}</p>
                                    </div>
                                    <div className='flex items-center gap-2 mt-2'>
                                        <button onClick={()=>dicreaseQty(product?._id, product?.quantity)} className='border rounded hover:bg-red-600 hover:text-white border-red-600 text-red-600 w-6 h-6 flex justify-center items-center'>-</button>
                                        <span className='font-bold'>{product?.quantity}</span>
                                        <button onClick={()=>increaseQty(product?._id, product?.quantity)} className='border rounded hover:bg-red-600 hover:text-white border-red-600 text-red-600 w-6 h-6 flex justify-center items-center'>+</button>
                                    </div>
                                </div>
                            </div>
                       })
                    )
                }
            </div>
            {/* total product count */}
           <div className='mt-3 md:mt-2 w-full max-w-sm mx-auto mb-4'>
           {
                loading ? ( 
                    <div className='h-36 bg-slate-200 animate-pulse border border-slate-300'>
                    
                    </div>
                ): (
                    <div className='h-36 bg-white  border border-slate-300 relative'>
                       <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                       <div className='flex gap-4 justify-between px-4 text-slate-600'>
                            <p>Quantity : </p>
                            <p>{totalqty}</p>
                       </div>
                       <div className='flex gap-4 text-md font-semibold justify-between px-4 text-slate-700'>
                            <p className=''>Total Price: </p>
                            <p>{displayCurency(totalPrice)}</p>
                       </div>
                       <button className='bg-blue-600 py-2 text-white w-full absolute bottom-0 hover:bg-blue-700 '>Payment Now</button>
                    </div>
                )
            }
           </div>
           
       </div>
    </div>
  )
}
