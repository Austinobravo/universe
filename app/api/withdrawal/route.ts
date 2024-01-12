import { getCurrentUser } from '@/lib/session';
import  dbConfig  from '@/lib/dbConfig';
import { NextResponse } from 'next/server';

export async function GET(){
    const user = await getCurrentUser()
    try{
        const data = await dbConfig.withdrawals.findMany({
            where:{
                userId:user?.id
        }
        })
        return NextResponse.json(data)
    }catch(error){
        return NextResponse.error()
    }
}

export async function POST(req:Request){
    const body = await req.json()

    const {userId, amount, existingAmount} = body
    console.log("body", body)

    const user = await dbConfig.deposits.findMany({
        where: {
            userId:userId,
            approved: true
        }
    }) 
    console.log("user", user)
    if (!user) return new NextResponse("This user has no approved funds", {status: 401})
    
    // if(user?.amount  existingAmount) return new NextResponse("")
    try{

        const data = await dbConfig.withdrawals.create({
            data:{
                userId: userId,
                amount: amount,
                approved:false
            }
        })
        return NextResponse.json(data)
        

    }catch(error){
        return NextResponse.error()
    }

}