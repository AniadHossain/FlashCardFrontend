import getFlashcards from "@/app/actions/getFlashcards"
import Card from "./components/card"
import CardsList from "./components/CardsList"


export default async function page({params}: {params: {deck_id: string}}) {
    const flashcards = await getFlashcards(params.deck_id)
    let index = 0
    
    return (
        <div className="min-h-full flex flex-col justify-center h-full">
              <div className="mt-20 mx-20">
                    <div className="py-5 ">
                        {/* <Card question="What is the capital of France?" answer="Paris"/> */}
                        <CardsList items={flashcards}/>
                    </div>
                    
                </div>
            </div>
    )
}