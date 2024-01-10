import axios from "axios"
import dbConfig from "./dbConfig"

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






