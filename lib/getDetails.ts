import axios from "axios"

export const getExistingEmail = async (value:string) => {
    const users = await getUsers()
    const existingEmail = users.data.find((each:any)=> each.email === value)
    console.log("exis", existingEmail)
    return existingEmail
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
export const getInvidualDeposits = async () => {
    const apiCall = await axios.get("/api/individualDeposits")
    return apiCall
}






