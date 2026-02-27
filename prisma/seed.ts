import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Admin setup
  const adminEmail = process.env.EMAIL_USER || 'admin@example.com';
  const adminExists = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (!adminExists) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin';
    const password_hash = await bcrypt.hash(defaultPassword, 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password_hash,
      }
    });
    console.log(`Admin account created: ${adminEmail}`);
  }

  // 2. Skills
  const skills = [
    { category: 'Programming', name: 'Java', proficiency: 90 },
    { category: 'Programming', name: 'Python', proficiency: 95 },
    { category: 'Programming', name: 'HTML', proficiency: 95 },
    { category: 'Programming', name: 'CSS', proficiency: 90 },
    { category: 'Programming', name: 'Flask', proficiency: 85 },
    { category: 'Frameworks', name: 'JavaScript', proficiency: 90 },
    { category: 'Frameworks', name: 'React', proficiency: 85 },
    { category: 'Frameworks', name: 'Django', proficiency: 80 },
    { category: 'Frameworks', name: 'Streamlit', proficiency: 80 },
    { category: 'Tools', name: 'Next.js', proficiency: 85 },
    { category: 'Tools', name: 'Node.js', proficiency: 85 },
    { category: 'Tools', name: 'TypeScript', proficiency: 85 },
    { category: 'Tools', name: 'Kaggle', proficiency: 75 },
    { category: 'Databases', name: 'PostgreSQL', proficiency: 85 },
    { category: 'Databases', name: 'MongoDB', proficiency: 80 },
    { category: 'Databases', name: 'Supabase', proficiency: 85 },
    { category: 'AI Tools', name: 'ChatGPT', proficiency: 95 },
    { category: 'AI Tools', name: 'Claude', proficiency: 95 },
    { category: 'AI Tools', name: 'Copilot', proficiency: 90 },
    { category: 'AI Tools', name: 'DeepSeek', proficiency: 85 },
    { category: 'AI Tools', name: 'Cursor', proficiency: 90 },
    { category: 'AI Tools', name: 'Antigravity', proficiency: 95 },
    { category: 'AI Tools', name: 'Windsurf', proficiency: 90 },
    { category: 'AI Tools', name: 'Kiro', proficiency: 80 },
    { category: 'Networking', name: 'Wireshark', proficiency: 75 },
    { category: 'Networking', name: 'TCP', proficiency: 80 },
    { category: 'Networking', name: 'UDP', proficiency: 80 },
    { category: 'Networking', name: 'QUIC', proficiency: 75 },
    { category: 'Networking', name: 'Handshaking protocols', proficiency: 80 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // 3. Projects
  const projects = [
    {
      title: 'AI Car Part Chat Bot',
      description: 'AI-driven WhatsApp chatbot for identifying and selling car parts using multimodal AI (text, voice, image, documents).',
      tech_stack: ['GPT-4o', 'Whisper', 'Redis', 'PostgreSQL', 'Flask', 'React'],
      architecture_overview: 'WhatsApp -> Flask Webhook -> Redis Queue -> Worker -> GPT Engine -> DB -> Response',
      featured: true,
    },
    {
      title: 'KALAMRUT - AI Art Gallery',
      description: 'AI-powered artwork recommender using CLIP ViT-B/32, MiDaS Depth Estimation, and PyTorch.',
      tech_stack: ['PyTorch', 'CLIP', 'Django REST', 'React', 'MiDaS'],
      architecture_overview: 'Upload wall image -> Depth detection -> CLIP embedding -> Cosine similarity -> Diversity algorithm -> 10 recommendations',
      featured: true,
    },
    {
      title: 'HEARTSYNC',
      description: 'Tinder-style matchmaking app with AI chat suggestion system using Ollama LLM.',
      tech_stack: ['Django', 'React', 'Ollama LLM'],
      architecture_overview: 'Frontend -> REST API -> Match engine -> Real-time updates',
      featured: true,
    }
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // 4. Education
  const educations = [
    {
      degree: 'B.Tech Computer Science',
      institution: 'LJ University',
      period: 'August 2023 – August 2027',
      gpa: 8.7,
      maxGpa: 10,
      status: 'Current Status: Semester 6.'
    }
  ];

  for (const edu of educations) {
    await prisma.education.create({ data: edu });
  }

  // 4.5. Experience
  const experiences = [
    {
      role: 'Full Stack Developer Intern',
      company: 'Tech Startup Inc.',
      duration: 'June 2024 - Present',
      description: 'Developed and maintained web applications using React, Node.js, and PostgreSQL.\nImplemented RESTful APIs and integrated third-party services.\nCollaborated with cross-functional teams to deliver high-quality software solutions.'
    }
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }

  // 5. Hackathons
  const hackathons = [
    { name: 'Nirma University Hackathon', description: 'Blockchain Extension Wallet', role: 'Developer', year: 2024 },
    { name: 'Dhirubhai Ambani University', description: 'Coastal Threat Alert System', role: 'Developer', year: 2024 },
    { name: 'Odoo Hackathon 2025', description: 'StackIt Q&A Platform', role: 'Full Stack Developer', year: 2025 },
    { name: 'HACKHAZARDS 25', description: 'NFT Gun Game', role: 'Developer', year: 2025 },
  ];

  for (const hackathon of hackathons) {
    await prisma.hackathon.create({ data: hackathon });
  }

  // 5. Certifications
  const certifications = [
    { name: 'Introduction to Java', issuer: 'Coursera', year: 2023 },
    { name: 'Inheritance & Data Structures in Java', issuer: 'Coursera', year: 2024 },
    { name: 'Exploratory Data Analysis', issuer: 'IBM', year: 2024 },
    { name: 'HTML/CSS/JS', issuer: 'IBM', year: 2023 },
    { name: 'TCS iON Career Edge', issuer: 'TCS', year: 2023 },
  ];

  for (const cert of certifications) {
    await prisma.certification.create({ data: cert });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
