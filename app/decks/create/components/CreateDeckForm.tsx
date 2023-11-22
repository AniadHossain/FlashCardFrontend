"use client"

import Button from "@/app/components/Button";
import InputField from "@/app/components/inputs/InputField";
import { use, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"; 
import { convertToObject } from "typescript";
import {toast} from "react-hot-toast"
import {getSession, signIn, useSession} from "next-auth/react"
import { useRouter } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import TextAreaField from "@/app/components/inputs/TextAreaField";
import { headers } from "next/dist/client/components/headers";
import createFlashcard from "@/app/actions/createFlashcard";
import getDecks from "@/app/actions/getDecks";
import useAxiosAuth from "@/app/api/hooks/useAxiosAuth";


const CreateDeckForm = () => {
    const [isLoading,setLoading] = useState(false)
    const axiosAuth = useAxiosAuth()
    const session = useSession()
    const user =  session?.data?.user
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        //re render page
        
    
        axiosAuth.post("api/v1/deck/create/"+user?.id,data)
        .then((response)=>{
            if(response?.status === 200){
                toast.success("Deck created")
                router.refresh()
                router.push("/decks")
            }
            else{
                toast.error("Error creating Deck")
            }
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Error creating flashcard")
        
        })
        .finally(() => setLoading(false))
        
    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md ">
            <div className="px-3 py-8 shadow sm:px-10 sm:rounded-lg bg-slate-800">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    
                    <InputField id="name" label="Name" register={register} errors={errors} disabled={isLoading}/>
                      
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit"> Create Deck</Button>
                    </div>   
                </form>
                
                
    
            </div>
            
        </div>
      )
}


export default CreateDeckForm;
