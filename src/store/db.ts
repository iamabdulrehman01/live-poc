export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  category?: string;
}

export interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  actionText: string;
}

export interface ProgramItem {
  id: string;
  icon: string; // lucide icon identifier
  title: string;
  description: string;
  details: string[];
  actionText: string;
  theme: string; // slate, blue, cyan etc
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
}

// Navigation links
export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
];

// Highlight statistics for dashboard grid (Figma Image 1/3)
export const dashboardStats: StatItem[] = [
  { value: "10k+", label: "ACTIVE STUDENTS", category: "students" },
  { value: "95%", label: "PLACEMENT RATE", category: "placement" },
  { value: "200+", label: "TOP MENTORS", category: "mentors" },
  { value: "50+", label: "LIVE WORKSHOPS", category: "workshops" },
];

// Inline horizontal row statistics (Figma Image 5)
export const horizontalStats: StatItem[] = [
  { value: "200+", label: "STUDENTS TRAINED" },
  { value: "300+", label: "MOCK INTERVIEWS" },
  { value: "5+", label: "UNI PARTNERS" },
  { value: "20+", label: "WORKSHOPS" },
  { value: "4.9★", label: "STUDENT RATING" },
];

// Service offerings data (Figma Image 1/3)
export const servicesData: ServiceItem[] = [
  {
    id: "service-real-world",
    badge: "Internship",
    title: "Real-World Experience",
    description:
      "Gain hands-on experience in high-growth startups and established tech giants.",
    imageUrl: "/images/service-internship.jpg",
    actionText: "Learn More",
  },
  {
    id: "service-skill-up",
    badge: "Workshop",
    title: "Intensive Skill-Up",
    description:
      "Master specific tech stacks in 48-hour high-intensity live sessions.",
    imageUrl: "/images/service-workshop.jpg",
    actionText: "Learn More",
  },
  {
    id: "service-expert-guidance",
    badge: "Mentorship",
    title: "Expert Guidance",
    description:
      "Get 1-on-1 career mapping with industry veterans from Fortune 500 companies.",
    imageUrl: "/images/service-mentorship.jpg",
    actionText: "Learn More",
  },
];

// Program paths (Figma Image 5)
export const programsData: ProgramItem[] = [
  {
    id: "program-internship",
    icon: "Briefcase",
    title: "Internship",
    description:
      "Gain real-world experience working on live industry-standard projects.",
    details: ["Summer (8 weeks)", "Final Year (6 weeks)"],
    actionText: "Learn More",
    theme: "cyan",
  },
  {
    id: "program-workshop",
    icon: "Laptop",
    title: "Workshop",
    description:
      "Master high-demand technical stacks with intensive hands-on training.",
    details: [
      "Backend",
      "Frontend",
      "Cloud/AWS/GCP/Azure",
      "DB",
      "AI / Agents AI",
    ],
    actionText: "View Curriculum",
    theme: "purple",
  },
  {
    id: "program-mentorship",
    icon: "GraduationCap",
    title: "Mentorship",
    description:
      "One-on-one sessions with industry veterans to navigate your career path.",
    details: ["Live 1-hour weekend sessions", "2 Weeks guidance duration"],
    actionText: "Book a Session",
    theme: "amber",
  },
];

// Testimonials data (Figma Image 1/3/4)
export const testimonialsData: TestimonialItem[] = [
  {
    id: "testimonial-aryaa",
    quote:
      "Dawdle.live didn't just teach me how to code: they taught me how to survive and thrive in a high-growth startup environment. The mentorship was a game-changer.",
    author: "Aryaa Sharma",
    role: "SDE",
    company: "Oracle",
    avatarUrl: "/images/avatar-aryaa.jpg",
  },
  {
    id: "testimonial-aaryan",
    quote:
      "The internship program at Dawdle.live gave me the technical skills and confidence to land my first role.",
    author: "Aaryan K.",
    role: "Tech Lead",
    company: "Dawdle Alumni",
    avatarUrl: "/images/avatar-aaryan.jpg",
  },
  {
    id: "testimonial-sarah",
    quote:
      "The workshop was concise and filled with industry secrets. Highly recommended for forward-looking developers!",
    author: "Sarah M.",
    role: "UI Designer",
    company: "Freelance",
    avatarUrl: "/images/avatar-sarah.jpg",
  },
];

// Stepper navigation config for Registration modal (Figma Image 4)
export interface RegistrationStep {
  number: number;
  title: string;
}

export const registrationSteps: RegistrationStep[] = [
  { number: 1, title: "Personal Details" },
  { number: 2, title: "Program Selection" },
  { number: 3, title: "Review & Submit" },
];

export const founderInfo = {
  name: "Rishikesh Gupta",
  role: "CEO & Founder",
  bio: "Dawdle.live is a dedicated C2C (Campus to Corporate) platform committed to empowering students and young professionals. Our mission is to bridge the educational gap by providing practical, industry-aligned training that turns academic knowledge into corporate performance.\n\nFounded on the principle of 'Informed Momentum,' we combine established institutional stability with the agility of high-tech startups.",
  avatarUrl: "/images/founder.jpg",
};
