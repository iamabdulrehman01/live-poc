"use client";

import React, { useState } from "react";
import { User } from "lucide-react";
import Heading from "../atoms/Heading";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  avatarUrl?: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rishikesh Gupta",
    role: "CEO & Founder",
    department: "Leadership",
    avatarUrl: "/images/founder.jpg",
    bio: "Rishikesh Gupta is a dedicated strategist committed to bridging the gap between academic systems and modern corporate environments. With over a decade of mentorship and business experience, he founded Campus to Corporate to empower young professionals. He combines institutional stability with the agility of high-tech startups."
  },
  {
    id: 2,
    name: "Ananya Sharma",
    role: "Co-Founder & COO",
    department: "Leadership",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Ananya oversees operations and strategic corporate alignment at Campus to Corporate. With a background in organizational behavior and HR development, she ensures all program curriculums meet global industry expectations. She excels at building strong pipelines with recruiters. Ananya oversees operations and strategic corporate alignment at Campus to Corporate. With a background in organizational behavior and HR development, she ensures all program curriculums meet global industry expectations. She excels at building strong pipelines with recruiters."
  },
  {
    id: 3,
    name: "Aaryan K.",
    role: "Chief Technology Officer",
    department: "Engineering",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Aaryan is a technical leader who structures our engineering bootcamps and corporate tech tracks. Prior to this, he led scalable software engineering divisions at high-growth startups. He focuses on practical, real-world development workflows, system architecture, and modern frontend tools."
  },
  // {
  //   id: 4,
  //   name: "Sarah Miller",
  //   role: "Head of Product Design",
  //   department: "Design",
  //   avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
  //   bio: "Sarah leads our UX/UI curriculums and student interface designs. She holds a master's degree in human-computer interaction and has mentored hundreds of aspiring designers. Her training focuses on user empathy, visual hierarchy, branding, and industry-standard design tools like Figma."
  // },
  {
    id: 5,
    name: "Devon Chen",
    role: "Lead Software Architect",
    department: "Engineering",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Devon specializes in backend scaling, cloud services, and database engineering. He designs simulations of production-level outages for our advanced students. His teaching emphasizes automated testing, Docker containers, clean code principles, and cloud-native architectures."
  },
  {
    id: 6,
    name: "Priya Nair",
    role: "VP of Talent Acquisition",
    department: "Human Resources",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    bio: "Priya guides our students through critical career transitions, corporate grooming, and interview readiness. With a background of placing talent in Fortune 500 corporations, she delivers practical, mock interviewer feedback and helps graduates refine their resumes and GitHub profiles."
  }
];

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative w-full h-[240px] perspective-1000 cursor-pointer group"
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${isFlipped ? "rotate-y-180" : "group-hover:[transform:rotateY(180deg)]"
          }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-[#0d0e22] border border-white/5 shadow-2xl flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:border-purple-500/30">
          {/* Profile Circle with Purple Ring */}
          <div className="relative w-24 h-24 rounded-full border-2 border-purple-400 flex items-center justify-center p-1 bg-[#151733] mb-4 shadow-lg shadow-purple-500/10">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#090d16] flex items-center justify-center">
              {member.avatarUrl ? (
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to user icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallbackEl = e.currentTarget.nextElementSibling;
                    if (fallbackEl) fallbackEl.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`fallback-icon w-full h-full flex items-center justify-center text-purple-400 ${member.avatarUrl ? 'hidden' : ''}`}>
                <User size={36} />
              </div>
            </div>
          </div>

          {/* Designation (Role) */}
          <h3 className="text-white font-bold text-base md:text-lg text-center mb-1 group-hover:text-purple-300 transition-colors duration-300">
            {member.role}
          </h3>

          {/* Category (Department) */}
          <span className="text-[#a855f7] text-[10px] font-extrabold uppercase tracking-widest">
            {member.department}
          </span>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-[#11122a] border border-purple-500/20 shadow-2xl flex flex-col p-5">
          {/* Back Header */}
          <div className="border-b border-white/5 pb-2 mb-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-purple-400 overflow-hidden bg-[#090d16] shrink-0">
              {member.avatarUrl ? (
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-[20%]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <h4 className="text-white font-bold text-sm truncate">{member.name}</h4>
              <p className="text-purple-400 text-[10px] font-semibold truncate">{member.role}</p>
            </div>
          </div>

          {/* Scrollable Bio Description */}
          <div className="flex-1 overflow-y-auto pr-1 text-xs text-[#94a3b8] leading-relaxed card-scrollbar font-medium">
            <p>{member.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WhoWeAre: React.FC = () => {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#030712] overflow-hidden">
      {/* Visual lighting blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading level={2} className="mb-4 inline-block relative pb-4">
            Who We Are
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#a855f7] rounded-full" />
          </Heading>
          <p className="text-[#94a3b8] text-sm md:text-base mt-2">
            Meet the leaders and industry experts bridging the gap between institutional education and top-tier corporate performance.
          </p>
        </div>

        {/* 6-Card Grid (3 columns on desktop, i.e. 3-3 pair, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
