// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef, useState } from 'react'
import FatchcategorywiseProduct from '../../helpers/Fetchcategorywiseproduct'
import displayCurency from '../../helpers/DisplayCurrency'
import addtocart from '../../helpers/addtocart';
import { Link } from 'react-router-dom';
import Context from '../context';
import scrollTop from '../../helpers/scrollTop';

// eslint-disable-next-line react/prop-types
export default function CategorywiseProductdisplay({category, heading}) {
  const {fetchUseraddTocard }= useContext(Context)
  const handleaddtocart = async(e,id)=>{
    await addtocart(e,id)
    await fetchUseraddTocard()
  }

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

  return (
    <div className=' container mx-auto px-4 my-4 relative'>
        <h2 className='md:text-2xl text-xl font-semibold py-4'>{heading}</h2>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-scroll scrollbar-none transition-all duration-300' >
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
                      <Link to={"/product/"+product._id} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
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
