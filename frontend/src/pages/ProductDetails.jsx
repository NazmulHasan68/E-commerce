// eslint-disable-next-line no-unused-vars
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayCurency from '../../helpers/DisplayCurrency';
import CategorywiseProductdisplay from '../components/CategorywiseProductdisplay';
import addtocart from '../../helpers/addtocart';
import Context from '../context';

export default function ProductDetails() {
  const [productDetails ,setproductDEtails] = useState({
    productName :"",
    brandName : "",
    category :"",
    productImage : [],
    description :"",
    price : " ",
    Selling :" "
  })
  const params = useParams()  
  const [loading ,setloading] = useState(true)
  const productImagelistLoding  = new Array(4).fill(null)

  const [activeImage , setactiveImage] = useState("")

  const fetchProductDetails = async()=>{
    setloading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      credentials:'include',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setloading(false)
    const detaResponse = await response.json()
    setproductDEtails(detaResponse?.data)
    setactiveImage(detaResponse?.data?.productImage[0])
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageurl) =>{
    setactiveImage(imageurl)
  }

  const [zoomimage , setzoomimage] = useState({
    x:0,
    y:0
  })
  const[zoomimageShow, setzoomimageShow] = useState(false)
  const handlezoomImage = useCallback((e) =>{
    setzoomimageShow(true)
    const {left , top , width, height} = e.target.getBoundingClientRect()
    console.log(left, top, width, height);
    const x = (e.clientX-left) / width 
    const y = (e.clientY-top) /height
    setzoomimage({
      x,y
    })
  },[zoomimage])
  const handleCordenate  = () =>{
    setzoomimageShow(false)
  }


  const {fetchUseraddTocard }= useContext(Context)
  const handleAddTocart = async(e,id) =>{
    await addtocart(e,id)
    await fetchUseraddTocard()
  }
  const navigate = useNavigate()
  const handleBuyProduct =async(e,id)=>{
    await addtocart(e,id)
    await fetchUseraddTocard()
    navigate('/cart')
  }




  return (
    <div className=' container mx-auto p-4 mb-2 md:mb-8 mt-2 md:mt-8'>
      <div className=' min-h-[200px] flex flex-col lg:flex-row'>
        {/* product image */}
        <div className='h-96 flex flex-col md:flex-row-reverse gap-2'>
            <div className='h-[300px] md:h-96 w-[300px] md:w-96 bg-slate-200 mx-auto relative'>
              <img src={activeImage} onMouseMove={handlezoomImage} onMouseLeave={handleCordenate} className='h-full w-full object-scale-down mix-blend-multiply'/>
              {/* productzoom section */}
              {
                zoomimageShow && (
                  <div className='hidden md:block absolute min-w-[400px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[410px] top-0'>
                    <div className='w-full h-full mix-blend-multiply min-h-[400px] min-w-[400px] scale-105 ' 
                      style={{backgroundImage : `url(${activeImage})`,
                      backgroundRepeat:`no-repeat`,
                      backgroundPosition:`${zoomimage.x *100}% ${zoomimage.y *100}%`
                      }}>

                    </div>
                  </div>
                )
              }
              
            </div>
            <div className='h-full mx-auto'>
              {
                loading ? (
                 <div className='flex gap-2 md:gap-3 md:flex-col overflow-scroll scrollbar-none h-full '>
                  {
                     productImagelistLoding.map((el,index) =>{
                      return(
                        <div key={index} className='h-20 w-20 animate-pulse bg-slate-200 rounded'> 
  
                        </div>
                      )
                    })
                  }
                 </div>
                ) : (
                  <div className='flex gap-2 md:gap-3 md:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                     productDetails?.productImage?.map((imageurl,index) =>{
                      return(
                        <div key={index} className='h-20 w-20 bg-slate-200 rounded p-1'> 
                            <img src={imageurl} className='w-full h-full object-scale-down mix-blend-multiply hover:scale-110' onMouseEnter={()=>handleMouseEnterProduct(imageurl)} />
                        </div>
                      )
                    })
                  }
                 </div>
                )
              }
            </div>

        </div>
         {/* product details */}
         {
          loading ? (
            <div className='p-4 flex flex-col gap-1 w-full'>
                <p className='bg-stone-200 animate-pulse px-6 py-3 h-6 w-full rounded-full p-1 inline-block '></p>
                <h2 className='text-2xl md:text-4xl font-semibold h-6 w-full bg-slate-200 animate-pulse'></h2>
                <p className=' capitalize text-slate-400 bg-slate-200 animate-pulse  h-6 max-w-[100px]'></p>
                <div className='text-red-600 flex items-center bg-slate-200 h-6 animate-pulse max-w-[150px] gap-1'>
                  
                </div>
                <div className='flex gap-2 text-lg font-medium my-2 h-6 animate-pulse max-w-[200px]'>
                  <p className=' text-red-600 bg-slate-200 w-full'></p>
                  <p className='text-slate-400 bg-slate-200 w-full'></p>
                </div>
                <div className='flex items-center gap-3 my-2'>
                  <button className='h-6 bg-slate-200 animate-pulse max-w-[100px] w-full'> </button>
                  <button className='h-6 bg-slate-200 animate-pulse max-w-[100px] w-full'> </button>
                </div>
                <div>
                  <p className='text-slate-600 font-medium bg-slate-200 h-6 max-w-[250px] my-1'> </p>
                  <p className=' line-clamp-4 h-32 w-full bg-slate-200' ></p>
                </div>
            </div>
          ): (
            <div className='p-4 flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-3 rounded-full p-1 inline-block w-fit'>{productDetails?.brandName}</p>
              <h2 className='text-2xl md:text-4xl font-semibold'>{productDetails?.productName}</h2>
              <p className=' capitalize text-slate-400'>{productDetails?.category}</p>
              <div className='text-red-600 flex items-center  gap-1'>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStarHalfAlt/>
              </div>
              <div className='flex gap-2 text-lg font-medium my-2'>
                <p className=' text-red-600'>{displayCurency(productDetails?.Selling)}</p>
                <p className='text-slate-400 line-through'>{displayCurency(productDetails?.price)}</p>
              </div>
              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all shadow-md' onClick={(e)=>handleBuyProduct(e,productDetails?._id)}>Buy</button>
                <button className='border-2 border-red-600 px-3 py-1 min-w-[120px] text-white font-medium bg-red-600 hover:bg-slate-50 hover:text-red-600 transition-all shadow-md' onClick={(e)=>handleAddTocart(e,productDetails?._id)}>Add To Cart</button>
              </div>
              <div>
                <p className='text-slate-600 font-medium my-1'>Description :  </p>
                <p className=' line-clamp-4'>{productDetails?.description}</p>
              </div>
          </div>
          )
         }
      </div>
      {
        productDetails.category && (
          <CategorywiseProductdisplay category={productDetails?.category} heading={"Recommanended Product"}/>
        )
      }
    </div>
  )
}
