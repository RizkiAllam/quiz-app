import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
}

export const Button = ({ variant = 'primary', className = "", ...props }: ButtonProps) => {
  // Base Style: Transisi halus, rounded pill shape
  const baseStyle = "w-full py-3.5 px-6 rounded-xl font-bold tracking-wide transition-all duration-300 transform active:scale-95 shadow-md flex justify-center items-center";
  
  const styles = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50",
    outline: "bg-white border-2 border-indigo-100 text-gray-700 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button className={`${baseStyle} ${styles[variant]} ${className}`} {...props} />
  );
};