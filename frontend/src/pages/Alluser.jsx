import { useEffect, useState } from "react"
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from 'moment'
//icon
import { MdModeEditOutline } from "react-icons/md";
import ChangeuserRole from "../components/changeuserRole";


export default function Alluser() {
 const [user,setuser] = useState([])
 const [updateuser, setupdateuser] =useState(false)
 const [updateuserDetails, setupdateuserdetails] = useState({
  email : "",
  name : "",
  role : "",
  _id : " "
 })

 const fetchUserData = async()=>{
  const ResponseData = await fetch(SummaryApi.allUser.url,{
    method:SummaryApi.allUser.method,
    credentials:'include'
  })
  const response = await ResponseData.json()
  if(response.success){
    setuser(response.data)
    console.log(user);
    
  }
  if(response.error){
    toast.error(response.message)
  }
 
  
 }
 useEffect(()=>{fetchUserData()},[])

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="bg-slate-300">
            <th className="border-[1px] border-gray-200 font-medium p-2">Sr.</th>
            <th className="border-[1px] border-gray-200 font-medium p-2">Name</th>
            <th className="border-[1px] border-gray-200 font-medium p-2">Email</th>
            <th className="border-[1px] border-gray-200 font-medium p-2">Role</th>
            <th className="border-[1px] border-gray-200 font-medium p-2">Create Data</th>
            <th className="border-[1px] border-gray-200 font-medium p-2">Action</th>
          </tr>
        </thead>
        <tbody className="pb-2">
          {
            user && user.map((cl, index)=>{
              return (
                <tr key={index+1}>
                  <td className="border-[1px] text-gray-700 border-gray-200 font-sm bg-white text-center p-2">{index+1}</td>
                  <td className="border-[1px] text-gray-700 border-gray-200 font-sm bg-white text-left p-2">{cl?.name}</td>
                  <td className="border-[1px] text-gray-700 border-gray-200 font-sm bg-white text-left p-2">{cl?.email}</td>
                  <td className="border-[1px] text-gray-700 border-gray-200 font-sm bg-white text-center p-2">{cl?.role}</td>
                  <td className="border-[1px] text-gray-700 border-gray-200 font-sm bg-white text-center p-2">{moment(cl?.createdAt).format("lll")}</td>
                  <td className="border-[1px] text-gray-700 border-gray-200 font-sm bg-white text-center p-2">
                    <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all">
                      <MdModeEditOutline onClick={()=>{
                        setupdateuserdetails(cl)
                        setupdateuser(true)
                      }}
                        
                        />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
          {
            updateuser && (<ChangeuserRole onClose={()=>setupdateuser(false)} 
            name = {updateuserDetails.name}
            email= {updateuserDetails.email}
            role = {updateuserDetails.role}
            userId ={updateuserDetails._id}
            callfunction = {fetchUserData}
            />)
          }
      
    </div>
  )
}
