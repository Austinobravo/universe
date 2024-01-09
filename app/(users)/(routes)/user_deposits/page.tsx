"use client"
import { Banknote, ChevronRight, Landmark, X } from 'lucide-react'
import React from 'react'
import Image from "next/image"
import { getInvestments } from '@/lib/getDetails'
import toast from 'react-hot-toast'
const page = () => {
  const [toggleForm, setToggleForm] = React.useState(false)
  const [allInvestment, setAllInvestment] = React.useState<any[]>([])
  const [formData,setFormData] = React.useState({name:"",min:"",max:"",period:"",profit:""})

  const onChange = (event: any) => {
    event.preventDefault()
    const {name, value} = event.target
    if (name === "min" ){
      setFormData({...formData, [name]: parseInt(value)})
    }
  }
  
  const onSubmit = (event:any)=>{
    event.preventDefault()

    try{
      
          toast.success("Created Successfully")
        
     
    }
    finally{
      
    }

  }

  React.useEffect(() => {
    const data = async () => {
      const investment = await getInvestments()
      setAllInvestment(investment.data)
    }
    data()
  })
  return (
    <section>
      <div className='py-2 '>
        <div className="flex pb-2 justify-between items-center">
          <h1 className='text-3xl font-bold opacity-80'>Deposits</h1>
          <button className="opacity-80 rounded-md border py-2 px-4" onClick={()=>setToggleForm(!toggleForm)}>Create plan</button>

        </div>
        <hr className='w-full text-base'/>
      </div>

          <div className="flex flex-wrap md:flex-nowrap text-white gap-4 mb-10">
            <div className='bg-sky-400 space-x-2 flex px-10 w-full  py-20 rounded-md'>
              <Landmark size={50}/>
              <div>
                <span className="text-xl">USD 0.00</span>
                <p>Latest Deposits</p>
              </div>
            </div>
            <div className="bg-pink-400 space-x-2 flex px-10 w-full  py-20 rounded-md ">
              <Banknote size={50}/>
              <div>
                <span className="text-3xl">0 </span>
                <p>All Deposits</p>
              </div>
            </div>

          </div>
          <div className="shadow-2xl mb-12 px-5  py-5 rounded-md w-full">
            <div className="flex justify-between items-center">
            <h3>Select your preferred investment plan</h3>
            <span className="flex justify-between items-center">View all <ChevronRight size={15}/></span>

            </div>
            <div className="flex gap-5 flex-wrap md:flex-nowrap">
              {allInvestment.map((investment, index) => (
                <div key={index} className="bg-green-200 rounded-md px-2 space-y-2 py-5 w-full">
                  <h2 className="text-xl font-bold">{investment.name}</h2>
                  <p>$ {investment.min} <span className="text-xs">min</span></p>
                  <p>$ {investment.max} <span className="text-xs">max</span></p>
                  <p>{investment.period}</p>
                  <div>
                  <button className="opacity-80 bg-slate-400 text-white rounded-md border py-2 px-4" onClick={()=>{setFormData({...investment}), setToggleForm(!toggleForm)}} >Invest</button>
                  </div>
                </div>

              ))}
              
            </div>
        </div>
        {/* <div className="shadow-2xl mb-12 px-5  py-5 rounded-md w-full">
          <Image src="/home/bitcoin.jpg" width={20} height={20} alt="bitcoin"/>
          <form>
            <div>
              <label htmlFor="">Enter amount</label>
              <input type="number" placeholder="Amount"/>
            </div>
            <button className="opacity-80 bg-slate-400 text-white rounded-md border py-2 px-4" >Invest</button>
            
          </form>

        </div> */}
        {/* <div className="shadow-2xl mb-12 px-5  py-5 rounded-md w-full">
          <h2>BTC Bitcoin Account</h2>
          <p>Please make payment to this wallet address <span className="text-green">1r4h4rj4rnuy4ru4;oir</span></p>
          <form>
            <div>
              <label htmlFor="">Enter file</label>
              <input type="file" placeholder="Amount"/>
            </div>
            <button className="opacity-80 bg-slate-400 text-white rounded-md border py-2 px-4" >Invest</button>
            
          </form>

        </div> */}
      {toggleForm &&
      <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50 top-0 left-0 fixed ">
        <div className="bg-white shadow  rounded-md md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setToggleForm(!toggleForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7" onSubmit={onSubmit}>
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Plan name</label>
                <input type="text" value={formData.name} placeholder="Your investment plan" className="w-full border-slate-400 border-2 rounded-md p-2" readOnly/>
              </div>
              <div className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col  flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Minimum Investment</label>
                  <input type="number" name='min' value={formData.min} min={formData.min} max={formData.max} onChange={onChange} placeholder="Your minimum investment plan" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
                <div className="flex-col flex w-full">
                  <label htmlFor=""  className="text-lg font-bold">Maximum Investment</label>
                  <input type="number" value={formData.max} placeholder="Your maximum investment plan" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
              </div>
              <div  className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Profit</label>
                  <div className="flex">
                    <input type="number" value={formData.profit} placeholder="Your profit plan" className="w-full border-slate-400 border-2 rounded-tl-md rounded-bl-md p-2"/>
                    <span className="w-fit bg-slate-400 border-slate-400 border-2 rounded-tr-md rounded-br-md p-2">%</span>
                  </div>
                </div>
                <div className="flex-col flex w-full ">
                  <label htmlFor=""  className="text-lg font-bold">Interval Period</label>
                  <select className="w-full border-slate-400 border-2 rounded-md p-2" value={formData.period}>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                  </select>
              </div>
              </div>
              <button type="submit" className="px-5 py-1 rounded-md  text-white  bg-amber-400">Save</button>
          </form>

        </div>
        
      </div>
  
      }
      
    </section>
  )
}

export default page