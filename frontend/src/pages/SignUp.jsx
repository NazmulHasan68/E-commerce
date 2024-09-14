import { useState } from "react"
import loginicons from '../assest/signin.gif'

// for icons 
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import ImageTobase64 from "../../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp =()=> {

    const [showpassword, setshowpassword] = useState(false)
    const [showConfirmPassword , setconfirmPassword] = useState(false)

    // store email and password
    const [data, setdata] = useState({
        name:"",
        email: " ",
        password : " ",
        confirmpassword:" ",
        profilePic:""
    })

    const navigate = useNavigate()
    const HandleOnChange = (e) =>{
        const {name , value} = e.target
        setdata((preve)=>{
            return {
                ...preve,
                [name] : value
            }}
        )
    }
    // upload pic
    const handleUploadPic = async(e) =>{
        const file = e.target.files[0]
        const imagePic = await ImageTobase64(file)
        setdata((preve)=>{
            return{
                ...preve,
                profilePic : imagePic
            }
        })
        
    }

    //submite login data
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(data.password === data.confirmpassword){
            const dataResponse = await fetch(SummaryApi.SignUp.url,{
                method: SummaryApi.SignUp.method,
                headers : {
                    "content-type" : "Application/json"
                },
                body : JSON.stringify(data)
            })
            const dataApi = await dataResponse.json()

            //toast icon
            if(dataApi.success){
                toast.success(dataApi.message)
                // redirect
                navigate("/login")
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }

            


        }else{
            console.log("please check password and confirm password");   
        }
        
        
    }

  return (
    <section id="signUp">
    <div className="mx-auto container p-4">
        
       <div className="bg-slate-100 shadow-lg p-4 py-4 w-full max-w-sm mx-auto border-t-4 border-red-600">
             {/* for profile picture */}
             <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                <div>
                    <img src={data.profilePic || loginicons} alt="Login icons"/>
                </div>
                <form >
                    <label>
                        <div className=" text-xs cursor-pointer bg-opacity-70 text-center font-semibold
                                        bg-slate-300 py-2 absolute bottom-0 w-full">
                            Upload Photo
                        </div>
                        <input type="file" className="hidden" onChange={handleUploadPic}/>
                    </label>
                </form>
             </div>

             {/* for login form */}
             <form className='pt-4 flex flex-col gap-2' onSubmit={handleSubmit}>
                 <div className='grid'>
                    <label>Name : </label>
                    <div className='bg-white p-1 '>
                        <input 
                            type='text' 
                            placeholder='Enter Name'
                            required
                            name='name'
                            value={data.name}
                            onChange={HandleOnChange}
                            className='w-full h-full outline-none bg-transparent '
                        />
                    </div>
                </div>

                <div className='grid'>
                    <label>Email : </label>
                    <div className='bg-white p-1 '>
                        <input 
                            type='email' 
                            placeholder='Enter Email'
                            name='email'
                            required
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
                            required
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
                </div>

                <div>
                    <label>Confirm Password : </label>
                    <div className='bg-white p-1 flex'>
                        <input 
                            type={showConfirmPassword ? "text":"password"} 
                            placeholder='Confirm password'
                            required
                            name='confirmpassword'
                            value={data.confirmpassword}
                            onChange={HandleOnChange}
                            className='w-full h-full outline-none bg-transparent '
                        />
                        <div className=' cursor-pointer text-lg'>
                            <span>
                                {
                                    showConfirmPassword ?
                                     (<FaEyeSlash onClick={()=>setconfirmPassword(false)}/>)
                                    : (<FaEye onClick={()=>setconfirmPassword(true)}/>) 
                                }
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mt-4 mx-auto block'
                >
                        Sing Up
                </button>
             </form>
             <p className='mt-2'> Already Have an account ? <Link to={'/login'} className='text-green-500 hover:underline'>Login</Link></p>
       </div>
    </div>
</section>
  )
}

export default SignUp
