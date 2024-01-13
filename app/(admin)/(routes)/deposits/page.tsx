"use client"
import { getDeposits } from '@/lib/getDetails'
import axios from 'axios'
import { Banknote, ChevronRight, Landmark, Loader, Pencil, X } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const [toggleForm, setToggleForm] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [allDeposits, setAllDeposits] = React.useState<any[]>([])
  const [formData, setFormData] = React.useState({name:"", amount:""})

  const onSubmit = async (event:any) => {
    event.preventDefault()
    try{
      setIsLoading(true)
      await axios.patch("/api/deposits", formData)
      .then((response) => {
        if(response.status===200){
          toast.success("Approved")
          setToggleForm(!toggleForm)
          location.reload()

        }
      })
      .catch((error)=>{
        toast.error("An error occured")
      })
    }catch(error){
      console.error()
    }finally{
      setIsLoading(false)
    }
  }
  
  React.useEffect(()=> {
    if (typeof window !== "undefined"){
      const data = async () => {
        const deposits = await getDeposits()
        setAllDeposits(deposits.data)
        
      }
      data()

    }

  },[])


   
  return (
    <section>
      <div className='py-2 '>
        <div className="flex pb-2 justify-between items-center">
          <h1 className='text-3xl font-bold opacity-80'>Deposits</h1>
          

        </div>
        <hr className='w-full text-base'/>
      </div>

          <div className="flex flex-wrap md:flex-nowrap text-white gap-4 mb-10">
            <div className='bg-sky-400 space-x-2 flex px-10 w-full  py-20 rounded-md'>
              <Landmark size={50}/>
              <div>
                <span className="text-xl">USD {allDeposits[(allDeposits).length-1]?.amount.toFixed(2)}</span>
                <p>Latest Deposits</p>
              </div>
            </div>
            <div className="bg-pink-400 space-x-2 flex px-10 w-full  py-20 rounded-md ">
              <Banknote size={50}/>
              <div>
                <span className="text-3xl">{allDeposits.length} </span>
                <p>All Deposits</p>
              </div>
            </div>

          </div>
          {allDeposits.length > 0 && 
            <div className="shadow-2xl mb-12 px-5  py-5 rounded-md w-full">
              <div className="flex justify-between items-center">
                
              <table className='w-full'>
                <thead>
                  <tr >
                    <th >Deposit type</th>
                    <th >Amount</th>
                    <th >Time/Date</th>
                    <th >Approved</th>
                  </tr>

                </thead>
                {allDeposits.map((deposit, index) => (
                  <tbody>
                      <tr key={index} className=' '>
                        <td className=''>{deposit.name}</td>
                        <td className=''>${deposit.amount}</td>
                        <td className=''>{new Date(deposit.createdAt).toLocaleString()}</td>
                        <td className={`cursor-pointer `}>
                          {deposit.approved ? 
                            <span className='mr-1 bg-green-400 py-1 px-4 text-xs text-white rounded-sm'>
                            Approved
                          </span>
                          : (
                            <>
                            <div className='flex flex-wrap md:flex-nowrap gap-1 justify-center'>
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
                  </tbody>
                  ))}  

            </table>
              </div>
            </div>
          }
      {toggleForm &&
      <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50 top-0 left-0 fixed ">
        <div className="bg-white shadow  md:-mb-56 rounded-md md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setToggleForm(!toggleForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7" onSubmit={onSubmit}>
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Plan name</label>
                <input type="text" placeholder="Your investment plan" value={formData.name} className="w-full border-slate-400 bg-slate-400 border-2 rounded-md p-2" disabled/>
              </div>
              <div className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col  flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Amount</label>
                  <input type="number"  placeholder="Your minimum investment plan" value={formData.amount} className="w-full border-slate-400 bg-slate-400 border-2 rounded-md p-2" disabled/>
                </div>

              </div>

              <button type="submit" className="px-5 py-1 rounded-md  text-white  bg-amber-400">{isLoading ? (<><span className='flex'><Loader className='animate-spin' />Approving...</span></> ) : "Approve"}</button>
          </form>

        </div>
        
      </div>
  
      }
      
    </section>
  )
}

export default page