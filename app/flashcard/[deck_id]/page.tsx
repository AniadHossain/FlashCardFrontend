import getFlashcards from "@/app/actions/getFlashcards"
import CardsList from "./components/CardsList"


export default async function page({params}: {params: {deck_id: string}}) {
    const flashcards = await getFlashcards(params.deck_id)
    let index = 0
    
    return (
        <div className="min-h-full flex flex-col">
              <div className="mx-5">
                    <div className="py-5 ">
                        <CardsList items={flashcards}/>
                    </div>
                </div>
            </div>
    )
}