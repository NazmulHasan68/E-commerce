// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

export default function CategoryProduct() {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setloading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  //fatch all the product
  const fatchCategoryProduct = async() =>{
    setloading(true)
    const response = await fetch(SummaryApi.CategoryProduct.url)
    const dataResponse = await response.json()
    setloading(false)
    setCategoryProduct(dataResponse.data)
    
  }

  useEffect(()=>{
    fatchCategoryProduct()
  },[])

  return (
    <div className=' container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {

          loading ? (
              categoryLoading?.map((el, index)=>{
                return(
                  <div key={index} className='h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden animate-pulse bg-slate-200'>

                  </div>
                )
              })
          ) : (
            categoryProduct?.map((product, index)=>{
              return (
                <Link to={'/product-category?category='+product?.category} key={index} className=' cursor-pointer'>
                  <div className='w-16 md:w-20 h-16 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-110 transition-all' />
                  </div>
                  <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                </Link>
              )
            })
          )
        }
      </div>
    </div>
  )
}
