import React from "react";
import StatItem from "../atoms/StatItem";

export interface StatsCardProps {
  value: string;
  label: string;
  category?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  category = "slate",
  className = "",
}) => {
  // Styles based on theme/category
  const themeClasses = {
    students: "card-glow-cyan",
    placement: "card-glow-purple",
    mentors: "card-glow-emerald",
    workshops: "card-glow-amber",
  };

  const selectedTheme =
    themeClasses[category as keyof typeof themeClasses] || themeClasses.mentors;

  const getValueGradient = () => {
    if (category === "students")
      return "bg-gradient-to-r from-white via-[#22d3ee] to-[#10b981]";
    if (category === "placement")
      return "bg-gradient-to-r from-white via-[#c084fc] to-[#ec4899]";
    if (category === "mentors")
      return "bg-gradient-to-r from-white via-[#34d399] to-[#059669]";
    return "bg-gradient-to-r from-white via-[#fbbf24] to-[#ef4444]";
  };

  return (
    <div
      className={`p-8 rounded-3xl transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1 ${selectedTheme} ${className}`}
    >
      <StatItem
        value={value}
        label={label}
        valueClassName={getValueGradient()}
        labelClassName="text-[#94a3b8] font-bold"
      />
    </div>
  );
};
export default StatsCard;
