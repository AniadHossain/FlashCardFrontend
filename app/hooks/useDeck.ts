import {useParams} from "next/navigation"
import {useMemo} from "react"



const useDeck = () => {
  const params = useParams();
  const deckId = useMemo(() => {
    if(!params?.deckId){
        return '';
    }

    return params.deckId as string
  },[params?.deckId])

  const isOpen = useMemo(() => !!deckId,[deckId])

  return useMemo(()=>({
    isOpen,
    deckId
  }),[isOpen,deckId])
}

export default useDeck
