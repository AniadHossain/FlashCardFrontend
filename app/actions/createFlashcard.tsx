import getSession from "./getSession"
import api from "@/app/api/axiosConfig"

const createFlashcard = async (data: any) => {
    const session = await getSession()
    if(!session?.user?.email){
        return
    }
    try{
       await api.post("api/v1/flashcard/create/",data,
        {headers:
            {Authorization:"Bearer "+session.tokens.accessToken}
        })
        return
    }
    catch(error:any){
        return
    }
}

export default createFlashcard