"use client"

import { signOut, useSession } from "next-auth/react"
import { config } from "process"
import { useEffect } from "react"
import { axiosAuth } from "../axiosConfig"
import { useRefreshtoken } from "./useRefreshToken"


const useAxiosAuth = () => {
    const {data:session} = useSession()
    const refreshToken = useRefreshtoken()

    const token = session?.tokens.accessToken

    useEffect(() => {
      const requestInterceptor = axiosAuth.interceptors.request.use((config) => {
        if(!config.headers.Authorization){
            config.headers.Authorization = `Bearer ${session?.tokens.accessToken}`
        }
        return config
      },(error) => Promise.reject(error))

      const responseInterceptor = axiosAuth.interceptors.response.use((response) => (response),
      async(error) =>{
        const prevRequest = error.config
        if(error.response.status === 401 && !prevRequest.sent){
          prevRequest.sent = true
          await refreshToken()
          prevRequest.headers.Authorization = `Bearer ${session?.tokens.accessToken}`
          return axiosAuth(prevRequest)
        }
      return Promise.reject(error)
      })
      
      return () => {
          axiosAuth.interceptors.request.eject(requestInterceptor)
          axiosAuth.interceptors.response.eject(responseInterceptor)
      }
      
      
    }, [session])
    
    return axiosAuth
}

export default useAxiosAuth