'use client';

import Button from "@/app/components/Button";
import InputField from "@/app/components/inputs/InputField";
import { use, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"; 
import api from "@/app/api/axiosConfig";
import { convertToObject } from "typescript";
import {toast} from "react-hot-toast"
import {signIn, useSession} from "next-auth/react"
import { useRouter } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";


type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    
    const router = useRouter()
    const [variant,setVariant] = useState<Variant>('LOGIN')
    const [isLoading,setLoading] = useState(false)

    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/decks')
        }
    },[session,router])

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }
        else{
            setVariant('LOGIN')
        }
    },[variant])

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })

    const login = (data: FieldValues) => {
        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((response) => {
                if (response?.ok) {
                    router.push('/decks');
                    toast.success('Logged in');
                }
            })
            .catch((error) => {
                if (error.status === 409) {
                    console.log(error);
                    toast.error('Invalid credentials');
                } else {
                    toast.error('Something went wrong');
                }
            })
            .finally(() => setLoading(false));
    };

    const signUp = (data: FieldValues) => {
        api
            .post('/api/v1/auth/register', data)
            .then(() =>
                signIn('credentials', {
                    ...data,
                    redirect: false,
                })
            )
            .then((response) => {
                if (response?.ok) {
                    router.push('/users');
                    toast.success('Logged in');
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.status === 409) {
                    toast.error('Email already exists');
                } else {
                    toast.error('Somthing went wrong');
                }
            })
            .finally(() => setLoading(false));
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);

        if (variant === 'REGISTER') {
            signUp(data);
        }
        if (variant === 'LOGIN') {
            login(data);
        }
    };


  
    return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-3 py-8 shadow sm:px-10 sm:rounded-lg bg-slate-800">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {variant === "REGISTER" &&(
                    <>
                        <InputField id="firstName" label='First Name' register={register} errors={errors} disabled={isLoading} />
                        <InputField id="lastName" label='Last Name' register={register} errors={errors} disabled={isLoading} />
                    </>
                )}
                <InputField id="email" label="Email" register={register} errors={errors} disabled={isLoading} type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                <InputField id="password" label='Password' register={register} errors={errors} disabled={isLoading} type="password"/>
                <div>
                    <Button disabled={isLoading} fullWidth type="submit"> {variant === "LOGIN" ? "Sign in" : "Register"} </Button>
                </div>   
            </form>
            
            <div className="mt-7 justify-center flex text-white text-xs gap-2">
                <div>
                    {variant === 'LOGIN' ? 'New to Chat App?' : 'Already have an account?'}
                </div>
                <div onClick={toggleVariant} className="underline cursor-pointer">
                    {variant == 'LOGIN' ? 'Create an account' : 'Log in'}
                </div>
            </div>

            

        </div>
        
    </div>
  )
}

export default AuthForm
