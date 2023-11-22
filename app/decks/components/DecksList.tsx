"use client";

import { useRouter } from "next/navigation";
import DeckBox from "./DeckBox";

interface DeckListProps {
  items: any[]
};

const DeckList : React.FC<DeckListProps>= ({items}) => {
  
  const router = useRouter()

  const handleClick = () => {
    router.push(`/decks/create`);
  }
  
  
  return (
    <aside className = "fixed inset-y-0 pb-20 overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col mt-10">
          <div className= "flex">
            <div className="text-2xl font-bold text-slate-400 py-4 mt-10">
              Decks
            </div>
            <div className="flex-grow"></div>
            <div className="text-s font-bold text-slate-400 bg-blue-900 p-3 hover:bg-blue-700 rounded-lg cursor-pointer mt-10" onClick={handleClick}>
              Create Deck
            </div>
          </div>  
        </div>
        {items.map((item) => (
          <DeckBox key={item.id} data={item}/>
        ))}

      </div>

    </aside>
  )
}

export default DeckList
