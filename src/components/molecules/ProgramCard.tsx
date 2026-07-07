import React from "react";
import { Briefcase, Laptop, GraduationCap, Calendar, Clock, CheckCircle } from "lucide-react";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

export interface ProgramCardProps {
  id: string;
  iconName: string;
  title: string;
  description: string;
  details: string[];
  actionText: string;
  theme?: string;
  onActionClick?: () => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  iconName,
  title,
  description,
  details,
  actionText,
  theme = "cyan",
  onActionClick,
}) => {
  // Map icon names to Lucide icons
  const renderIcon = () => {
    const iconSize = 24;
    const iconClass = themeStyle.icon;

    switch (iconName) {
      case "Briefcase":
        return <Briefcase size={iconSize} className={iconClass} />;
      case "Laptop":
        return <Laptop size={iconSize} className={iconClass} />;
      case "GraduationCap":
        return <GraduationCap size={iconSize} className={iconClass} />;
      default:
        return <Briefcase size={iconSize} className={iconClass} />;
    }
  };

  const getCardThemeClasses = () => {
    if (theme === "cyan") {
      return {
        card: "card-glow-cyan",
        iconBox: "bg-cyan-500/10 border-cyan-500/35",
        icon: "text-[#22d3ee]",
        button: "glow-teal" as const,
      };
    }
    if (theme === "purple") {
      return {
        card: "card-glow-purple",
        iconBox: "bg-purple-500/10 border-purple-500/35",
        icon: "text-[#c084fc]",
        button: "glow-purple" as const,
      };
    }
    return {
      card: "card-glow-amber",
      iconBox: "bg-amber-500/10 border-amber-500/35",
      icon: "text-[#fbbf24]",
      button: "glow-amber" as const,
    };
  };

  const themeStyle = getCardThemeClasses();

  return (
    <div
      className={`flex flex-col justify-between p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 h-full ${themeStyle.card}`}
    >
      <div>
        {/* Icon Header */}
        <div
          className={`inline-flex items-center justify-center p-4 rounded-2xl bg-[#030712] border mb-6 group-hover:scale-110 transition-transform duration-300 ${themeStyle.iconBox}`}
        >
          {renderIcon()}
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-extrabold font-jakarta text-white mb-3">
          {title}
        </h3>
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 font-medium">
          {description}
        </p>

        {/* Detail Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {details.map((detail, idx) => (
            <Badge
              key={idx}
              variant={theme === "cyan" ? "cyan" : theme === "purple" ? "purple" : "outline"}
              className={`text-[10px] tracking-normal capitalize py-1 px-3 font-bold ${
                theme === "cyan"
                  ? "bg-cyan-950/30 text-cyan-300 border-cyan-500/20"
                  : theme === "purple"
                  ? "bg-purple-950/30 text-purple-300 border-purple-500/20"
                  : "bg-amber-950/30 text-amber-300 border-amber-500/20"
              }`}
            >
              {detail}
            </Badge>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant={themeStyle.button}
        className="w-full justify-center py-3.5 shadow-lg"
        onClick={onActionClick}
      >
        {actionText}
      </Button>
    </div>
  );
};
export default ProgramCard;
