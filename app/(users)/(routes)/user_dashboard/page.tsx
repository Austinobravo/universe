"use client"
import { Book, ChevronRight,  PiggyBank, X } from 'lucide-react'
import React from 'react'

const page = () => {
  const [toggleForm, setToggleForm] = React.useState(false)
  return (
    <section>
      <div className='py-2'>
        <h1 className='text-3xl font-bold opacity-80'>Dashboard</h1>
        <hr className='w-full text-base'/>
      </div>
      <div className='flex gap-7 flex-wrap md:flex-nowrap mb-12'>
        <div className='md:basis-2/3'>
          <div className="flex flex-wrap md:flex-nowrap text-white gap-4 mb-10">
            <div className='bg-sky-400 flex px-10 w-[350px]  py-20 rounded-md'>
              <PiggyBank size={50}/>
              <div>
                <span className="text-3xl">0</span>
                <p>Withdrawals</p>
              </div>
            </div>
            <div className="bg-pink-400  flex px-10 w-[350px]  py-20 rounded-md ">
              <Book size={50}/>
              <div>
                <span className="text-xl">USD 0.00 </span>
                <p>Deposits</p>
              </div>
            </div>

          </div>
          <div className="shadow-2xl px-5 h-40 pt-5 rounded-md w-full">
            <div className="flex justify-between items-center">
            <h3>Today's Payouts</h3>
            <span className="flex justify-between items-center">View all <ChevronRight size={15}/></span>

            </div>


          </div>

        </div>
        <div className="shadow-2xl w-full flex  flex-col">
          <div className='border-b-2 space-y-2 pt-4 rounded-md  bg-gradient-to-tl from-violet-800 to-black text-white basis-1/2 px-3'>
              <h3 className="text-lg font-bold">Setup your payment</h3>
              <p className="text-xs">Please add a mode of payment</p>
              <button onClick={()=>setToggleForm(!toggleForm)} type="button" className="px-5 py-1 hover:bg-slate-400 border hov  text-white shadow-2xl  ">Setup</button>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className=" border-r-2 pr-2">
              <span className="font-bold">USD 0.00</span>
              <p className="text-xs">Locked</p>
            </div>
            <div>
              <span className="font-bold">USD 0.00</span>
              <p className="text-xs">Inactive</p>
            </div>
          </div>
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
                <label htmlFor="" className="text-lg font-bold">First name</label>
                <input type="text" placeholder="Your first name" className="w-full border-slate-400 border-2 rounded-md p-2"/>
              </div>
              <div className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col  flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Last name</label>
                  <input type="text" placeholder="Your last name" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
                <div className="flex-col flex w-full">
                  <label htmlFor=""  className="text-lg font-bold">Email</label>
                  <input type="email" placeholder="Your email" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
              </div>
              <div  className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Mode of Payment</label>
                  <select className="w-full border-slate-400 border-2 rounded-md p-2">
                      <option>Bitcoin</option>
                      <option>USDT</option>
                      <option>Bank Transfer</option>
                  </select>
              </div>
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Account</label>
                  <div className="flex">
                    <input type="text" placeholder="Your account number" className="w-full border-slate-400 border-2 rounded-tl-md rounded-bl-md p-2"/>
                  </div>
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