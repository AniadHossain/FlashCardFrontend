'use client';


import useAxiosAuth from "@/app/api/hooks/useAxiosAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface DeckBoxProps {
    data:any
}

const DeckBox: React.FC<DeckBoxProps> = ({data}) => {
    const router = useRouter();
    const axiosAuth = useAxiosAuth()
    const [isLoading,setLoading ]= useState(false);
    const handleClick = useCallback(()=>{
        router.refresh()
        router.push(`/flashcard/${data.id}`)

    },[data,router])

    const handleAdd = ()  => {
        router.push(`/flashcard/create/${data.id}`)
    }

    const handleDelete = () => {
        setLoading(true);
        axiosAuth.delete(`api/v1/deck/delete/${data.id}`)
        .then((response)=>{
            if(response?.status === 200){
                toast.success("Deck deleted")
                router.refresh()
            }
            else{
                toast.error("Error deleting Deck")
            }
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Error deleting Deck")
        
        })
        .finally(() => setLoading(false))
    }
  
    return (
    <div className="flex">
        <div onClick={handleClick}
        className="w-4/5 relative flex items-center space-x-3 bg-blue-900 p-3 hover:bg-blue-700 rounded-lg transition cursor-pointer mt-5">
            <div className="min-w-0 flex-1">
                    <div className="flex justify-left items-center mb-1">
                        <p className="text-sm font-bold text-slate-400">
                            {data.name}
                        </p>
                    </div>
            </div>
        </div>
        <div onClick={handleAdd}
        className="ml-2 w-auto relative flex items-center space-x-3 bg-blue-900 p-3 hover:bg-blue-700 rounded-lg transition cursor-pointer mt-5">
            <div className="min-w-0 flex-1">
                    <div className="flex justify-left items-center mb-1">
                        <p className="text-sm font-bold text-slate-400">
                            Add
                        </p>
                    </div>
            </div>
        </div>
        <div onClick={handleDelete}
        className="ml-2 w-auto relative flex items-center space-x-3 bg-rose-900 p-3 hover:bg-rose-700 rounded-lg transition cursor-pointer mt-5">
            <div className="min-w-0 flex-1">
                    <div className="flex justify-left items-center mb-1">
                        <p className="text-sm font-bold text-slate-400">
                            Delete
                        </p>
                    </div>
            </div>
        </div>
        
    
    </div>

    
  )
}

export default DeckBox
