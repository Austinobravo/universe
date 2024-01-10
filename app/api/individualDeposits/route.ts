import dbConfig from "@/lib/dbConfig"
import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server"

export const GET = async () => {
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