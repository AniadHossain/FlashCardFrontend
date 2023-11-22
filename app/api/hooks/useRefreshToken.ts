"use client"

import { useSession } from "next-auth/react"
import api from "@/app/api/axiosConfig";


export const useRefreshtoken = () => {
    const {data:session} = useSession()
    
    const refreshToken = async () => {
        const res = await api.post("api/v1/auth/refresh-token",{},{headers:{Authorization:"Bearer " + session?.tokens.refreshToken}})
        
        if(session) session.tokens.accessToken = res.data.accessToken
    }

    return refreshToken
}