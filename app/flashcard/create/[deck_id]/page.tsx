import FlashcardForm from "./components/flashcardForm";

export default async function page({params}: {params: {deck_id: string}}) {  
    return (
            <div className="flex flex-col justify-center py-15">
              <div className="sm: max-auto sm:w-full sm:max-w-mid my-10">
                    <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-slate-200">
                        Create Flashcard
                    </h2>
                    <FlashcardForm deckId={params.deck_id} variant={'create'}/>
            
                </div>
            </div>
      )
}