import getSession from "./getSession";
import api from "@/app/api/axiosConfig";


const getFlashcards = async (deckId : string) => {
    const session = await getSession()
    
    try{
        const flashcards = (await api.get("api/v1/flashcard/flashcards/"+deckId,
        {headers:
            {Authorization:"Bearer "+session?.tokens.accessToken}
        })).data
        return flashcards
    }
    catch(error:any){
        return []
    }

}

export default getFlashcards