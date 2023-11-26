"use client"

import Button from "@/app/components/Button";
import InputField from "@/app/components/inputs/InputField";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"; 
import {toast} from "react-hot-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
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
            console.log(response?.status)
            if(response?.status === 200){
                toast.success("Deck created")
                router.refresh()
                router.push("/decks")
            }
        })
        .catch((error)=>{
            console.log(error.response.status)
            if(error.response.status === 401){
                toast.error("Session expired")
            }
            else if(error.response.status === 400){
                toast.error(error.response.data.message)
            }
        
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
