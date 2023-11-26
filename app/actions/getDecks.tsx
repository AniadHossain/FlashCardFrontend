import getSession from "./getSession";
import api from "@/app/api/axiosConfig";


const getDecks = async () => {
    const session = await getSession()
    if(!session?.user?.email){
        return []
    }

    try{
        const decks = (await api.get("api/v1/deck/decks/"+session.user.id,
        {headers:
            {Authorization:"Bearer "+session.tokens.accessToken}
        })).data
        return decks
    }
    catch(error:any){
        return []
    }

}

export default getDecks