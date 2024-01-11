"use client"
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { getSession, signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { getExistingEmail } from '@/lib/getDetails'
import toast from 'react-hot-toast'


const formSchema = z.object({
    firstname: z.string().min(2, "This field must have at least 2 characters"),
    lastname: z.string().min(2, "This field must have at least 2 characters").optional(),
    email: z.string().email("This must be a valid email").refine(async (value) => { await getExistingEmail(value)}, "Email already exists"),
    password: z.string().min(6,"This field must have at least 6 characters."),
    confirm_password: z.string().min(6, "This field must have at least 6 characters.")
}).refine((data) => data.password === data.confirm_password,{path:['confirm_password'], message:"Passwords does not match"})

type ValidationSchemaType = z.infer<typeof formSchema>
const page = () => {
    const router = useRouter()
    const {register, formState:{isValid, errors},getValues } = useForm<ValidationSchemaType>({mode: "all", resolver: zodResolver(formSchema)})
    const [isDeclared, setIsDeclared] = React.useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const  [user, setUser] = useState(
        {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    )

    const getExistingEmail = async () => {}

    const onChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target   
        setUser({...user, [name]:value})
        
    }

    const onSubmit = async (e:any) => {
        e.preventDefault()
        const data = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            confirm_password: user.confirm_password
        }
        console.log("data",data)
        if(isDeclared){
            try{
                setIsLoading(true)
              await axios.post("/api/register", data)  
              .then(async (response: any)=> {
                if(response.status === 200){
                    await signIn("credentials",{
                        email:user.email,
                        password: user.password,
                        redirect: false
                    } )
    
                    await getSession()
    
                    const updatedSession = await getSession()
    
                    if (updatedSession?.user.role === "Admin"){
                        router.push("/dashboard")
                    }else if (updatedSession?.user.role === "User"){
                        router.push("/user_dashboard")
                    }
    
                    
                } 
                
              })
              .catch((error)=> {
                  console.error(`Signup Api Error: ${error}`)
                
              })
              .finally(()=>{
              })
    
            }catch(error: any){
                console.error(`Signup Error: ${error}`)
            }finally{
                setIsLoading(false)
            }
        }else{
            toast.error("You forgot to click on the checkbox.")
        }

    }
  return (
    <section >
        <div className='flex  h-[600px] w-full'>
            <div className='dark:bg-gradient-to-tl bg-black from-purple-800 to-blue-800 md:basis-2/3 py-10 justify-between flex-col md:flex hidden  md:pl-10'>
                <div className='space-y-7 '>
                    <h2 className='text-3xl  border-b-2 w-fit text-amber-400 border-amber-400'>Join Universe</h2>
                    <p className='dark:opacity-50 text-white'>Register and explore the universe investment.</p>
                </div>
                <div>
                    <Image src="/home/logo-no-background.png" width={300} height={100} alt="logo"/>
                </div>

            </div>
            <div className='md:py-40 py-20 px-10 '>
                <form className='space-y-5' onSubmit={(e)=>onSubmit(e)}>
                    <div>
                        <h1 className='text-2xl pb-2 opacity-80'>Create account</h1>
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                        <div>
                            <label htmlFor='firstname'></label>
                            <input type='text' {...register("firstname")} onChange={(e)=>onChange(e)} value={user.firstname} id='firstname' name='firstname'  placeholder="First Name" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                            <span className="text-red-500">
                                <ErrorMessage name="firstname" errors={errors}/>
                            </span>
                        </div>
                        <div>
                            <label htmlFor='lastname'></label>
                            <input type='text' {...register("lastname")} onChange={(e)=>onChange(e)} value={user.lastname} id='lastname' name='lastname' placeholder="Last Name" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                            <span className="text-red-500">
                                <ErrorMessage name="lastname" errors={errors}/>
                            </span>
                        </div>

                    </div>
                    <div>
                        <label htmlFor='email'></label>
                        <input type='email' {...register("email")} onChange={(e)=>onChange(e)} value={user.email} id='email' name='email' placeholder="Email" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                        <span className="text-red-500">
                            <ErrorMessage name="email" errors={errors}/>
                        </span>
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 -full gap-3'>
                        <div>
                            <label htmlFor='password'></label>
                            <input type='password' {...register("password")} onChange={(e)=>onChange(e)} value={user.password} id='password' name='password' placeholder="Password" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                            <span className="text-red-500">
                                <ErrorMessage name="password" errors={errors }/>
                            </span>
                        </div>
                        <div>
                            <label htmlFor='confirm_password'></label>
                            <input type='password' {...register("confirm_password", {validate: (value)=> { const{password} =getValues(); return password === value || "Passwords should match"}})} onChange={(e)=>onChange(e)} value={user.confirm_password} id='confirm_password' name='confirm_password' placeholder="Confirm password" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                            <span className="text-red-500">
                                <ErrorMessage name="confirm_password" errors={errors }/>
                            </span>
                            
                        </div>

                    </div>
                    <div className="flex gap-2">
                        <label htmlFor='agreement'></label>
                        <input type='checkbox' id='declare' name='declare' className="cursor-pointer" required checked={isDeclared} onClick={()=> setIsDeclared(!isDeclared)}/>
                        <p className="opacity-50" >I agree to universe Terms and Conditions.</p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button type="submit" className="px-3 py-1 rounded-md  text-white  bg-amber-400" disabled={isLoading}>{isLoading ? (<Loader className='animate-spin'/> ) : "Register"}</button>
                        <p>or</p>
                        <Link href="/signin" className="font-bold">Login</Link>
                    </div>
                    
                </form>
            </div>
        </div>
        
    </section>
  )
}

export default page

