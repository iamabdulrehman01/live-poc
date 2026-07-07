import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "purple" | "outline";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase select-none";

  const variantClasses = {
    default: "bg-[#1e293b]/80 text-[#94a3b8] border border-[#334155]",
    cyan: "bg-[#06b6d4]/10 text-[#22d3ee] border border-[#22d3ee]/20",
    purple: "bg-[#a855f7]/10 text-[#c084fc] border border-[#c084fc]/20",
    outline: "bg-transparent text-[#e2e8f0] border border-[#475569]",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
export default Badge;
