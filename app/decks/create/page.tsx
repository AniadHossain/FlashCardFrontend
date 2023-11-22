import CreateDeckForm from "./components/CreateDeckForm";


export default async function page() {  
    return (
            <div className="flex flex-col justify-center py-15">
              <div className="sm: max-auto sm:w-full sm:max-w-mid my-10">
                    <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-slate-200">
                        Create Flashcard
                    </h2>
                    <CreateDeckForm/>
            
                </div>
            </div>
      )
}