"use client"
import { X } from 'lucide-react'
import React from 'react'

const page = () => {
  const [toggleForm, setToggleForm] = React.useState(false)

  return (
    <section>
      <div className="py-2 px-4 w-full bg-white flex items-center justify-between border rounded-md">
        <p className="o">Name</p>
        <button className="opacity-80 bg-whitee rounded-md border py-2 px-4" onClick={()=>setToggleForm(!toggleForm)}>Create Ticket</button>
      </div>
      {toggleForm &&
      <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50 top-0 left-0 fixed ">
        <div className="bg-white shadow  rounded-md md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setToggleForm(!toggleForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7">
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Subject</label>
                <input type="text" placeholder="Your subject" className="w-full border-slate-400 border-2 rounded-md p-2"/>
              </div>
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Subject</label>
                <textarea  placeholder="Your message" className="w-full h-40 border-slate-400 border-2 rounded-md p-2"/>
              </div>

              <button type="submit" className="px-5 py-1 w-full rounded-md  text-white  bg-amber-400">Send</button>
          </form>

        </div>
        
      </div>
  
      }
    </section>
  )
}

export default page