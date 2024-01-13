"use client"
import { getBalanceDetails, getInvidualDeposits, getPaymentDetails, getWithdrawalDetails } from '@/lib/getDetails'
import axios from 'axios'
import { Book, ChevronRight,  Loader,  PiggyBank, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import toast from "react-hot-toast"
const Page = () => {
  const [toggleForm, setToggleForm] = React.useState(false)
  const [individualDeposit, setIndividualDeposit] = React.useState(0)
  const [individualPendingDeposit, setIndividualPendingDeposit] = React.useState(0)
  const [individualApprovedDeposit, setIndividualApprovedDeposit] = React.useState(0)
  const [individualNewBalance, setIndividualNewBalance] = React.useState(0)
  const [allIndividualWithdrawal, setAllIndividualWithdrawal] = React.useState<any[]>([])
  const [paymentDetails, setPaymentDetails] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const {data:session} = useSession()
  const userId = session?.user.id
  
  const onSubmit = async (e:any) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    try{
      const data = {
        type: form.get("type"),
        account: form.get("account"),
        userId: userId
      }
      setIsLoading(true)
      
      await axios.post(`/api/payment`, data)
      .then((response:any)=>{
        if(response.status === 200){
          setToggleForm(!toggleForm)
          toast.success("Payment Method Updated")
          location.reload()
        }
      })
      .catch((error:any)=> {
        toast.error("An error occured")
      })
      .finally(()=>{
        setIsLoading(false)
      })

    }catch(error){
      console.log("error", error)
    }
  }

  React.useEffect(() => {
    const data = async () => {
      const individualDepositCall = await getInvidualDeposits(userId)
      
      
      if (individualDepositCall.data.length >= 2){
        const totalDeposits = individualDepositCall.data.reduce((total:any, each:any) =>
        (total + each.amount,0)
        )
        setIndividualDeposit(totalDeposits)
      }else{
        setIndividualDeposit(individualDepositCall.data[0]?.amount || 0)
        
      }
      
      const pendingDeposits = individualDepositCall.data.filter((each:any) => 
        each.approved === false
      )

      if(pendingDeposits.length >=2 ){
        const pendingDepositsAmount = pendingDeposits?.reduce((total:any, each:any) =>
        (total.amount + each.amount,0)
        )
        setIndividualPendingDeposit(pendingDepositsAmount)
        
      }else{
        setIndividualPendingDeposit(pendingDeposits[0]?.amount || 0)
      }
      
      
      const approvedDeposits = individualDepositCall.data.filter((each:any) => 
      each.approved === true
      )
      if(approvedDeposits.length >=2){
        const approvedDepositsAmount = approvedDeposits?.reduce((total:any, each:any) =>
         total?.amount + each?.amount
        )
        setIndividualApprovedDeposit(approvedDepositsAmount)
      }else{
        setIndividualApprovedDeposit(approvedDeposits[0]?.amount || 0)
      }
      
      
      const details = await getPaymentDetails()
      setPaymentDetails(details.data)

      
      const withdrawalApi = await getWithdrawalDetails(userId)
      setAllIndividualWithdrawal(withdrawalApi.data)

      // Get the total Balance
      const balance =  await getBalanceDetails()
      setIndividualNewBalance(balance.data[balance.data.length -1]?.totalBalance)
      
            
      
    } 
    data()
  }, [])

  return (
    <section>
      <div className='py-2 '>
        <div className='flex flex-wrap md:flex-nowrap items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold opacity-80 '>{session?.user?.firstname! && (<>{session.user.firstname}<span>'s</span></>)} Dashboard<small className='text-xs text-black/50 pl-1 line-clamp-1 '>{session?.user.email! && (<>{session.user.email}</>)}</small></h1>
          </div>
          <div className=' flex items-center'>
            <h2 className='text-sm  font-bold'>Remaining balance:<small className='text-[12px] text-black/50  pl-1'>$ {individualNewBalance.toFixed(2) || 0}</small></h2>
            
          </div>
        </div>
          <hr className='w-full text-base'/>
      </div>
      <div className='flex gap-7 flex-wrap  md:flex-nowrap mb-12'>
        <div className='md:basis-2/3 w-full'>
          <div className="flex flex-wrap md:flex-nowrap text-white gap-4 mb-10">
            <div className='bg-sky-400 flex px-10 md:w-[350px] w-full py-20 rounded-md'>
              <PiggyBank size={50}/>
              <div>
                <span className="text-3xl">{allIndividualWithdrawal.length}</span>
                <p>Withdrawals</p>
              </div>
            </div>
            <div className="bg-pink-400  flex px-10 md:w-[350px] w-full  py-20 rounded-md ">
              <Book size={50}/>
              <div>
                <span className="text-xl">USD {(individualDeposit).toFixed(2)} </span>
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
          <div className='border-b-2 space-y-2 pt-4 rounded-md  bg-gradient-to-tl from-violet-800 to-black text-white basis-1/2 px-3 py-5'>
              <h3 className="text-lg font-bold">Setup your payment</h3>
              <p className="text-xs">Please add a mode of payment</p>
              <button onClick={()=>setToggleForm(!toggleForm)} type="button" className="px-5 py-1 hover:bg-slate-400 border hov  text-white shadow-2xl  ">{paymentDetails.length > 0 ? "Update" : "Setup"}</button>
              {paymentDetails.map((detail, index) => (
                <div key={index} className='flex flex-col'>
                  <span>Type: <span className='text-amber-500'>{detail.type} </span></span>
                  <span>Account: <span className='text-amber-500'>{detail['account']} </span></span>
                </div>

              )) 

              }
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className=" border-r-2 pr-2 py-3">
              <span className="font-bold">USD {(individualPendingDeposit).toFixed(2)}</span>
              <p className="text-xs">Pending</p>
            </div>
            <div>
              <span className="font-bold">USD {(individualApprovedDeposit).toFixed(2)}</span>
              <p className="text-xs">Approved</p>
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
          <form className="py-7 px-10 space-y-7" onSubmit={onSubmit}>
              <div  className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col flex w-full ">
                  <label htmlFor="type"  className="text-lg font-bold">Mode of Payment</label>
                  <select className="w-full border-slate-400 border-2 rounded-md p-2" name="type">
                      <option>Bitcoin</option>
                      <option>USDT</option>
                  </select>
              </div>
                <div className="flex-col flex w-full ">
                  <label htmlFor="account"  className="text-lg font-bold">Account</label>
                  <div className="flex">
                    <input type="text" name="account" placeholder="Your account number" className="w-full border-slate-400 border-2 rounded-tl-md rounded-bl-md p-2" required/>
                  </div>
                </div>
              </div>
              <button type="submit" className="px-5 py-1 rounded-md  text-white  bg-amber-400" disabled={isLoading}>{isLoading ? (<><span className='flex'><Loader className='animate-spin' />Updating...</span></> ) : "Update"}</button>
          </form>

        </div>
        
      </div>
  
      }
      
    </section>
  )
}

export default Page