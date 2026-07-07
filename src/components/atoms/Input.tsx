import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 rounded-xl bg-[#090d16]/80 text-[#f1f5f9] border ${
          error ? "border-red-500 focus:ring-red-500/20" : "border-[#1e293b] focus:border-[#22d3ee] focus:ring-cyan-500/10"
        } placeholder-[#475569] focus:outline-none focus:ring-4 transition-all duration-300 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
