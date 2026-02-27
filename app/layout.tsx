import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Background3DWrapper from '@/components/Background3DWrapper';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mann Soni | AI Systems Engineer & MERN Stack Developer",
  description: "Portfolio of Mann Soni, Semester 6 CS student at LJ University. Specializing in AI systems, ML pipelines, and production-grade backend architectures.",
  keywords: ["Mann Soni", "AI Systems Engineer", "MERN Stack Developer", "Machine Learning", "Backend Architecture", "Next.js", "Python", "LJ University"],
  authors: [{ name: "Mann Soni" }],
  openGraph: {
    title: "Mann Soni | AI Systems Engineer",
    description: "Portfolio of Mann Soni, specializing in AI systems, ML pipelines, and production-grade backend architectures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-transparent text-white selection:bg-primary selection:text-white`}
      >
        <Background3DWrapper />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
