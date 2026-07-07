import React from "react";

export interface StatItemProps {
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  className = "",
  valueClassName = "",
  labelClassName = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <span
        className={`text-3xl md:text-4xl font-bold tracking-tight font-jakarta bg-clip-text text-transparent bg-gradient-to-r from-white to-[#22d3ee] ${valueClassName}`}
      >
        {value}
      </span>
      <span
        className={`text-xs font-semibold text-[#64748b] tracking-wider uppercase mt-1 ${labelClassName}`}
      >
        {label}
      </span>
    </div>
  );
};
export default StatItem;
