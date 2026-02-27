import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // Security check - only allow in development or with secret key
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    if (secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
    }

    // 2. Skills
    const skillCount = await prisma.skill.count();
    if (skillCount === 0) {
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

      await prisma.skill.createMany({ data: skills });
    }

    // 3. Projects
    const projectCount = await prisma.project.count();
    if (projectCount === 0) {
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

      await prisma.project.createMany({ data: projects });
    }

    // 4. Education
    const educationCount = await prisma.education.count();
    if (educationCount === 0) {
      await prisma.education.create({
        data: {
          degree: 'B.Tech Computer Science',
          institution: 'LJ University',
          period: 'August 2023 – August 2027',
          gpa: 8.7,
          maxGpa: 10,
          status: 'Current Status: Semester 6.'
        }
      });
    }

    // 5. Hackathons
    const hackathonCount = await prisma.hackathon.count();
    if (hackathonCount === 0) {
      const hackathons = [
        { name: 'Nirma University Hackathon', description: 'Blockchain Extension Wallet', role: 'Developer', year: 2024 },
        { name: 'Dhirubhai Ambani University', description: 'Coastal Threat Alert System', role: 'Developer', year: 2024 },
        { name: 'Odoo Hackathon 2025', description: 'StackIt Q&A Platform', role: 'Full Stack Developer', year: 2025 },
        { name: 'HACKHAZARDS 25', description: 'NFT Gun Game', role: 'Developer', year: 2025 },
      ];

      await prisma.hackathon.createMany({ data: hackathons });
    }

    // 6. Certifications
    const certificationCount = await prisma.certification.count();
    if (certificationCount === 0) {
      const certifications = [
        { name: 'Introduction to Java', issuer: 'Coursera', year: 2023 },
        { name: 'Inheritance & Data Structures in Java', issuer: 'Coursera', year: 2024 },
        { name: 'Exploratory Data Analysis', issuer: 'IBM', year: 2024 },
        { name: 'HTML/CSS/JS', issuer: 'IBM', year: 2023 },
        { name: 'TCS iON Career Edge', issuer: 'TCS', year: 2023 },
      ];

      await prisma.certification.createMany({ data: certifications });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully' 
    });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ 
      error: 'Failed to seed database', 
      details: error.message 
    }, { status: 500 });
  }
}
