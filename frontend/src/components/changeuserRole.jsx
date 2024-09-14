import { useState } from 'react';
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


export default function ChangeuserRole({
  name,
  email,
  userId,
  role,
  onClose,
  callfunction,

}) {
  const [userRoll, setuserRoll] = useState(role)
  const handlerollechange = (e) =>{
    setuserRoll(e.target.value)
  }

  const updateuserRole = async() =>{
    const response = await fetch(SummaryApi.updateuser.url,{
      method:SummaryApi.updateuser.method,
      credentials:'include',
      headers:{
        'content-type' : 'application/json'
      },
      body:JSON.stringify({
        userId : userId,
        role: userRoll
      })
    })

    const ResponseData = await response.json()
    if(ResponseData.success){
      toast.success(ResponseData.message)
      onClose()
      callfunction()
    }
    if(ResponseData.error){
      toast.error(ResponseData.error)
    }
    
  }


  return (
    <div className=" fixed w-full h-full z-10 flex justify-between items-center top-0 bottom-0 right-0 left-0 bg-slate-200 bg-opacity-40">
      <div className=" mx-auto bg-white shadow-lg max-w-sm w-full p-4">
          <button className='block ml-auto p-2 rounded-full hover:bg-red-200 hover:text-red-500' onClick={onClose}>
              <IoClose/>
          </button>
          <h1 className="pb-4 font-medium">Change User Role</h1>
          <p> <span className='font-semibold'>Name</span> : {name}</p>
          <p> <span className='font-semibold'>Email </span>  : {email}</p>
          <div className='flex items-center justify-between my-2'>
            <p>Role : </p>
            <select className='border px-4 py-1 outline-none' value={userRoll} onChange={handlerollechange}>
                {
                  Object.values(ROLE).map(el=>{
                    return (
                      <option value={el} key={el}>{el}</option>
                    )
                  })
                }
            </select>
          </div>
          <button onClick={updateuserRole} className='w-fit mx-auto block border py-1 px-4 rounded-full bg-red-600 text-white hover:bg-red-700'>
            Change Role
          </button>
      </div>
    </div>
  )
}
