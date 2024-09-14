// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VarticalCart from '../components/varticalCart'

export default function SearchProduct() {
    const query = useLocation()
    const [data, setdata] = useState([])
    const [loading ,setloading] = useState(false)

    const fetchProduct = async() =>{
        setloading(true)
        const response = await fetch(SummaryApi.SearchProduct.url+query.search)
        const detaResponse = await response.json()
        setloading(false)
        setdata(detaResponse.data)
    }
    useEffect(()=>{fetchProduct()},[query])
    
  return (
    <div className=' container mx-auto p-4'>
        {
         loading && (
            <p className='text-center'>Loading...</p>
         )   
        }
        <p className='text-lg font-semibold my-2'>Search Result : {data?.length}</p> 
        {
            data?.length === 0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No Data Found ....!</p>
            )
        }
        {
            data?.length !== 0 && !loading && (
                <VarticalCart loading={loading} data={data}/>
                )
            
        }   
    </div>
  )
}
