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
    <aside>
      <div className="px-5">
        <div className="flex-col">
          <div className= "flex">
            <button className="text-2xl font-bold text-slate-400 py-4">
              Decks
            </button>
            <div className="flex-grow"></div>
            <button className="text-s h-10 mt-3 mr-1 font-bold text-slate-400 bg-blue-900  hover:bg-blue-700 rounded-lg cursor-pointer" onClick={handleClick}>
              Create Deck
            </button>
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
