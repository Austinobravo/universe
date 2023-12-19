"use client"
"use client"
import { Banknote, ChevronRight, PiggyBank, X } from 'lucide-react'
import React from 'react'

const page = () => {
  const [toggleForm, setToggleForm] = React.useState(false)
  return (
    <section>
      <div className='py-2 '>
        <div className="flex pb-2 justify-between items-center">
          <h1 className='text-3xl font-bold opacity-80'>Investment Plans</h1>
          <button className="opacity-80 rounded-md border py-2 px-4" onClick={()=>setToggleForm(!toggleForm)}>Create plan</button>

        </div>
        <hr className='w-full text-base'/>
      </div>

          <div className="flex flex-wrap md:flex-nowrap text-white gap-4 mb-10">
            <div className='bg-sky-400 space-x-2 flex px-10 w-full  py-20 rounded-md'>
              <PiggyBank size={50}/>
              <div>
                <span className="text-xl">USD 0.00</span>
                <p>Based on investment plans</p>
              </div>
            </div>
            <div className="bg-pink-400 space-x-2 flex px-10 w-full  py-20 rounded-md ">
              <Banknote size={50}/>
              <div>
                <span className="text-3xl">0 </span>
                <p>Investment plans</p>
              </div>
            </div>

          </div>
          <div className="shadow-2xl mb-12 px-5 h-40 pt-5 rounded-md w-full">
            <div className="flex justify-between items-center">
            <h3>Today's Payouts</h3>
            <span className="flex justify-between items-center">View all <ChevronRight size={15}/></span>

            </div>
      </div>
      {toggleForm &&
      <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50 top-0 left-0 fixed ">
        <div className="bg-white shadow  rounded-md md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setToggleForm(!toggleForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7">
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Plan name</label>
                <input type="text" placeholder="Your investment plan" className="w-full border-slate-400 border-2 rounded-md p-2"/>
              </div>
              <div className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col  flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Minimum Investment</label>
                  <input type="number" placeholder="Your minimum investment plan" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
                <div className="flex-col flex w-full">
                  <label htmlFor=""  className="text-lg font-bold">Maximum Investment</label>
                  <input type="number" placeholder="Your maximum investment plan" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
              </div>
              <div  className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Profit</label>
                  <div className="flex">
                    <input type="number" placeholder="Your profit plan" className="w-full border-slate-400 border-2 rounded-tl-md rounded-bl-md p-2"/>
                    <span className="w-fit bg-slate-400 border-slate-400 border-2 rounded-tr-md rounded-br-md p-2">%</span>
                  </div>
                </div>
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Interval Period</label>
                  <select className="w-full border-slate-400 border-2 rounded-md p-2">
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                  </select>
              </div>
              </div>
              <button type="submit" className="px-5 py-1 rounded-md  text-white  bg-amber-400">Save</button>
          </form>

        </div>
        
      </div>
  
      }
      
    </section>
  )
}

export default page