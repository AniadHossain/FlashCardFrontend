import getDecks from "../actions/getDecks"
import EmptyState from "../components/EmptyState"
import DeckList from "./components/DecksList"

export default async function page () {
    const decks = await getDecks()
    return ( 
      <div className="flex flex-col justify-center py-15">
        <DeckList items={decks}/>
      </div>
    )
}

