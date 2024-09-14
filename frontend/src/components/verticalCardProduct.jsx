// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef, useState } from 'react'
import FatchcategorywiseProduct from '../../helpers/Fetchcategorywiseproduct'
import displayCurency from '../../helpers/DisplayCurrency'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import addtocart from '../../helpers/addtocart';
import { Link } from 'react-router-dom';
import Context from '../context';

// eslint-disable-next-line react/prop-types
export default function VerticalCardProduct({category, heading}) {
    const [data ,setdata] = useState([])
    const [loading, setloading] = useState(false)

    const loadinglist = new Array(13).fill(null)

    const fetchdata = async()=>{
      setloading(true)
      const categoryProduct = await FatchcategorywiseProduct(category)
      setloading(false)
      setdata(categoryProduct?.data)
    }
    useEffect(()=>{
      fetchdata()
    },[])

  //for scholling 
  const [scroll ,setscroll] = useState(0)
  const scrollElement = useRef()
  const scrollRight = ()=>{
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = ()=>{
    scrollElement.current.scrollLeft -= 300
  }

  //add to cart
  const {fetchUseraddTocard }= useContext(Context)
  const handleaddtocart = async(e,id)=>{
    await addtocart(e,id)
    await fetchUseraddTocard()
  }

  return (
    <div className=' container mx-auto px-4 my-4 relative'>
        <h2 className='md:text-2xl text-xl font-semibold py-4'>{heading}</h2>
        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all duration-300' ref={scrollElement}>

        <button className='bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
        <button className='bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button>
          
          {
            loading ? (
                loadinglist.map((product, index)=>{
                    return (
                      <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                        <div className='bg-slate-200 h-44 p-2 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                        </div>
                        <div className='p-4 grid gap-2'>
                        </div>
                      </div>
                    )
                  })
            ):(
                data.map((product, index)=>{
                    return (
                      <Link to={"product/"+product._id} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                        <div className='bg-slate-200 h-44 p-2 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                              <img src={product.productImage[0]} className=' object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-4 grid gap-2'>
                          <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                          <p className=' capitalize text-slate-500'>{product?.category}</p>
                          <div className='flex justify-between gap-2'>
                            <p className='text-xs text-red-500 font-semibold'>{displayCurency(product?.Selling)}</p>
                            <p className='text-xs text-slate-500 line-through'>{displayCurency(product?.price)}</p>
                          </div>
                          <button onClick={(e)=>handleaddtocart(e,product?._id)} className='bg-red-500 hover:bg-red-700 text-white px-8 mt-5 py-0.5 rounded-full text-sm mx-auto block'>
                            Add to Cart
                          </button>
                        </div>
                      </Link>
                    )
                  })
            )
          }
        </div>
    </div>
  )
}
