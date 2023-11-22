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
            <div className="py-1 mx-auto w-48 text-slate-400 bg-blue-800 hover:bg-blue-700 mt-2 text-center gap-2 rounded-lg cursor-pointer" onClick={toggleVariant}>
                Flip
            </div>
        </div>
    )
}

export default Card
