import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Badge from "../atoms/Badge";

export interface ServiceCardProps {
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  actionText: string;
  onActionClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  badge,
  title,
  description,
  imageUrl,
  actionText,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col rounded-2xl bg-[#090d16]/75 border border-[#1e293b] overflow-hidden group hover:border-[#22d3ee]/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(6,182,212,0.03)] h-full">
      {/* Visual Header */}
      <div className="relative h-56 w-full overflow-hidden bg-[#030712]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent" />
      </div>

      {/* Body Content */}
      <div className="flex flex-col justify-between p-6 flex-grow">
        <div>
          {/* Badge */}
          <div className="mb-4">
            <Badge
              variant={
                badge === "Internship"
                  ? "cyan"
                  : badge === "Workshop"
                  ? "purple"
                  : "outline"
              }
              className="text-[10px]"
            >
              {badge}
            </Badge>
          </div>

          {/* Title & Paragraph */}
          <h3 className="text-xl font-bold font-jakarta text-white group-hover:text-[#22d3ee] transition-colors duration-300 mb-2">
            {title}
          </h3>
          <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Action Link */}
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#22d3ee] hover:text-[#06b6d4] transition-colors duration-300 self-start group/link cursor-pointer"
        >
          <span>{actionText}</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};
export default ServiceCard;
