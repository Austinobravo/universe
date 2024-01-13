"use client"
import { getAllWithdrawalDetails } from '@/lib/getDetails'
import React from 'react'

const page = () => {
  const [allIndividualWithdrawal, setAllIndividualWithdrawal] = React.useState<any[]>([])
    React.useEffect(()=> {
        const data = async () => {
            const withdrawalApi = await getAllWithdrawalDetails()
              setAllIndividualWithdrawal(withdrawalApi.data)
              console.log("with-data", withdrawalApi.data)
              

          }
          data()

    }, [])
  return (
    <section>
        <div className="shadow-2xl mb-12 px-5  py-5 rounded-md w-full">
            <div className="flex justify-between items-center">
          
            <table >
            <thead>
                <tr >
                <th >Amount</th>
                <th >Time/Date</th>
                <th >Approved</th>
                </tr>
            </thead>
            <tbody>
              {allIndividualWithdrawal.map((deposit, index) => (
                 
                  <tr key={index}>

                    <td >${deposit.amount}</td>
                    <td >{deposit.createdAt}</td>
                    <td className={`cursor-pointer text-center `}>
                      {deposit.approved ? 
                        <span className='mr-1 bg-green-400 py-1 px-4 text-xs text-white rounded-sm'>
                        Approved
                      </span>
                      : (
                        <>
                        <div className='flex flex-wrap md:flex-nowrap gap-1 justify'>
                            <span className='mr-1 bg-pink-400 py-1 px-4 text-xs text-white rounded-sm'>
                            Approve
                            </span>
                            <span className=' bg-amber-400 py-1 px-4 text-xs text-white rounded-sm'>
                            Pending
                            </span>

                        </div>
                        </>

                      )}
                      </td>
                  </tr>
               

                ))}  

            </tbody>

          </table>
            </div>
        </div>
    </section>
  )
}

export default page
