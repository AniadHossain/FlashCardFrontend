"use client"
import { useCallback, useState } from "react";
import Card from "./card";
import useAxiosAuth from "@/app/api/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


interface CardsList{
    items: any[]
}

const CardsList: React.FC<CardsList> = ({items}) => {
    const [index,setIndex] = useState<number>(0)
    const axiosAuth = useAxiosAuth()
    const router = useRouter()
    const [isLoading,setLoading ]= useState(false);
    


    const handleNext = useCallback(() => {
        setIndex((index + 1) % items.length)
    },[index,items])

    const handlePrev = useCallback(() => {
        setIndex((index - 1 + items.length) % items.length)
    },[index,items])

    const handleDelete = () => {
        setLoading(true);
        axiosAuth.delete(`api/v1/flashcard/delete/${items[index].id}`)
        .then((response)=>{
            if(response?.status === 200){
                toast.success("Card deleted")
                router.refresh()
                setIndex(0)
            }
            else{
                toast.error("Error deleting Card")
            }
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Error deleting Card")
        
        }
        )
        .finally(() => setLoading(false))
    }

    const handleEdit = () => {
        router.push(`/flashcard/update/${items[index].id}`)
    }
    
    return(
        <div className="flex flex-col gap-2">
               
            { items.length > 0 ?
                <div className="flex flex-col gap-5">  
                    <div className="flex ml-auto gap-3">   
                        <button className="text-s  px-7 font-bold text-slate-400 bg-blue-900 p-3 hover:bg-blue-700 rounded-xl cursor-pointer" disabled = {isLoading} onClick={handleEdit}>
                            Edit
                        </button>
                        <button className="text-s  px-7 font-bold text-slate-400 bg-rose-900 p-3 hover:bg-rose-700 rounded-xl cursor-pointer" disabled = {isLoading} onClick={handleDelete}>
                            Delete
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex justify-center items-center cursor-pointer bg-gray-700 hover:bg-gray-600 text-stone-50 rounded-3xl w-16 h-72" onClick={handlePrev} disabled = {isLoading}>
                            Prev
                        </button>
                        <div className="flex-grow">
                            <Card question={items[index].question} answer={items[index].answer}/>
                        </div>
                        <button className="flex justify-center items-center cursor-pointer bg-gray-700 hover:bg-gray-600 text-stone-50 rounded-3xl w-16 h-72" onClick={handleNext} disabled = {isLoading}>
                            Next
                        </button>
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