"use client"
import { Banknote, ChevronRight, Landmark, Loader, X } from 'lucide-react'
import React from 'react'
import Image from "next/image"
import { getInvestments, getInvidualDeposits } from '@/lib/getDetails'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import dbConfig from '@/lib/dbConfig'
const page = () => {
  const [toggleForm, setToggleForm] = React.useState(false)
  const [togglePaymentForm, setTogglePaymentForm] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [allInvestment, setAllInvestment] = React.useState<any[]>([])
  const [allDeposit, setAllDeposit] = React.useState<any[]>([])
  const [prevMin, setPrevMin] = React.useState(0)
  const {data:session} = useSession()
  const userId = session?.user.id
  
  const [formData,setFormData] = React.useState({name:"",min:"",max:"",period:"",profit:""})

  const onChange = (event: any) => {
    event.preventDefault()
    const {name, value} = event.target
    if (name === "min" ){
      setFormData({...formData, [name]: parseInt(value)})
    }
  }



  
  const onSubmit = async (event:any)=>{
    event.preventDefault()
    const data = {
      name:formData.name,
      min:formData.min,
      userId:userId
    }

    try{
      setIsLoading(true)
      await axios.post(`/api/deposits/${userId}`, data)
      .then((response)=> {
        if(response.status === 200) toast.success("Created Successfully"); setTogglePaymentForm(!togglePaymentForm)
      })
      .catch((error)=>{
        toast.error(error?.response?.data?.message)
      })
      .finally(()=>{

      })
        
    }
    finally{
      setIsLoading(false)
      
    }

  }
  const validateForm = (e:any) => {
    e.preventDefault()
    setToggleForm(!toggleForm)
    setTogglePaymentForm(!togglePaymentForm)

  }

  React.useEffect(() => {
    if (typeof window !== "undefined"){
      const data = async () => {
        const investment = await getInvestments()
        setAllInvestment(investment.data)
        const deposits = await getInvidualDeposits(session?.user.id)
        setAllDeposit(deposits.data)
        
  
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
                <span className="text-xl">USD {(allDeposit[(allDeposit.length) -1 ]?.amount.toFixed(2)) || (0).toFixed(2)}</span>
                <p>Latest Deposit</p>
              </div>
            </div>
            <div className="bg-pink-400 space-x-2 flex px-10 w-full  py-20 rounded-md ">
              <Banknote size={50}/>
              <div>
                <span className="text-3xl">{(allDeposit.length)} </span>
                <p>All Deposits</p>
              </div>
            </div>

          </div>
          {allInvestment.length > 0 && 
            <div className="shadow-2xl mb-12 px-5  py-5 rounded-md w-full">
              <div className="flex font-bold justify-between items-center">
              <h3>Select your preferred investment plan</h3>

              </div>
              <div className="flex gap-5 flex-wrap md:flex-nowrap">
                {allInvestment.map((investment, index) => (
                  <div key={index} className="bg-green-200 rounded-md px-2 space-y-2 py-5 w-full">
                    <h2 className="text-2xl font-bold py-12 text-center  ">{investment.name}</h2>
                    <div className='flex gap-5 justify-evenly py-8 border-2 border-black bg-white/50 w-full items-center px-1 '>
                      <p className='font-bold flex flex-col justify-center items-center border-r-2 md:pr-12 pr-4 border-black'>$ {investment.min} <span className="text-xs font-normal">min</span></p>
                      <p className='font-bold flex flex-col justify-center items-center border-r-2 md:pr-12 pr-4 border-black'>$ {investment.max} <span className="text-xs font-normal">max</span></p>
                      <p className='font-bold  text-xl '>{investment.period}</p>

                    </div>
                    <div>
                    <button className="opacity-80 bg-amber-400 hover:bg-amber-400/80 font-bold  rounded-md border w-full py-2 px-4" onClick={()=>{setFormData({...investment}), setToggleForm(!toggleForm), setPrevMin(investment.min)}} >Make A Deposit</button>
                    </div>
                  </div>

                ))}
                
              </div>
            </div>
          }
        {allDeposit.length > 0 && 
          <div className='pb-5'>
          <table className='w-full'>
            <thead>
                <tr >
                  <th >Deposit type</th>
                  <th >Amount</th>
                  <th >Time/Date</th>
                  <th >Approved</th>
                </tr>
            </thead>
            <tbody>
                {allDeposit.map((deposit, index) => (
                  
                    <tr key={index}>
                      <td >{deposit.name}</td>
                      <td >${deposit.amount}</td>
                      <td >{new Date(deposit.createdAt).toLocaleString()}</td>
                      <td className={`${deposit.approved && "bg-green-400"} bg-amber-400 py-1 px-4 text-xs text-white rounded-sm `}>{deposit.approved ? "Approved" : "Pending"}</td>
                    </tr>
                  ))}  

            </tbody>

            </table>
          </div>
        }
        
      {toggleForm &&
      <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50 top-0 left-0 fixed ">
        <div className="bg-white shadow  md:-mb-56  rounded-md md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setToggleForm(!toggleForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7" onSubmit={validateForm}>
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Plan name</label>
                <input type="text" value={formData.name} placeholder="Your investment plan" className="w-full border-slate-400 bg-slate-400 border-2 rounded-md p-2" disabled/>
              </div>
              <div className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col  flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Minimum Investment</label>
                  <input type="number" name='min' value={formData.min} min={prevMin} max={formData.max} onChange={onChange} placeholder="Your minimum investment plan" className="w-full border-slate-400 border-2 rounded-md p-2" />
                </div>
                <div className="flex-col flex w-full">
                  <label htmlFor=""  className="text-lg font-bold">Maximum Investment</label>
                  <input type="number" value={formData.max} placeholder="Your maximum investment plan" className="w-full border-slate-400 bg-slate-400 border-2 rounded-md p-2" disabled/>
                </div>
              </div>
              <div  className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Profit</label>
                  <div className="flex">
                    <input type="number" value={formData.profit} placeholder="Your profit plan" className="w-full border-slate-400 border-2 bg-slate-400 rounded-tl-md rounded-bl-md p-2" disabled/>
                    <span className="w-fit bg-slate-400 border-slate-400 border-2 rounded-tr-md rounded-br-md p-2">%</span>
                  </div>
                </div>
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Interval Period</label>
                  <select className="w-full border-slate-400 bg-slate-400 border-2 rounded-md p-2" value={formData.period} disabled>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                  </select>
              </div>
              </div>
              <button type="submit"  className="px-5 py-1 rounded-md flex text-white  bg-amber-400">Save and Continue <ChevronRight/></button>
          </form>

        </div>
        
      </div>
  
      }
      {togglePaymentForm &&
        <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50  top-0 left-0 fixed ">
        <div className="bg-white shadow  rounded-md md:-mb-56 md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setTogglePaymentForm(!togglePaymentForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7" onSubmit={onSubmit}>
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Make Bitcoin Payment to this Wallet.</label>
                <p className="w-full border-slate-400 bg-slate-400 border-2 rounded-md p-2" > #tyhddhvc76hieucg68923pojdbjdh9c83</p>
              </div>
              <span>OR</span>
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Scan Wallet.</label>
                <Image src="/home/bitcoin.jpg" alt="Bitcoin" width={200} height={50} className="  bg-slate-400  rounded-md p-2" /> 
              </div>
              
              <button type="submit" className="px-5 py-1 rounded-md flex text-white  bg-amber-400">{isLoading ? (<><span className='flex'><Loader className='animate-spin' />Depositing...</span></> ) : "Deposit"}</button>
          </form>

        </div>
        
      </div>
      }


      
    </section>
  )
}

export default page