'use client'

import clsx from 'clsx'
import {FieldValues, FieldErrors, UseFormRegister} from 'react-hook-form'


interface TextAreaProps {
        label:string;
        id:string;
        type?:string;
        required?:boolean;
        register: UseFormRegister<FieldValues>;
        errors: FieldErrors;
        disabled?:boolean;

}

const TextAreaField: React.FC<TextAreaProps> = ({label,id,type,required,register,errors,disabled}) => {
    return (
        <div>
            <label htmlFor='id' className='block text-base font-medium text-white'> 
                {label}
            </label>

            <div className='mt-3'> 
                <textarea id={id} 
                autoComplete={id} 
                disabled={disabled} 
                {...register(id,{required})} 
                className={clsx("form-input block w-full rounded-md border-0 py-1.2 ring-1 ring-inset ring-gray-400 text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-sky-500 ",
                errors[id] && "focus:ring-rose-600",
                disabled && "opacity-50 cursor-default" 
                )}
                
                />
            </div>

        </div>
    )
}

export default TextAreaField
