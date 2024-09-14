/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displaycurrency from '../../helpers/DisplayCurrency'

// eslint-disable-next-line react/prop-types
export default function AddminProduct({data, fetch}) {
    const [editproduct , seteditproduct] = useState(false)
  return (
    <div>
      <div className="bg-white p-4 rounded shadow-md ">
            <div className='w-40  h-56'>
              <div className=''>
                  <img src={data?.productImage[0]} width={100} height={100} className='w-fit h-44 mx-auto'/>
                  <p className='text-ellipsis line-clamp-2'>{data.productName}</p>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='font-semibold'>
                        {
                          displaycurrency(data?.Selling)
                        }
                      </p>
                    </div>
                    <div onClick={()=>seteditproduct(true)} className=' w-8 h-8 flex justify-center items-center bg-green-200 cursor-pointer hover:bg-green-500 rounded-full hover:text-white'>
                        <MdModeEdit />
                    </div>
                  </div>
              </div>
            </div>
            
            {
                editproduct && (<AdminEditProduct Productdata={data} onclose={()=>seteditproduct(false)} Datafetch={fetch}/>)
            }
            
       </div>
    </div>
  )
}
