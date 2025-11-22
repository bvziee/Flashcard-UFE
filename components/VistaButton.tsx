import React from 'react';

interface VistaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'default';
  className?: string;
}

export const VistaButton: React.FC<VistaButtonProps> = ({ 
  children, 
  variant = 'default', 
  className = '', 
  disabled,
  ...props 
}) => {
  // Vista Button Style: Gradient, border, inner highlight
  const baseStyles = `
    relative px-6 py-1.5 rounded-sm font-sans text-[13px] leading-5
    border transition-all duration-100 active:translate-y-[1px]
    disabled:opacity-60 disabled:cursor-not-allowed disabled:saturate-0
  `;

  const defaultStyles = `
    text-slate-800
    bg-gradient-to-b from-[#f2f2f2] via-[#ebebeb] to-[#dddddd] 
    border-[#707070]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.1)]
    hover:from-[#eaf6fd] hover:via-[#d9f0fc] hover:to-[#bee6fd]
    hover:border-[#3c7fb1]
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_0_0_1px_rgba(60,127,177,0.5)]
  `;

  const primaryStyles = `
    text-slate-900 font-semibold
    bg-gradient-to-b from-[#dcf0fa] via-[#cce9f9] to-[#b6e0f7]
    border-[#3c7fb1]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.15)]
    hover:from-[#eaf6fd] hover:via-[#d9f0fc] hover:to-[#bee6fd]
    hover:brightness-105
  `;

  return (
    <button 
      className={`${baseStyles} ${variant === 'primary' ? primaryStyles : defaultStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};