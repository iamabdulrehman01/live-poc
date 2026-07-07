import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "glow-teal" | "glow-purple" | "glow-amber" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  // Base classes for button
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  // Size variations
  const sizeClasses = {
    sm: "px-4 py-2 text-xs rounded-lg",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base rounded-2xl",
  };

  // Style variations
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#22d3ee] to-[#06b6d4] text-[#020617] shadow-lg hover:shadow-cyan-500/25 hover:brightness-110",
    secondary: "bg-[#0f172a]/90 text-[#94a3b8] border border-[#1e293b] hover:bg-[#1e293b] hover:text-[#f8fafc] hover:border-slate-700",
    outline: "bg-transparent border border-[#06b6d4]/40 text-[#22d3ee] hover:bg-[#06b6d4]/10 hover:border-[#22d3ee] shadow-sm",
    "glow-teal": "btn-gradient-cyan",
    "glow-purple": "btn-gradient-purple",
    "glow-amber": "btn-gradient-amber",
    link: "bg-transparent text-[#22d3ee] p-0 hover:underline hover:text-[#06b6d4] active:scale-100 font-semibold",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
