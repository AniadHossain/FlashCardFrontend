"use client"

import { useCallback, useState } from "react";


interface Card{
    question:string;
    answer:string;
}

type Variant = 'QUESTION' | 'ANSWER'

const Card: React.FC<Card> = ({question,answer}) => {
    
    const [variant,setVariant] = useState<Variant>('QUESTION')

    const toggleVariant = useCallback(() => {
        if(variant === 'QUESTION'){
            setVariant('ANSWER')
        }
        else{
            setVariant('QUESTION')
        }
    },[variant])

    
    return(
        <div className="h-full overflow-hidden">
            <div className="flex justify-center items-center text-2xl h-72 font-bold text-slate-400 shadow px-11 rounded-3xl bg-slate-800 overflow-y-scroll">
                    {variant === 'QUESTION' ? question : answer}
            </div>
            <button className="w-full py-5 text-slate-400 bg-gray-700 hover:bg-gray-600 mt-5 text-center gap-2 rounded-xl cursor-pointer" onClick={toggleVariant}>
            {variant === 'QUESTION' ? "answer" : "question"}
            </button>
        </div>
    )
}

export default Card
