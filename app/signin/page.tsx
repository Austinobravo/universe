"use client"
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signIn, useSession, signOut, getSession } from 'next-auth/react'
import { Loader, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'

const formSchema = z.object({
    email: z.string().email("This field must be an email."),
    password: z.string().min(6, "This field must have at least 6 characters.")
})

const page = () => {
    const router = useRouter()
    const {register, formState:{isValid, errors}, } = useForm({mode: "all", resolver: zodResolver(formSchema)})
    const [isLoading, setIsLoading] = React.useState(false)
    const [isRememberMeClicked, setIsRememberMeClicked] = React.useState(false)
    const {data:session, status} = useSession()
    console.log("status", status)
    console.log("session", session)
    // if (typeof window !== "undefined"){
    //     const url = window.location.href
    //     console.log("url",url)
    // }

    const [user , setUser] = React.useState({
        email: "",
        password: ""
    })
    const [error, setError] = React.useState("")

    
    const Login = async (e:any) => {
        e.preventDefault()
        
       
            try{
                setIsLoading(true)
                // if (isRememberMeClicked){
                //     document.cookie = ("email=" + user.email + `;path=${url}`)
                //     document.cookie = ("password=" + user.password + `;path=${url}`)
                // }
                const data = await signIn('credentials', {
                    email: user.email,
                    password: user.password,
                    redirect: false,
                    
                })
                console.log("data", data)
    
                if(data?.error) setError(data.error); else setError("")
    
                // Wait for the session to be updated
                await getSession();
    
                // Access the updated session and check user role
                const updatedSession = await getSession();
                if (data?.status === 200 && updatedSession?.user?.role === "Admin") {
                    return router.push("/dashboard");
                } else if (data?.status === 200 && updatedSession?.user?.role === "User") {
                    return router.push("/user_dashboard");
                }
    
            }catch(error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }

    }


    
    

    const onChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target
        setUser({...user, [name]:value})
        
    }
    
    const logOut = async () => {
        const SignOut = await signOut({redirect:false})
        if(SignOut.url) router.push("/signin")
    }
    
    const fetchCookie = (cookieName:any) => {
        const name = cookieName + "="
        const decodedCookie = decodeURIComponent(document.cookie)
        const separateCookie = decodedCookie.split(";")
        for (let char of separateCookie){
            while (char.charAt(0) === ""){
                char = char.substring(1)
            }
            if (char.indexOf(name) === 0){
                return char.substring(name.length, char.length)
            }
        }
        return ""
    
    }
    
    if(session?.user){
        return(
            <div className='flex flex-col items-center  space-y-2 py-5'>
                <p className='text-center text-2xl'>You are signed in</p>
                <button className={` px-3 py-1 rounded-md w-fit text-white  bg-amber-400`} onClick={logOut}>Logout</button>
            </div>  

        )
    }

    React.useEffect(()=> {
        if(typeof window !== "undefined"){
            const fetchCookieData = () => {
                const Cookieemail = fetchCookie("email")
                const Cookiepassword = fetchCookie("password")
                // Cookieemail ? user.email =  Cookieemail : ""
                // user.password = Cookiepassword ? Cookiepassword : ""
                // console.log(document.cookie = ("email=" + user.email + `;path=${url}`),document.cookie = ("password=" + user.password + `;path=${url}`), document.cookie)


            }
            fetchCookieData()
        }
    })


  return (
    <section >
        {status === "unauthenticated" && (
            <div className='flex   h-[600px] w-full'>
                <div className='dark:bg-gradient-to-tl bg-black from-purple-800 to-blue-800 md:basis-2/3 py-10 justify-between flex-col md:flex hidden  md:pl-10'>
                    <div className='space-y-7 '>
                        <h2 className='text-3xl  border-b-2 w-fit text-amber-400 border-amber-400'>Login</h2>
                        <p className='dark:opacity-50 text-white'>Signin and explore the universe investment.</p>
                    </div>
                    <div>
                        <Image src="/home/logo-no-background.png" width={300} height={100} alt="logo"/>
                    </div>

                </div>
                <div className='md:py-40 py-16 px-10 w-full '>
                    <form className='space-y-5' onSubmit={(e) => Login(e)}>
                        <div>
                            <h1 className='text-2xl pb-2 opacity-80'>Enter your email and password</h1>
                        </div>
                        {error &&
                            <div className='text-center bg-red-500 py-2 rounded-md shadow-md'>
                                <span className='text-white w-full'>{error}</span>
                            </div>
                        }
                        
                        <div>
                            <label htmlFor='email'></label>
                            <input type='email' {...register("email")} onChange={(e) => onChange(e)} value={user.email} id='email' name='email' placeholder="Email" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                            <span className="text-red-500">
                                <ErrorMessage name="email" errors={errors} />
                            </span>
                        </div>
                        <div>
                            <label htmlFor='password'></label>
                            <input type='password' {...register("password")} onChange={(e) => onChange(e)} value={user.password} id='password' name='password' placeholder="Password" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' minLength={6} required/>
                            
                            <span className="text-red-500">
                                <ErrorMessage name="password" errors={errors} />
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <label htmlFor='agreement'></label>
                            <input type='checkbox' id='remember' name='remember' className="cursor-pointer"  onClick={()=>setIsRememberMeClicked(!isRememberMeClicked)}/>
                            <p className="opacity-50">Remember me</p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button type="submit" className={` px-3 py-1 rounded-md flex text-white  bg-amber-400`} disabled={isLoading}>{isLoading ? (<><Loader className='animate-spin'/> Login</>  ) : "Login"}</button>
                            <p>or</p>
                            <Link href="/signup" className="font-bold">Create Account</Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
        }

        {status === "loading" && (
            <div className='flex flex-col items-center  space-y-2 py-5'>
                    <p className='text-center text-2xl'><Loader2 className='animate-spin' size={60}/></p>
                   
            </div>  
        )}

        {/* {status === "authenticated" && (
            <div className='flex flex-col items-center  space-y-2 py-5'>
                <p className='text-center text-2xl'>You are signed in</p>
                <button className={` px-3 py-1 rounded-md w-fit text-white  bg-amber-400`} onClick={logOut}>Logout</button>
            </div>  
        )} */}
        
    </section>
  )
}

export default page