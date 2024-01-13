import { getCurrentUser } from '@/lib/session';
import  dbConfig  from '@/lib/dbConfig';
import { NextResponse } from 'next/server';

export async function GET(){
    
    try{
        const data = await dbConfig.withdrawals.findMany({
            orderBy:{
                createdAt: "asc"
              }
        })
        return NextResponse.json(data)
    }catch(error){
        return NextResponse.error()
    }
}

export async function POST(req:Request){
    const body = await req.json()

    const {userId, amount, existingDepositAmount, existingWithdrawalAmount} = body

    const newBalance = existingDepositAmount - amount

    
    try{
        await dbConfig.withdrawals.create({
            data:{
                userId: userId,
                amount: amount,
                approved:false
            }
        })
        await dbConfig.balance.create({
            data:{
                userId: userId,
                totalDeposits: existingDepositAmount,
                totalWithdrawals: existingWithdrawalAmount,
                totalBalance:newBalance,
                
            }
        })



        return NextResponse.json(newBalance)
        

    }catch(error){
        return NextResponse.error()
    }

}