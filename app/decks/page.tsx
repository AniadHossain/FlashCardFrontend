import getDecks from "../actions/getDecks"
import DeckList from "./components/DecksList"

export default async function page () {
    const decks = await getDecks()
    return ( 
      <div>
        <DeckList items={decks}/>
      </div>
    )
}

