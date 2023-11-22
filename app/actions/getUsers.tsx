import { headers } from "next/dist/client/components/headers";
import getSession from "./getSession";
import api from "@/app/api/axiosConfig";
import useAxiosAuth from "../api/hooks/useAxiosAuth";


const getUsers = async () => {
    const session = await getSession()
    const axiosAuth = useAxiosAuth()
    if(!session?.user?.email){
        return []
    }

    try{
        const users = (await axiosAuth.get("api/v1/user/users/"+session.user.email,)).data
        return users
    }
    catch(error:any){
        console.log(error)
        return []
    }

}

export default getUsers