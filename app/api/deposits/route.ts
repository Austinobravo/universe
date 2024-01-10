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

export const POST = async (req: Request) => {
    const body = await req.json()
    const {min,name,userId} = body
    console.log("id", userId)
    
    const user = await dbConfig.deposits.findMany({
        where:{
            userId:userId,
            
        }
    })
    console.log("user", user)
    

    if(user.length >=1 || user[0].amount === min ) return new NextResponse("You've made this deposit", {status:400})
    try{
        console.log("in")
        const deposit = await dbConfig.deposits.create({
            data:{
                name: name,
                amount:min,
                userId:userId,
                approved:false

            }
        })
        console.log("dep", deposit)
        return NextResponse.json(deposit)
        

    }catch(error){
        console.log("error", error)
        return  NextResponse.error()
    }

}
export const PATCH = async (req: Request) => {
    const body = await req.json()
    const {id,min,name,userId} = body
    

    try{
        console.log("in")
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