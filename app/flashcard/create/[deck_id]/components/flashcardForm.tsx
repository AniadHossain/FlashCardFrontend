'use client';

import Button from "@/app/components/Button";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"; 
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import TextAreaField from "@/app/components/inputs/TextAreaField";
import useAxiosAuth from "@/app/api/hooks/useAxiosAuth";

type variant = 'create' | 'update'

interface FlashcardFormProps{
    deckId:string;
    variant: variant;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({deckId,variant}) => {
    const [isLoading,setLoading] = useState(false)
    const axiosAuth = useAxiosAuth()
    const router = useRouter()

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
        
        if(variant === 'create'){
            axiosAuth.post(`api/v1/flashcard/${variant}/${deckId}`,data)
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
        
        }
        else{
            axiosAuth.put(`api/v1/flashcard/${variant}/${deckId}`,data)
            .then((response)=>{
                if(response?.status === 200){
                    toast.success("Flashcard updated")
                    router.refresh()
                    router.back()
                }
                else{
                    toast.error("Error updating flashcard")
                }
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Error updating flashcard")
            
            })
            .finally(() => setLoading(false))
        }
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md ">
            <div className="px-3 py-8 shadow sm:px-10 sm:rounded-lg bg-slate-800">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    
                    <TextAreaField id="question" label="Question" register={register} errors={errors} disabled={isLoading} type="text-field"/>
                    <TextAreaField id="answer" label='Answer' register={register} errors={errors} disabled={isLoading} />
                    
                    {variant === 'create' ? 
                        <div>
                            <Button disabled={isLoading} fullWidth type="submit"> Create Flashcard</Button>
                        </div>:
                        <div>
                            <Button disabled={isLoading} fullWidth type="submit"> Update Flashcard</Button>
                        </div>
                }
                     
                </form>
                
                
    
            </div>
            
        </div>
      )
}


export default FlashcardForm;
