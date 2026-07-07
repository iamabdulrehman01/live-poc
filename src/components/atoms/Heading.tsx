import React from "react";

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  gradient?: boolean;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  gradient = false,
  className = "",
}) => {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";

  const baseClasses = "font-bold tracking-tight text-white font-jakarta";

  const sizeClasses = {
    1: "text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-none",
    2: "text-3xl md:text-4xl lg:text-5xl leading-snug",
    3: "text-2xl md:text-3xl leading-relaxed",
    4: "text-xl md:text-2xl leading-normal",
  };

  const gradientClasses = gradient
    ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-[#e2e8f0] to-[#22d3ee]"
    : "";

  return (
    <Tag className={`${baseClasses} ${sizeClasses[level]} ${gradientClasses} ${className}`}>
      {children}
    </Tag>
  );
};
export default Heading;
