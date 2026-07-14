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
    name: "Abhishek Kumar",
    role: "Founder",
    department: "Leadership",
    avatarUrl: "/images/AbhishekPhoto.jpeg",
    bio: "Abhishek Kumar brings over two decades of experience in engineering leadership and digital transformation across global financial services and technology domains. He has held senior roles at Coforge, Amazon, Barclays, NatWest, and Infosys, where he led large-scale banking modernization, cloud migrations, AI-led assurance platforms, and global product expansions. His expertise spans BFS retail banking, trading systems, and enterprise automation, consistently delivering measurable impact in efficiency, cost reduction, and customer satisfaction. Certified in AWS and advanced enterprise technologies, Abhishek combines deep technical proficiency with proven leadership in building high-performing teams and driving innovation at scale. ",
  },
  {
    id: 2,
    name: "Saket Sharma",
    role: "Delivery Head Program Manager",
    department: "Delivery Head Program Manager",
    avatarUrl: "/images/SaketSharma.jpg",
    bio: "Saket Sharma is an experienced technology and delivery professional with over 16 years of experience in project management, program delivery, product ownership, and digital transformation. He has successfully led complex technology initiatives across banking, insurance, payments, e-commerce, and travel technology domains. With strong expertise in Agile delivery, stakeholder management, product strategy, API integrations, Salesforce platforms, and cross-functional team leadership, Saket has a proven ability to bridge business objectives with technology execution. Throughout his career, he has worked closely with global stakeholders and multidisciplinary teams to deliver scalable digital solutions, improve operational efficiency, and drive measurable business outcomes. ",
  },
  {
    id: 4,
    name: "Anand Shankar",
    role: "CTO – Backend and Frontend & Founder",
    department: "Engineering",
    avatarUrl: "/images/AnandShankar.jpg",
    bio: "Anand is a seasoned technology leader with more than 20 years of experience in software development, system design, and enterprise architecture. His career spans multiple industries and global markets, where he has consistently driven innovation, scalability, and excellence in IT strategy. He holds advanced academic credentials including an MCA, Ph.D. in Computer Science, LLM in Criminal Law, LLB in Corporate Law, and MIPL in Intellectual Property. This rare combination of technical and legal expertise enables him to approach challenges from both an engineering and governance perspective, delivering solutions that are innovative, resilient, and compliant. ",
  },
  {
    id: 3,
    name: "Rishikesh Kumar",
    role: "Co-CEO & Founder",
    department: "Co-CEO & Founder",
    avatarUrl: "/images/RishikeshKumar.jpg",
    bio: "Rishikesh Kumar is the founder and CEO of Dawdle.live (world’s largest community platform for CXOs and senior leaders). He comes with more than 18 years of experience in managing end to end business P&L, driving digital transformation and sales & marketing. He has played a pivotal role in the growth of start-ups like Routematic, Pristyn Care and PagarBook. Besides, he has held leadership positions in companies like Sterlite Power, Shapoorji Paloonji. He is a full time MBA alumnus of FMS Delhi. ",
  },
  {
    id: 5,
    name: "Deepak Sharma",
    role: "CTO – Cloud and AI & Founde",
    department: "Engineering",
    avatarUrl: "/images/DeepakSharma.jpg",
    bio: "Enterprise Data & Technology Strategist with more than 17 years of experience leading large-scale, enterprise data, cloud, and master data transformation programs across Banking, Manufacturing, and Consumer Goods domains. Proven track record of shaping enterprise data strategy, modernizing legacy platforms to cloud-native ecosystems, and building scalable Customer Data Platforms (CDP) and Master Data Management (MDM) capabilities to enable digital transformation, operational efficiency, regulatory compliance, and business growth. Recognized for partnering with CXO and senior business stakeholders to define target-state architectures, enterprise data roadmaps, digital transformation and cloud modernization strategies, and enterprise integration models across complex multi-year transformation programs. Experienced in building and leading high-performing architecture and data engineering teams, establishing governance frameworks, and driving adoption of cloud-first and data-driven operating models. Currently operating in a senior leadership capacity spanning enterprise data strategy, cloud platform architecture, solution governance, and large-scale delivery leadership. ",
  },
];

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative w-full h-[240px] perspective-1000 cursor-pointer group"
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
          isFlipped ? "rotate-y-180" : "group-hover:[transform:rotateY(180deg)]"
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
                    e.currentTarget.style.display = "none";
                    const fallbackEl = e.currentTarget.nextElementSibling;
                    if (fallbackEl) fallbackEl.classList.remove("hidden");
                  }}
                />
              ) : null}
              <div
                className={`fallback-icon w-full h-full flex items-center justify-center text-purple-400 ${member.avatarUrl ? "hidden" : ""}`}
              >
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
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <h4 className="text-white font-bold text-sm truncate">
                {member.name}
              </h4>
              <p className="text-purple-400 text-[10px] font-semibold truncate">
                {member.role}
              </p>
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
    <section
      id="about"
      className="relative py-20 md:py-28 bg-[#030712] overflow-hidden"
    >
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
            Meet the leaders and industry experts bridging the gap between
            institutional education and top-tier corporate performance.
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
