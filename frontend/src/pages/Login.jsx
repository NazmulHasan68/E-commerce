import { useContext, useState } from 'react';
import loginicons from '../assest/signin.gif'
import { toast } from "react-toastify";

// for icons 
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';


const Login = () => {

    const [showpassword, setshowpassword] = useState(false)
    const navigate = useNavigate()
    const {fetchUserDetails,fetchUseraddTocard }= useContext(Context)
 

    // store email and password
    const [data, setdata] = useState({
        email: " ",
        password : " "
    })

    const HandleOnChange = (e) =>{
        const {name , value} = e.target
        setdata((preve)=>{
            return {
                ...preve,
                [name] : value
            }}
        )
    }

    //submite login data
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const DataResponse = await fetch(SummaryApi.SignIn.url,{
            method : SummaryApi.SignIn.method,
            credentials: 'include',
            headers:{
                "content-type" : 'application/json',
            },
            body:JSON.stringify(data)
        })
        const DataApi = await DataResponse.json()
        if(DataApi.success){
            toast.success(DataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUseraddTocard()
        }
        if(DataApi.error){
            toast.error(DataApi.message)
        }
    }
    
  return (
    <section id="login">
        <div className="mx-auto container p-4">
           <div className="bg-slate-100 shadow-lg p-4 py-4 w-full max-w-sm mx-auto border-t-4 border-red-600">
                 {/* for login icons */}
                 <div className='w-20 h-20 mx-auto'>
                    <img src={loginicons} alt="Login icons"/>
                 </div>

                 {/* for login form */}
                 <form className='pt-4 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-white p-1 '>
                            <input 
                                type='email' 
                                placeholder='Enter Email'
                                name='email'
                                value={data.email}
                                onChange={HandleOnChange}
                                className='w-full h-full outline-none bg-transparent '
                            />
                        </div>
                    </div>
                    <div>
                        <label>Password : </label>
                        <div className='bg-white p-1 flex'>
                            <input 
                                type={showpassword ? "text":"password"} 
                                placeholder='Enter password'
                                name='password'
                                value={data.password}
                                onChange={HandleOnChange}
                                className='w-full h-full outline-none bg-transparent '
                            />
                            <div className=' cursor-pointer text-lg'>
                                <span>
                                    {
                                        showpassword ?
                                         (<FaEyeSlash onClick={()=>setshowpassword(false)}/>)
                                        : (<FaEye onClick={()=>setshowpassword(true)}/>) 
                                    }
                                </span>
                            </div>
                        </div>
                        <Link 
                            to={'/forgot-password'} 
                            className='block w-fit ml-auto hover:underline hover:text-red-500'
                        >
                            Forgot password
                        </Link>
                    </div>
                    <button
                        className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mt-4 mx-auto block'
                    >
                            Login
                    </button>
                 </form>
                 <p className='mt-2'> Don`t have a account ? <Link to={'/sign-up'} className='text-red-500 hover:underline'>SignUp</Link></p>
           </div>
        </div>
    </section>
  )
}

export default Login


