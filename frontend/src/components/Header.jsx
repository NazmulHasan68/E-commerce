
import Logo from './logo'
//import icons here
import {GrSearch} from 'react-icons/gr'
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { setUserDetails } from '../store/userSlic';
import { useContext, useState } from 'react';
import ROLE from '../common/role';
import Context from '../context';

// eslint-disable-next-line no-unused-vars, react/prop-types
export default function Header({cart}) {
  const user = useSelector(state =>state?.user?.user)
  const dispatch = useDispatch()
  


  //handel logout
  const handlelogout = async() =>{
    const fetchData = await fetch(SummaryApi.logiut_user.url,{
      method : SummaryApi.logiut_user.method,
      credentials : "include"
    })
    const Data = await fetchData.json()

    if(Data.success){
      toast.success(Data.message);
      dispatch(setUserDetails(null))
      navigate('/')
    }
    if(Data.error){
      toast.error(Data.message)
    }
  }
//admint menu 
const [menuDisplay , setmenuDisplay] = useState(false)

//cart count 
const context = useContext(Context)
// console.log("header add to cart ", context);


//search
const navigate = useNavigate()
const searchInput = useLocation()
const searchURL = new URLSearchParams(searchInput?.search)
const searchquery = searchURL.getAll("q")
const[search,setsearch] = useState(searchquery)

const handleSearch = (e) =>{
  const {value} = e.target 
  setsearch(value)
  if(value){
    navigate(`search?q=${value}`)
  }else{
    navigate('/search')
  }
}



  return (
   <header className='h-16 shadow-md fixed w-full z-10 bg-white'>
      <div className='h-full flex items-center container mx-auto px-4 justify-between '>
        {/* ================for nav logo============ */}
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50}/>
          </Link>
        </div>


          {/* ================for nav Search============ */}
        <div className='hidden md:flex items-center w-full justify-center max-w-sm border rounded-full bg-white overflow-hidden  focus-within:shadow-md '>
          <input type='text' onChange={handleSearch} value={search} placeholder='search product here.....' className='w-full outline-none pl-4'/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex justify-center     items-center rounded-r-full text-white cursor-pointer'>
            <GrSearch/>
          </div>
        </div>


       {/* ================for nav login and cart============ */}
        <div className='flex items-center gap-5'>

          {
            user?._id && (
              <div className=' relative group flex flex-col justify-center'>
              <div className='text-3xl cursor-pointer' onClick={()=>setmenuDisplay(prev => !prev)}> 
                {
                  user?.profilePic? ( <img src={user?.profilePic} className='w-10 h-10 rounded-full border-2 border-red-500 object-cover'/> ) : (<FaRegUserCircle/>)
                }
                
              </div>
              {
                menuDisplay && (
                  <div className=' absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded -ml-10 transition-all hidden md:block'>
                    <nav>
                      {
                        user?.role === ROLE.ADMIN &&  <Link to={"/admin-panel/All-product"} className=' whitespace-nowrap hover:bg-slate-100 p-2 '>Admin panel</Link>
                      }
                    </nav>
                </div>
                )
              }
              
            </div>
            )
          }

          <div className='text-2xl cursor-pointer relative'>
            <span><FaShoppingCart/></span>
            {
              user?._id && (
                <Link to={"cart"} className='bg-red-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-2'>
                  <p className='text-sm'>{context.cartproductcount}</p>
                </Link>
              )
            }
          </div>

          <div>
            {
              user?._id ? (
                  <button 
                  onClick={handlelogout}
                  className='px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600'
                  >Logout</button>
              ): (
                <Link to={'/login'}>
                  <button className='px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600'>Login</button>
                </Link>
              )
            }
           
          </div>
         
        </div>

      </div>
   </header>
  )
}
