// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1mobile1 from '../assest/banner/img1_mobile.jpg'
import image1mobile2 from '../assest/banner/img2_mobile.webp'
import image1mobile3 from '../assest/banner/img3_mobile.jpg'
import image1mobile4 from '../assest/banner/img4_mobile.jpg'
import image1mobile5 from '../assest/banner/img5_mobile.png'


import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

export default function BannerProduct() {

  const [currentImage, setcurrentImage] = useState(0)
  const desktopIMages = [
    image1,image2,image3,image4,image5
  ]
  const MobileIMages = [
    image1mobile1,
    image1mobile2,
    image1mobile3,
    image1mobile4,
    image1mobile5
  ]
const nextimage = ()=>{
  if(desktopIMages.length-1 > currentImage){
    setcurrentImage(preve => preve+1)
  }
}
const preveimage = ()=>{
  if(currentImage != 0){
    setcurrentImage(preve => preve-1)
  }
}
useEffect(()=>{
  const intenval = setInterval(()=>{
    if(desktopIMages.length-1 > currentImage){
      nextimage()
    }else{
      setcurrentImage(0)
    }
  },4000)
  return ()=>clearInterval(intenval)
},[currentImage])

  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='md:h-72 h-56 w-full bg-slate-200 relative'>

        <div className=' absolute  items-center z-10 w-full h-full hidden md:flex'>
          <div className='flex justify-between w-full text-2xl px-2'>
            <button className='bg-white shadow-md rounded-full p-2' onClick={()=>preveimage()}><FaAngleLeft/></button>
            <button className='bg-white shadow-md rounded-full p-2' onClick={()=>nextimage()}><FaAngleRight/></button>
          </div>
        </div>
          {/* desktop and tablet version */}
          <div className='h-full w-full overflow-hidden hidden md:flex'>
              {
                desktopIMages.map((image, index)=>{
                  return (
                    <div key={index} className='w-full h-full min-w-full min-h-full transition-all duration-600' style={{transform: `translateX(-${currentImage*100}%)`}}>
                  <img src={image} className=' w-full h-full '/>
              </div>
                  )
                })
              }
          </div>

          {/* mobile version */}
          <div className='flex h-full w-full overflow-hidden md:hidden'>
              {
                MobileIMages.map((image, index)=>{
                  return (
                    <div key={index} className='w-full h-full min-w-full min-h-full transition-all duration-600' style={{transform: `translateX(-${currentImage*100}%)`}}>
                  <img src={image} className=' w-full h-full object-cover'/>
              </div>
                  )
                })
              }
          </div>
      </div>

    </div>
  )
}
