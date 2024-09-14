// eslint-disable-next-line no-unused-vars
import  { useContext } from 'react'
import { Link } from 'react-router-dom'
import scrollTop from '../../helpers/scrollTop'
import displayCurency from '../../helpers/DisplayCurrency'
import Context from '../context'
import addtocart from '../../helpers/addtocart'

// eslint-disable-next-line react/prop-types
export default function VarticalCart({loading, data=[]}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {fetchUseraddTocard }= useContext(Context)
    const handleaddtocart = async(e,id)=>{
      await addtocart(e,id)
      await fetchUseraddTocard()
    }
    const loadinglist = new Array(13).fill(null)
  return (
    <div>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,300px))] justify-center md:justify-between gap-2 md:gap-4 overflow-scroll scrollbar-none transition-all duration-300' >
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
                      <Link to={"/product/"+product._id} key={index} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
                        <div className='bg-slate-200 h-44 p-2 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                              <img src={product?.productImage[0]} className=' object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
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
