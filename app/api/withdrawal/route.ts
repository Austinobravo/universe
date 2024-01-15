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
        
        await dbConfig.$transaction(async (prisma) => {
            // Create a new withdrawal
            const withdrawalData = {
              userId: userId,
              amount: amount,
              approved: false,
            };
      
            const newWithdrawal = await prisma.withdrawals.create({ data: withdrawalData });
      
            // Create a new balance
            const balanceData = {
              userId: userId,
              totalDeposits: existingDepositAmount,
              totalWithdrawals: existingWithdrawalAmount,
              totalBalance: newBalance,
              withdrawalId: newWithdrawal.id, // Link the balance to the new withdrawal
            };
      
            await prisma.balance.create({ data: balanceData });
          });
      



        return NextResponse.json(newBalance)
        

    }catch(error){
        return NextResponse.error()
    }

}