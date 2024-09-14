import { useSelector } from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import ROLE from "../common/role";

export default function AdminPanel() {
  const user = useSelector(state =>state?.user?.user)


  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN){
      navigate("/")
    }
  },[user])

  return (
    <div className="min-h-[calc(100vh-100px)] w-full md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customshadow">
         {/* for side profile name and pic */}
          <div className="h-32 justify-center items-center flex flex-col">
            <div className='text-5xl cursor-pointer '> 
              {
                user?.profilePic? 
                ( <img src={user?.profilePic} className='w-20 h-20 rounded-full border-2 border-red-500 object-cover'/> ) 
                : (<FaRegUserCircle/>)
              }
            </div>
            <div>
              <p className="font-semibold capitalize">{user?.name}</p>
              <p className="text-center text-sm">{user?.role}</p>
            </div>
          </div>
          {/* for side navigation */}
          <div>
            <nav className="grid p-4">
              <Link to={"allUser"} className="px-2 py-1 hover:bg-slate-100">All users </Link>
              <Link to={"All-product"} className="px-2 py-1 hover:bg-slate-100">Product </Link>
            </nav>
          </div>

      </aside>
      <main className="p-2 w-full">
          <Outlet/>
      </main>
    </div>
  )
}
