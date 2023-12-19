import { Banknote, ChevronRight, PiggyBank } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <section>
      <div className='py-2 '>
        <div className="flex pb-2 justify-between items-center">
          <h1 className='text-3xl font-bold opacity-80'>Investment Plans</h1>
          <button className="opacity-80 rounded-md border py-2 px-4">Create plan</button>

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
          <div className="shadow-2xl px-5 h-40 pt-5 rounded-md w-full">
            <div className="flex justify-between items-center">
            <h3>Today's Payouts</h3>
            <span className="flex justify-between items-center">View all <ChevronRight size={15}/></span>

            </div>

      </div>
      
    </section>
  )
}

export default page