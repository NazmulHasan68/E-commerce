
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

//for notification toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlic';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch()
  const fetchUserDetails = async()=>{
    const detaResponse = await fetch(SummaryApi.current_user.url,{
      method:SummaryApi.current_user.method,
      credentials : 'include',
    })
    const dataApi = await detaResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    
  }

  //fetch user add to cart
  const [cartproductcount, stcardproductcount] = useState(0)
  const fetchUseraddTocard = async ()=>{
    const response = await fetch(SummaryApi.countAddtoCartProduct.url,{
      method: SummaryApi.countAddtoCartProduct.method,
      credentials: 'include'
    })
    const dataApi = await response.json()
    stcardproductcount(dataApi.data.count)
    
  }

  useEffect(()=>{
    // user details
    fetchUserDetails()
    // user cart product
    fetchUseraddTocard()
  },[])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // user details fetch
        cartproductcount, //current user add to cart product count
        fetchUseraddTocard
      }}>
        <ToastContainer position='bottom-right'/>
        <Header/>
        <main className='min-h-[calc(100vh-100px)] pt-16'>
            <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  )
}

export default App
