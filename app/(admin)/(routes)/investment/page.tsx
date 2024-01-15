"use client"
import { getInvestments } from '@/lib/getDetails'
import axios from 'axios'
import { Banknote, ChevronRight, Loader, Pencil, PiggyBank, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const [toggleForm, setToggleForm] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [allInvestment, setAllInvestment] = React.useState<any[]>([])
  const {data:session} = useSession()
  const currentUserId = session?.user.id
  const [formData, setFormData] = React.useState({
    name: "",
    min: "",
    max:  "",
    profit: "",
    period: "",
    userId:currentUserId
  })

  const onChange = (event: any) => {
    event.preventDefault()
    const {name, value} = event.target
    if (name === "max" || name === "min" || name === "profit"){
      setFormData({...formData, [name]: parseInt(value)})
    }else{
      setFormData({...formData, [name]:value})
    }
  }

  const onSubmit = (event:any)=>{
    event.preventDefault()

    try{
      setIsLoading(true)
      axios.post("/api/investment", formData)
      .then((response:any)=> {
        if(response.status=== 200){
          setToggleForm(!toggleForm)
          toast.success("Created Successfully")
        } 
      })
      .catch((error:any) =>  {
        console.log("Api error", error)
      })
    }catch(error){
      console.error(error)
    }
    finally{
      
    }

  }

  React.useEffect(() => {
    if (typeof window !== "undefined"){
      const data = async () => {
        const investment = await getInvestments()
        setAllInvestment(investment.data)
      }
      data()
    }
  },[])
  return (
    <section>
      <div className='py-2 '>
        <div className="flex pb-2 justify-between items-center">
          <h1 className='text-3xl font-bold opacity-80'>Investment Plans</h1>
          <button className="opacity-80 rounded-md border py-2 px-4" onClick={()=>setToggleForm(!toggleForm)}>Create plan</button>

        </div>
        <hr className='w-full text-base'/>
      </div>

          <div className="flex flex-wrap md:flex-nowrap text-white gap-4 mb-10">
            <div className='bg-sky-400 space-x-2 flex px-10 w-full  py-20 rounded-md'>
              <PiggyBank size={50}/>
              <div>
                <span className="text-2xl">{allInvestment[allInvestment.length -1]?.name}</span>
                <p>Latest investment plan</p>
              </div>
            </div>
            <div className="bg-pink-400 space-x-2 flex px-10 w-full  py-20 rounded-md ">
              <Banknote size={50}/>
              <div>
                <span className="text-3xl">{allInvestment.length} </span>
                <p>{allInvestment.length > 1 ? "Investment plans" : "Investment plan"}</p>
              </div>
            </div>

          </div>
          {allInvestment.length > 0 && 
            <div className="shadow-2xl mb-12 px-5 py-4 pt-5 rounded-md w-full"> 
              <div className="flex flex-wrap justify-between items-center">
              {/* <div></div>
              <div className="flex justify-between border p-2 items-center mb-2"><span className='pr-2'>Edit</span> <Pencil className='' size={15}/></div> */}

              
              <table className='w-full'>
                <thead>
                  <tr >
                    <th >Deposit type</th>
                    <th >Minimum</th>
                    <th >Maximum</th>
                    <th >Profit</th>
                    <th >Period</th>
                    <th >Time/Date</th>
                  </tr>

                </thead>
                <tbody>
                {allInvestment.map((deposit, index) => (
                    <tr key={index} >
                      <td >{deposit.name}</td>
                      <td >${deposit.min}</td>
                      <td >{deposit.max}</td>
                      <td >{deposit.profit}%</td>
                      <td >{deposit.period}</td>
                      <td >{new Date(deposit.createdAt).toLocaleString()}</td>
                    </tr>
                

                ))} 

                </tbody>

              </table>
              </div> 
            </div>
          }
      {toggleForm &&
      <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50 top-0 left-0 fixed " >
        <div className="bg-white shadow md:-mb-56 rounded-md md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setToggleForm(!toggleForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7" onSubmit={onSubmit}>
              <div className="flex-col flex ">
                <label htmlFor="name" className="text-lg font-bold">Plan name</label>
                <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Your investment plan" className="w-full border-slate-400 border-2 rounded-md p-2"/>
              </div>
              <div className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col  flex w-full ">
                  <label htmlFor="min"  className="text-lg font-bold">Minimum Investment</label>
                  <input type="number" name="min" value={formData.min} onChange={onChange} placeholder="Your minimum investment plan" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
                <div className="flex-col flex w-full">
                  <label htmlFor="max"  className="text-lg font-bold">Maximum Investment</label>
                  <input type="number" name="max" value={formData.max} onChange={onChange} placeholder="Your maximum investment plan" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
              </div>
              <div  className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col flex w-full ">
                  <label htmlFor="profit"  className="text-lg font-bold">Profit</label>
                  <div className="flex">
                    <input type="number" name="profit" value={formData.profit} onChange={onChange} placeholder="Your profit plan" className="w-full border-slate-400 border-2 rounded-tl-md rounded-bl-md p-2"/>
                    <span className="w-fit bg-slate-400 border-slate-400 border-2 rounded-tr-md rounded-br-md p-2">%</span>
                  </div>
                </div>
                <div className="flex-col flex w-full ">
                  <label htmlFor="period"  className="text-lg font-bold">Interval Period</label>
                  <select className="w-full border-slate-400 border-2 rounded-md p-2" name="period" value={formData.period} onChange={onChange}>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                  </select>
              </div>
              </div>
              <button type="submit" className="px-5 py-1 rounded-md  text-white  bg-amber-400">{isLoading ? (<><span className='flex'><Loader className='animate-spin' />Creating...</span></> ) : "Create"}</button>
          </form>

        </div>
        
      </div>
  
      }
      
    </section>
  )
}

export default page