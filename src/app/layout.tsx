import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dawdle.live - Bridge the Gap from Campus to Corporate",
  description: "Expert-led Internship, Workshop, and Mentorship programs designed to launch your tech career with confidence and corporate-ready skills.",
  keywords: ["internship", "tech workshop", "career mentorship", "campus to corporate", "SDE coding", "React Next.js portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-[#f3f4f6] selection:bg-cyan-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}

