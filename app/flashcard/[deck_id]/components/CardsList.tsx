"use client"
import { useCallback, useState } from "react";
import Card from "./card";

interface CardsList{
    items: any[]
}

const CardsList: React.FC<CardsList> = ({items}) => {
    const [index,setIndex] = useState<number>(0)
    const size = items.length

    


    const handleNext = useCallback(() => {
        setIndex((index + 1) % size)
    },[index])

    const handlePrev = useCallback(() => {
        setIndex((index - 1 + size) % size)
    },[index])
    
    return(
        <div className="flex flex-col">
                
            { size > 0 ?
                <div className="flex gap-2">
                <div className="flex justify-center items-center cursor-pointer bg-gray-700 hover:bg-gray-600 text-stone-50 rounded-3xl w-16 h-72" onClick={handlePrev}>
                    Prev
                </div>
                <div className="flex-grow">
                    <Card question={items[index].question} answer={items[index].answer}/>
                </div>
                <div className="flex justify-center items-center cursor-pointer bg-gray-700 hover:bg-gray-600 text-stone-50 rounded-3xl w-16 h-72" onClick={handleNext}>
                    Next
                </div>
            </div>:
            <div className="flex justify-center items-center text-2xl h-72 font-bold text-slate-400 shadow px-11 rounded-3xl bg-slate-800 overflow-y-scroll">
                No cards
            </div>
            }
            
        </div>
    )
}

export default CardsList