"use client"
import {getAllWithdrawalDetails, getDeposits, getUsers} from '@/lib/getDetails'
import { Book, ChevronRight,  Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  const [allUsers, setAllUsers] = React.useState<any[]>([])
  const [allAdmin, setAllAdmin] = React.useState<any[]>([])
  const [allDeposits, setAllDeposits] = React.useState(0)
  const [allPendingDeposits, setAllPendingDeposits] = React.useState(0)
  const [allApprovedDeposits, setAllApprovedDeposits] = React.useState(0)
  const [allPendingWithdrawal, setAllPendingWithdrawal] = React.useState(0)
  const {data:session} = useSession()
  console.log("id", session?.user.id)
  React.useEffect(() => {
    const data = async () => {
      const users = await getUsers()
      setAllUsers(users.data)
      const admin =  users.data.filter((each: { role: string }) => {
        return each.role === "Admin"
      })
      setAllAdmin(admin)
      const deposits = await getDeposits()
      if (deposits.data.length >= 2){
        const totalDeposits = deposits.data.reduce((total:any, each:any) =>
        total + each.amount,0
        )
        setAllDeposits(totalDeposits)

      }else{
        setAllDeposits(deposits.data[0].amount || 0)
        
      }
      
      const pendingDeposits = deposits.data.filter((each:any) => 
        each.approved === false
      )
      if(pendingDeposits.length >=2 ){
        const pendingDepositsAmount = pendingDeposits?.reduce((total:any, each:any) =>
         (total + each.amount,0)
        )
        setAllPendingDeposits(pendingDepositsAmount)
        
      }else{
        setAllPendingDeposits(pendingDeposits[0].amount || 0)
      }
      
      
      const approvedDeposits = deposits.data.filter((each:any) => 
      each.approved === true
      )
      
      if(approvedDeposits.length >=2){
        const approvedDepositsAmount = approvedDeposits?.reduce((total:any, each:any) =>
         total + each.amount,0
        )
        setAllApprovedDeposits(approvedDepositsAmount)
      }else{
        setAllApprovedDeposits(approvedDeposits[0]?.amount || 0)
      }
      
      const Withdrawal = await getAllWithdrawalDetails()
      const pendingWithdrawal = Withdrawal.data.filter((each:any) => 
      each.approved === false
      )
      
      if(pendingWithdrawal.length >=2){
        const approvedDepositsAmount = pendingWithdrawal?.reduce((total:any, each:any) =>
         total + each.amount,0
        )
        setAllPendingWithdrawal(approvedDepositsAmount)
      }else{
        setAllPendingWithdrawal(pendingWithdrawal[0]?.amount || 0)
      }
      

    } 
    data()
  }, [])
  return (
    <section>
      <div className='py-2'>
        <h1 className='text-3xl font-bold opacity-80'>{session?.user?.firstname! && (<>{session.user.firstname}<span>'s</span></>)} Dashboard<small className='text-xs line-clamp-1 text-black/50 pl-1'>{session?.user.email! && (<>{session.user.email}</>)}</small></h1>
        <hr className='w-full text-base'/>
      </div>
      <div className='flex gap-7 flex-wrap md:flex-nowrap mb-12'>
        <div className='md:basis-2/3'>
          <div className="flex flex-wrap md:flex-nowrap  text-white gap-4 mb-10">
            
            <div className='bg-sky-400 flex px-10 md:w-[350px] w-full py-20 rounded-md'>
              <Users size={50}/>
              <div>
                <span className="text-3xl">{allUsers?.length}</span>
                <p>{allUsers.length > 1 ? "Registered Users" : "Registered User"}</p>
              </div>
            </div>
           
            <div className="bg-pink-400  flex px-10 md:w-[350px] w-full py-20 rounded-md ">
              <Book size={50}/>
              <div>
                <span className="text-xl">USD {allPendingWithdrawal.toFixed(2)} </span>
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
        <div className="shadow-2xl  w-full flex flex-col">
          <div className='border-b-2 md:basis-2/3 py-5 flex flex-col items-center justify-center'>
              <h3 className="text-2xl">USD {(allDeposits).toFixed(2)}</h3>
              <p className="text-xs">Total deposits</p>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className=" border-r-2 pr-2">
              <span className="font-bold">USD {(allPendingDeposits).toFixed(2)}</span>
              <p className="text-xs">Pending deposits</p>
            </div>
            <div>
              <span className="font-bold">USD {(allApprovedDeposits).toFixed(2)}</span>
              <p className="text-xs">Approved deposits</p>
            </div>
          </div>
        </div>

      </div>
      
    </section>
  )
}

export default page