import { IoClose } from "react-icons/io5";
export default function Displayimage({imageurl, onclose}) {
  return (
   <div className=" fixed bottom-0 top-0 right-0 left-0 z-50 ">
    <div className="bg-white shadow-lg rounded max-w-[40%] max-h-[85%] mx-auto mt-10 p-4 overflow-hidden">
        <div className="w-7 h-7 flex justify-center items-center float-right rounded-full hover:bg-red-100 hover:text-red-600 cursor-pointer ">
            <IoClose className="text-xl" onClick={onclose}/>
        </div>
        <div className='flex justify-center items-center p-2 w-full h-full '>
          <img src={imageurl} className='w-full h-ful object-cover'/>
        </div>
    </div>
   </div>
  )
}
