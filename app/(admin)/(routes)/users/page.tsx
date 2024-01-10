"use client"
import {getUsers} from '@/lib/getDetails'
import {  Pencil, Users, UsersRound, X } from 'lucide-react'
import React from 'react'

const page = () => {

  const [toggleForm, setToggleForm] = React.useState(false)
  const [allUsers, setAllUsers] = React.useState<any[]>([])
  const [allAdmin, setAllAdmin] = React.useState<any[]>([])

  React.useEffect(() => {
    const data = async () => {
      const users = await getUsers()
      setAllUsers(users.data)
      const admin =  users.data.filter((each: { role: string }) => {
        return each.role === "Admin"
      })
      setAllAdmin(admin)
      console.log(allUsers)
    } 
    data()
  }, [])
  return (
    <section>
      <div className='py-2 '>
        <div className="flex pb-2 justify-between items-center">
          <h1 className='text-3xl font-bold opacity-80'>Users</h1>
          <button className="opacity-80 rounded-md border py-2 px-4" onClick={()=>setToggleForm(!toggleForm)}>Create plan</button>

        </div>
        <hr className='w-full text-base'/>
      </div>

          <div className="flex flex-wrap md:flex-nowrap text-white gap-4 mb-10">
            <div className='bg-sky-400 space-x-2 flex px-10 w-full  py-20 rounded-md'>
              <Users size={50}/>
              <div>
                <span className="text-xl">{allUsers?.length}</span>
                <p>{allUsers.length > 1 ? "Registered Users" : "Registered User"}</p>
              </div>
            </div>
            <div className="bg-pink-400 space-x-2 flex px-10 w-full  py-20 rounded-md ">
              <UsersRound size={50}/>
              <div>
                <span className="text-3xl">{allAdmin.length} </span>
                <p>{allAdmin.length > 1 ? "Admins" : "Admin"}</p>
              </div>
            </div>

          </div>
          <div className="shadow-2xl mb-12 px-5 py-4 pt-5 rounded-md w-full">
            <div className="flex justify-between items-center">
            <div></div>
            <div className="flex justify-between border p-2 items-center mb-2"><span className='pr-2'>Edit</span> <Pencil className='' size={15}/></div>

            </div>
            <table className='w-full'>
              <tr className='flex flex-wrap border-2 px-2 md:flex-nowrap justify-between text-center'>
                <th className=''>First Name</th>
                <th className=''>Last Name</th>
                <th className=''>Email</th>
                <th className=''>Role</th>
              </tr>
              {allUsers.map((user, index) => (
                
                  <tr key={index} className='flex flex-wrap border-2 px-2 md:flex-nowrap justify-between '>
                    <td className=''>{user.firstName}</td>
                    <td className=''>{user.lastName}</td>
                    <td className=''>{user.email}</td>
                    <td className=''>{user.role}</td>
                  </tr>
               

               ))} 

            </table>
          </div>
      {toggleForm &&
      <div className="bg-black/50 flex overflow-y-scroll pt-60 w-full h-full items-center justify-center z-50 top-0 left-0 fixed ">
        <div className="bg-white shadow  rounded-md md:w-[600px] w-full md:-mt-[400px]">
          <div className="p-3 cursor-pointer" onClick={()=>setToggleForm(!toggleForm)}>
          <X size={30} className="ml-auto " />
          </div>
          <form className="py-7 px-10 space-y-7">
              <div className="flex-col flex ">
                <label htmlFor="" className="text-lg font-bold">Email</label>
                <input type="email" placeholder="Email" className="w-full border-slate-400 border-2 rounded-md p-2"/>
              </div>
              <div className="flex gap-3 flex-wrap md:flex-nowrap w-full">
                <div className="flex-col  flex w-full ">
                <label htmlFor="" className="text-lg font-bold">First name</label>
                <input type="text" placeholder="First name" className="w-full border-slate-400 border-2 rounded-md p-2"/>
                </div>
                <div className="flex-col flex w-full">
                  <label htmlFor=""  className="text-lg font-bold">Last name</label>
                  <input type="text" placeholder="Last name" className="w-full border-slate-400 border-2 rounded-md p-2"/>
      
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