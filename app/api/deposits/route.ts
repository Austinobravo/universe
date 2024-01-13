import { NextResponse } from 'next/server';
import  dbConfig  from '@/lib/dbConfig';

export async function GET(){
    try{
        const deposits = await dbConfig.deposits.findMany({
            orderBy:{
              createdAt: "asc"
            }
          })    
        return NextResponse.json(deposits)
    }catch(error){
        return NextResponse.error()
    }
}


export const PATCH = async (req: Request) => {
    const body = await req.json()
    const {id,min,name,userId} = body
    

    try{
        
        const deposit = await dbConfig.deposits.update({
            where:{
                id:id,
                userId:userId,
                name:name,
                amount:min
            },
            data:{
                approved:true

            }
        })
        return NextResponse.json(deposit, {status:200})
        

    }catch(error){
        console.log("error", error)
        return  NextResponse.error()
    }

}