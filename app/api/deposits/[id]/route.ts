import dbConfig from "@/lib/dbConfig"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"

export const GET = async ({params}: {params:{id: any}}) => {
    const user = await getCurrentUser()
  
    try{
        const deposits =  await dbConfig.deposits.findMany({
            where:{
              userId:user?.id
            }
          })
          
          return NextResponse.json(deposits)

    }catch{
        return NextResponse.error()
    }
}

export const POST = async (req: Request) => {
    const body = await req.json()
    const {min,name,userId} = body
    const user = await dbConfig.deposits.findMany({
        where:{
            userId:userId,
            name:name
            
        }
    })

    if(user.length >=1 ) return new NextResponse("You've made this deposit", {status:400})
    try{
      
        const deposit = await dbConfig.deposits.create({
            data:{
                name: name,
                amount:min,
                userId:userId,
                approved:false

            }
        })

        return NextResponse.json(deposit)
        

    }catch(error){
        console.log("error", error)
        return  NextResponse.error()
    }

}