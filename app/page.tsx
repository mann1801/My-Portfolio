import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';

export default async function Home() {
  const skills = await prisma.skill.findMany({ orderBy: { proficiency: 'desc' } });
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, where: { featured: true } });
  const hackathons = await prisma.hackathon.findMany({ orderBy: { year: 'desc' } });
  const certifications = await prisma.certification.findMany({ orderBy: { year: 'desc' } });
  const education = await prisma.education.findMany({ orderBy: { createdAt: 'desc' } });
  const experience = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });

  // Convert Date objects to ISO strings for client components
  const experienceData = experience.map(exp => ({ ...exp, createdAt: exp.createdAt.toISOString() }));
  const educationData = education.map(edu => ({ ...edu, createdAt: edu.createdAt.toISOString() }));
  const skillsData = skills.map(skill => ({ ...skill, createdAt: skill.createdAt.toISOString() }));
  const projectsData = projects.map(proj => ({ ...proj, createdAt: proj.createdAt.toISOString() }));
  const hackathonsData = hackathons.map(hack => ({ ...hack, createdAt: hack.createdAt.toISOString() }));
  const certificationsData = certifications.map(cert => ({ ...cert, createdAt: cert.createdAt.toISOString() }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10 md:ml-20 lg:ml-24 pt-20 md:pt-0">
      <Navbar />
      <div className="w-full flex flex-col gap-24 md:gap-32">
        <Hero />
        <About />
        <Experience experience={experienceData} />
        <Education education={educationData} skills={skillsData} />
        <Projects projects={projectsData} />
        <Achievements hackathons={hackathonsData} certifications={certificationsData} />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
