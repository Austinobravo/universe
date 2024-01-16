import axios from "axios"



export const getExistingEmail = async (value:string) => {
    const users = await getUsers()
    const existingEmail = users.data.find((each:any)=> each.email === value)
    return !(!!existingEmail)
}
export const getUsers = async () => {
    const apiCall = await axios.get("/api/users")
    return apiCall
}
export const getInvestments = async () => {
    const apiCall = await axios.get("/api/investment")
    return apiCall
}
export const getDeposits = async () => {
    const apiCall = await axios.get("/api/deposits")
    return apiCall
}
export const getInvidualDeposits = async (id:any) => {
    const apiCall = await axios.get(`/api/deposits/${id}`)
    return apiCall
}
export const getPaymentDetails = async () => {
    const apiCall = await axios.get(`/api/payment`)
    return apiCall
}
export const getAllWithdrawalDetails = async () => {
    const apiCall = await axios.get(`/api/withdrawal`)
    return apiCall
}
export const getWithdrawalDetails = async (id: any) => {
    const apiCall = await axios.get(`/api/withdrawal/${id}`)
    return apiCall
}
export const getBalanceDetails = async () => {
    const apiCall = await axios.get(`/api/balance`)
    return apiCall
}






