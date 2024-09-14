// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../../helpers/productCategory'
// eslint-disable-next-line no-unused-vars
import CategorywiseProductdisplay from '../components/CategorywiseProductdisplay'
import VarticalCart from '../components/varticalCart'
import SummaryApi from '../common'

export default function CategoryProductListONe() {
    // eslint-disable-next-line no-unused-vars
    const params = useParams()  
    const [data ,setdata] = useState([])
    // eslint-disable-next-line no-unused-vars
    const[loading , setloading] = useState(false)

    const location = useLocation()
    const urlsearch = new URLSearchParams(location.search)
    const urlCategoryListinArry = urlsearch.getAll("category")
    const urlcategorylistobject = {}
    urlCategoryListinArry.forEach(el =>{
      urlcategorylistobject[el] = true
    })
    const navigate = useNavigate()
   
    
    const [selectCategory , setselectCategory] = useState(urlcategorylistobject)
    const [filterCategoryList, setfilterCategoryList] = useState([])

    const handleSelectCategory = (e) =>{
      const {value, checked} = e.target
      setselectCategory((preve)=>{
       return{
        ...preve,
        [value] : checked
       }
      })
    }


    const fetchData = async() =>{
      const response = await fetch(SummaryApi.FilterProduct.url,{
        method: SummaryApi.FilterProduct.method,
        credentials:'include',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })
      const dataResponse = await response.json()
      setdata(dataResponse?.data || [])
      
    }
    useEffect(()=>{fetchData()},[filterCategoryList])
    
    useEffect(()=>{
      // eslint-disable-next-line no-unused-vars
      const arrayoffcategory = Object.keys(selectCategory)?.map((categorykeyName,index)=>{
        if(selectCategory[categorykeyName]){
          return categorykeyName
        }
        return null
      }).filter(el =>el)
      setfilterCategoryList(arrayoffcategory) 

      // product-category?category=speakers 
      const urlformate = arrayoffcategory.map((el,index)=>{
        if((arrayoffcategory.length - 1) === index ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      navigate("/product-category?"+urlformate.join(""))

    },[selectCategory])

    //sort by 
    const [sortBy , setsortBy] = useState("")
    const handleonChangeSortBy = (e) =>{
      const {value} = e.target
      setsortBy(value)
      if(value === 'asc'){
        setdata(preve => preve.sort((a,b)=>a.Selling - b.Selling))
      }
      if(value === 'dsc'){
        setdata(preve => preve.sort((a,b)=>b.Selling - a.Selling))
      }
    }
    useEffect(()=>{

    },[sortBy])
  return (
    <div className=' container mx-auto p-4'>
      {/* desktop version */}
      <div className='lg:grid grid-cols-[200px,1fr] '>
        {/*left side*/}
        <div className='bg-white p-2 min-h-[calc(100vh-140px)] overflow-y-auto'>

          {/* sort by */}
          <div className=''>
            <h1 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-400'>Sort By </h1>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-2'>
                <input type='radio' name='sortBy' id='LowHibg' checked={sortBy === 'asc'} value={"asc"} onChange={handleonChangeSortBy} />
                <label htmlFor='LowHibg'>Price : Low to hight</label>
              </div>

              <div className='flex items-center gap-2'>
                <input type='radio' name='sortBy' id='Highlow' checked={sortBy === 'dsc'} value={"dsc"} onChange={handleonChangeSortBy}/>
                <label htmlFor='Highlow'>Price : high to low</label>
              </div>
            </form>
          </div>

            {/* filter section by */}
            <div className=''>
            <h1 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-400'>Sort By </h1>
            <form className='text-sm flex flex-col gap-2 py-2'>
             {
              productCategory?.map((categoryName, index)=>{
                return(
                  <div key={index} className='flex items-center gap-3'>
                    <input type='checkbox' checked={selectCategory[categoryName?.value]} name={"category"} id={categoryName?.value} value={categoryName?.value} onChange={handleSelectCategory}/>
                    <label htmlFor={categoryName?.value}>{categoryName?.lablel}</label>
                  </div>
                )
              })
             }
            </form>
          </div>

        </div>

        {/*right side*/}
        <div className='mx-4 md:-mt-2 mt-5'>
           <div>
            <p className='font-medium text-slate-600 text-lg my-2 py-2 bg-white w-full px-4 mx-auto'>Search Results : {data?.length}</p>
            <div className='overflow-scroll max-h-[calc(100vh-190px)] scrollbar-none'>
            {
              data.length !==0 && (
                <VarticalCart data={data} loading={loading}/>
              )
            }
            </div>
           </div>
        </div>
      </div>

      {/* mobile version */}

    </div>
  )
}
