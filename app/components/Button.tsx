'use client';

import clsx from 'clsx';

interface ButtonProps{
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}


const Button: React.FC<ButtonProps> = ({type, fullWidth, children, onClick, secondary,danger,disabled}) => {
  return (
    <button 
    onClick={onClick} 
    type={type} 
    disabled={disabled} 
    className={clsx("flex justify-center rounded-lg px-4 py-1 text-sm",
    disabled && "opacity-30",
    fullWidth && "w-full",
    secondary ? 'text-gray-900' : 'text-white',
    danger && "bg-rose-600 hover:bg-rose-700",
    !secondary && !danger && "bg-sky-600 hover:bg-sky-700" 
    )}>
        {children}

    </button>
  )
}

export default Button
