import { Book, ChevronRight, User } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <section>
      <div className='py-2'>
        <h1 className='text-3xl font-bold opacity-80'>Dashboard</h1>
        <hr className='w-full text-base'/>
      </div>
      <div className='flex gap-7'>
        <div className='md:basis-2/3'>
          <div className="flex  gap-4">
            <div className='bg-sky-400 flex px-10 w-[350px]  py-20 rounded-md'>
              <User/>
              <div>
                <span>0</span>
                <p>Registered Users</p>
              </div>
            </div>
            <div className="bg-pink-400  flex px-10 w-[350px]  py-20 rounded-md ">
              <Book/>
              <div>
                <span>USD 0.00 </span>
                <p>Pending Withdrawals</p>
              </div>
            </div>

          </div>
          <div >
            <div>
            <h3>Today's Payouts</h3>
            <span>View all <ChevronRight/></span>

            </div>


          </div>

        </div>
        <div>
          <div className='border-b-2'>
              <h3>USD 0.00</h3>
              <p>Total deposits</p>
          </div>
          <div>
            <div>USD 0.00
              <p>Locked</p>

            </div>
            <div>USD 0.00
              <p>Inactive</p>

            </div>
          </div>
        </div>

      </div>
      
    </section>
  )
}

export default page