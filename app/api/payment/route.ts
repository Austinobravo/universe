import { NextResponse } from 'next/server';
import dbConfig from "@/lib/dbConfig"
import { getCurrentUser } from '@/lib/session';

export const GET = async () => {
    const user = await getCurrentUser()
  
    try{
        const deposits =  await dbConfig.payment.findMany({
            where:{
              userId:user?.id
            }
          })
          
          return NextResponse.json(deposits)

    }catch{
        return NextResponse.error()
    }
}
 export async function POST(req: Request){
    const body = await req.json()
    const {type, account, userId} = body


    try{
 
        const paymentAdded = await dbConfig.payment.upsert({
            where:{
                userId: userId
            },
            create:{
                type:type,
                account:account,
                userId:userId
            },
            update:{
                type:type,
                account:account,

            }
        })
        const {id, userId:any, ...AccountAndType} = paymentAdded
        console.log("log", AccountAndType)
        return NextResponse.json(AccountAndType)
    }catch(error){
        console.log("error", error)
        return NextResponse.error()
    }
 }