import { getCurrentUser } from '@/lib/session';
import  dbConfig  from '@/lib/dbConfig';
import { NextResponse } from 'next/server';

export async function GET(){
    const user = await getCurrentUser()
    try{
        const data = await dbConfig.balance.findMany({
            where:{
                userId:user?.id
        }
        })
        return NextResponse.json(data)
    }catch(error){
        return NextResponse.error()
    }
}

export async function PATCH(req:Request){
    const body = await req.json()

    const {userId, id} = body
    
    try{
        const data = await dbConfig.withdrawals.update({
            where:{
                id: id,
                userId: userId,
            },
            data:{   
                approved:true
            }
        })


        return NextResponse.json(data)
        

    }catch(error){
        return NextResponse.json({message: "error", error}, {status:500})
    }
}