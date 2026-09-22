import React from "react";
import { Quote } from "lucide-react";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  avatarUrl,
  className = "",
}) => {
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div
      className={`relative p-8 md:p-10 rounded-3xl bg-[#090d16]/70 border border-[#1e293b] backdrop-blur-md overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* Decorative Quote Icon in background */}
      <div className="absolute right-6 top-6 text-[#1e293b]/50 select-none pointer-events-none">
        <Quote size={80} className="transform rotate-180" />
      </div>

      <div className="relative z-10">
        {/* Quote Content */}
        <p className="text-lg md:text-xl text-[#e2e8f0] font-medium leading-relaxed italic mb-8">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Author details */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Avatar picture or placeholder */}
        {avatarUrl && !avatarUrl.includes("avatar-") ? (
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-cyan-400/30">
            <img
              src={avatarUrl}
              alt={author}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm select-none">
            {getInitials(author)}
          </div>
        )}

        <div>
          <h4 className="text-white font-bold font-jakarta text-sm">
            {author}
          </h4>
          <p className="text-[#94a3b8] text-xs">
            {role} at <span className="text-[#22d3ee] font-medium">{company}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default TestimonialCard;
