"use client"
import { Book, ChevronRight,  Users } from 'lucide-react'
import React from 'react'

const page = () => {
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
              <Users size={50}/>
              <div>
                <span className="text-3xl">0</span>
                <p>Registered Users</p>
              </div>
            </div>
            <div className="bg-pink-400  flex px-10 w-[350px]  py-20 rounded-md ">
              <Book size={50}/>
              <div>
                <span className="text-xl">USD 0.00 </span>
                <p>Pending Withdrawals</p>
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
        <div className="shadow-2xl w-full flex flex-col">
          <div className='border-b-2 basis-2/3 flex flex-col items-center justify-center'>
              <h3 className="text-2xl">USD 0.00</h3>
              <p className="text-xs">Total deposits</p>
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
      
    </section>
  )
}

export default page