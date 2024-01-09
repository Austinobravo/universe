import axios from "axios"

export const getUsers = async () => {
    const apiCall = await axios.get("/api/users")
    return apiCall
}
export const getInvestments = async () => {
    const apiCall = await axios.get("/api/investment")
    return apiCall
}

