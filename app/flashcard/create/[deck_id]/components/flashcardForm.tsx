'use client';

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

interface FlashcardFormProps{
    deckId:string;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({deckId}) => {
    const [isLoading,setLoading] = useState(false)
    const axiosAuth = useAxiosAuth()

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            question:'',
            answer:''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        //re render page
        
    
        axiosAuth.post("api/v1/flashcard/create/"+deckId,data)
        .then((response)=>{
            if(response?.status === 200){
                toast.success("Flashcard created")
            }
            else{
                toast.error("Error creating flashcard")
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
                    
                    <TextAreaField id="question" label="Question" register={register} errors={errors} disabled={isLoading} type="text-field"/>
                    <TextAreaField id="answer" label='Answer' register={register} errors={errors} disabled={isLoading} />
                    

                    <div>
                        <Button disabled={isLoading} fullWidth type="submit"> Create Flashcard</Button>
                    </div>   
                </form>
                
                
    
            </div>
            
        </div>
      )
}


export default FlashcardForm;
