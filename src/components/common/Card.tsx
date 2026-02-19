import React from 'react';

export const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`
      relative
      bg-white
      rounded-4xl /* Sudut lebih bulat */
      p-8 md:p-10     /* Padding lebih lega di desktop */
      w-full max-w-md md:max-w-2xl mx-4
      
      /* Efek Bayangan Berlapis yang Premium */
      shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] /* Bayangan hitam halus untuk kedalaman */
      shadow-indigo-500/20                       /* Glow warna indigo di sekelilingnya */
      
      /* Border super tipis untuk definisi */
      ring-1 ring-gray-100/50

      animate-fade-in
      ${className}
    `}>
      {children}
    </div>
  );
};