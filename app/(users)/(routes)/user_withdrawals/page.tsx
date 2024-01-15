"use client"
import { getBalanceDetails, getInvidualDeposits, getPaymentDetails, getWithdrawalDetails } from '@/lib/getDetails'
import axios from 'axios'
import { Banknote, ChevronRight, Landmark, Loader, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  amount: z.string().min(1, "This field must have at least 1 characters"),

})

type ValidationSchemaType = z.infer<typeof formSchema>
const page = () => {
  const {register, formState:{isValid, errors},getValues } = useForm<ValidationSchemaType>({mode: "all", resolver: zodResolver(formSchema)})
  const [toggleForm, setToggleForm] = React.useState(false)
  const [individualApprovedDeposit, setIndividualApprovedDeposit] = React.useState(0)
  const [allIndividualWithdrawal, setAllIndividualWithdrawal] = React.useState<any[]>([])
  const [allIndividualWithdrawalAmount, setAllIndividualWithdrawalAmount] = React.useState(0)
  const [individualNewBalance, setIndividualNewBalance] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [paymentDetails, setPaymentDetails] = React.useState("")
  const {data:session} = useSession()
  const userId = session?.user.id

  const verifyBalance = async (value:any) => {
    if( value <= individualApprovedDeposit) {

      return true
    }
    return false
  }

  const onSubmit = async (e:any) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    try{
      const data = {
        amount: +form.get("amount")! ,
        userId: userId,
        existingDepositAmount: individualApprovedDeposit,
        existingWithdrawalAmount: allIndividualWithdrawalAmount
      }

      const verify = await verifyBalance(data.amount)

      if(!verify) return toast.error("Insufficient funds")
      setIsLoading(true)
      
      await axios.post("/api/withdrawal", data)
      .then((response)=> {
        if(response.status === 200){
          setToggleForm(!toggleForm)
          toast.success(`Your ${data.amount} withdrawal have been updated.`)

         
        }
      })
      .catch((error)=> {
        toast.error(`An error occured.`)
      })
      .finally(()=> {
        setIsLoading(false)
      })

    }catch(error){
      toast.error("An error occured.")
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined"){
      const data = async () => {
        const individualDepositCall = await getInvidualDeposits(userId)
        
  
        // Get the approved deposits
        const approvedDeposits = individualDepositCall.data.filter((each:any) => 
        each.approved === true
        )
        if(approvedDeposits.length >=2){
          const approvedDepositsAmount = approvedDeposits?.reduce((total:any, each:any) =>
           total + each?.amount
          )
          setIndividualApprovedDeposit(approvedDepositsAmount)
        }else{
          setIndividualApprovedDeposit(approvedDeposits[0]?.amount || 0)
        }
  
        // Get the individual Payment details
        const details = await getPaymentDetails()
        setPaymentDetails(details.data[0]?.type)
        
        // Get the total Individual withdrawal
        const withdrawalApi = await getWithdrawalDetails(userId)
        setAllIndividualWithdrawal(withdrawalApi.data)
        
        if(withdrawalApi.data.length >=2){
          const withdrawalAmount = withdrawalApi.data?.reduce((total:any, each:any) =>
           total + each?.amount,0, 
          )
          
          setAllIndividualWithdrawalAmount(withdrawalAmount)
        }else{
          
          setAllIndividualWithdrawalAmount(withdrawalApi.data[0]?.amount || 0)
        }
  
        // Get the total Balance
        const balance =  await getBalanceDetails()
        setIndividualNewBalance(balance.data[balance.data.length -1]?.totalBalance)
        
        
        
      } 
      data()
      
    }
  }, [])
  return (
    <section>
      <div className='py-2 '>
        <div className="flex pb-2 justify-between items-center">
          <h1 className='text-3xl font-bold opacity-80'>Withdrawals</h1>
          <button className="opacity-80 rounded-md border py-2 px-4" onClick={()=>setToggleForm(!toggleForm)}>Create plan</button>

        </div>
        <hr className='w-full text-base'/>
      </div>

          <div className="flex flex-wrap md:flex-nowrap text-white gap-4 mb-10">
            <div className='bg-sky-400 space-x-2 flex px-10 w-full  py-20 rounded-md'>
              <Landmark size={50}/>
              <div>
                <span className="text-xl">USD {allIndividualWithdrawal[allIndividualWithdrawal.length -1]?.amount.toFixed(2) || (0).toFixed(2)}</span>
                <p>Latest Withdrawals</p>
              </div>
            </div>
            <div className="bg-pink-400 space-x-2 flex px-10 w-full  py-20 rounded-md ">
              <Banknote size={50}/>
              <div>
                <span className="text-3xl">{allIndividualWithdrawal.length} </span>
                <p>All Withdrawals</p>
              </div>
            </div>

          </div>
          {allIndividualWithdrawal.length > 0 && 
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

                      <td >${deposit.amount.toFixed(2)}</td>
                      <td >{new Date(deposit.createdAt).toLocaleString()}</td>
                      <td className={`${deposit.approved && "bg-green-400"} bg-amber-400 py-1 px-4 text-xs text-white rounded-sm `}>{deposit.approved ? "Approved" : "Pending"}</td>
                    </tr>
                  ))}  

              </tbody>

              </table>
              </div>
            </div>
          }
      {toggleForm &&
      <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50 top-0 left-0 fixed ">
        <div className="bg-white shadow md:-mb-56 rounded-md md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setToggleForm(!toggleForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7" onSubmit={onSubmit}>
              
              <div className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col  flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Withdraw</label>
                  <input type="number" placeholder="How much do you need?"  name='amount' className="w-full border-slate-400 border-2 rounded-md p-2" required/>
                  <span className="text-red-500">
                      <ErrorMessage name="amount" errors={errors}/>
                  </span>
                </div>
                <div className="flex-col flex w-full">
                  <label htmlFor=""  className="text-lg font-bold">From</label>
                  <p className="w-full border-slate-400 border-2 rounded-md bg-slate-400 p-2" >{individualNewBalance > 0 ? (individualNewBalance)?.toFixed(2) : individualApprovedDeposit ? individualApprovedDeposit?.toFixed(2) : (<span className='flex w-fit'>You have no approved funds <Link href="/user_deposits" className='bg-amber-400 py-2 px-3 text-xs rounded-md text-white'>Make a deposit</Link> </span>)}</p>
                </div>
              </div>
              <div  className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">To</label>
                  <div className="flex">
                   
                    <p className="w-full border-slate-400 border-2  bg-slate-400 rounded-md rounded-bl-md p-2" >{paymentDetails ? paymentDetails : (<>Setup a payment method <Link href="/user_dashboard" className='bg-amber-400 py-2 px-3 text-xs rounded-md text-white'>Dashboard</Link> </>)}</p>
                    
                  </div>
                </div>
                
              </div>
              <button type="submit" className="px-5 py-1 rounded-md  text-white  bg-amber-400">{isLoading ? (<><span className='flex'><Loader className='animate-spin' />Withdrawing...</span></> ) : "Withdraw"}</button>
          </form>

        </div>
        
      </div>
  
      }
      
    </section>
  )
}

export default page