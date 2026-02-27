'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type EducationType = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpa: number;
  maxGpa: number;
  status: string;
  createdAt: string;
};

type Skill = {
  id: string;
  category: string;
  name: string;
  proficiency: number;
  icon?: string | null;
  createdAt: string;
};
import { FaGraduationCap, FaCode } from 'react-icons/fa';

export default function Education({ education, skills }: { education: EducationType[], skills: Skill[] }) {
    const [activeTab, setActiveTab] = useState<'education' | 'skills'>('education');

    // Group skills by category if needed or just display all
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    const categories = Object.keys(groupedSkills);

    return (
        <section id="education-skills" className="py-20 relative z-10 w-full mb-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center gap-4 mb-10 justify-center">
                    <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded hidden md:block" />
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-center">
                        Education & <span className="text-primary">Skills</span>
                    </h2>
                    <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded hidden md:block" />
                </div>

                <div className="flex justify-center mb-16">
                    <div className="glass p-1 rounded-full flex gap-2">
                        <button
                            onClick={() => setActiveTab('education')}
                            className={`px-6 py-2 md:py-3 rounded-full font-medium transition-all ${activeTab === 'education' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Education
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`px-6 py-2 md:py-3 rounded-full font-medium transition-all ${activeTab === 'skills' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Skills
                        </button>
                    </div>
                </div>

                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'education' && (
                            <motion.div
                                key="education"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-4xl mx-auto flex flex-col gap-8"
                            >
                                {education.map((edu, idx) => {
                                    const gpaPercentage = (edu.gpa / edu.maxGpa) * 100;
                                    return (
                                        <motion.div
                                            key={edu.id}
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                                            className="glass p-8 rounded-3xl relative"
                                        >
                                            <div className="absolute -left-3 top-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center lg:hidden">
                                                <FaGraduationCap size={12} className="text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold font-heading mb-2 flex flex-wrap items-center gap-3 break-words">
                                                <FaGraduationCap className="text-primary shrink-0" />
                                                <span className="break-words w-full sm:w-auto">{edu.degree}</span>
                                            </h3>
                                            <p className="text-xl text-gray-300 mb-1 break-words">{edu.institution}</p>
                                            <p className="text-gray-400 mb-6 font-mono text-sm">{edu.period}</p>

                                            <div className="flex items-center gap-6">
                                                <div className="relative w-24 h-24 shrink-0">
                                                    <svg className="w-full h-full transform -rotate-90">
                                                        <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                                                        <motion.circle
                                                            initial={{ strokeDasharray: "0 1000" }}
                                                            whileInView={{ strokeDasharray: `${gpaPercentage * 2.26} 1000` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                                            cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="8" fill="transparent"
                                                            className="text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                        <span className="text-xl font-bold font-mono">{edu.gpa}</span>
                                                        <span className="text-xs text-gray-400 uppercase tracking-widest leading-none">GPA</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-400 max-w-[150px]">{edu.status}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}

                        {activeTab === 'skills' && (
                            <motion.div
                                key="skills"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categories.map((category, catIdx) => (
                                        <div key={category} className="glass p-6 md:p-8 rounded-2xl flex flex-col h-full w-full">
                                            <h3 className="text-xl font-bold mb-6 text-white border-b border-glass-border pb-4">{category}</h3>
                                            <div className="grid grid-cols-2 gap-4 flex-grow">
                                                {groupedSkills[category].map((skill, i) => (
                                                    <motion.div
                                                        key={skill.id}
                                                        className="group relative bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors hover:bg-white/10"
                                                        whileHover="hover"
                                                    >
                                                        <div className="relative w-16 h-16 flex items-center justify-center">
                                                            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-700/50" />
                                                                <motion.circle
                                                                    variants={{
                                                                        hover: { strokeDasharray: `${skill.proficiency * 1.76} 1000` }
                                                                    }}
                                                                    initial={{ strokeDasharray: "0 1000" }}
                                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                                    cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent"
                                                                    className="text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                                                />
                                                            </svg>
                                                            {/* We can use a default icon if skill.icon is missing or just FaCode */}
                                                            <FaCode size={20} className="text-gray-300 group-hover:text-primary transition-colors z-10" />

                                                            {/* Proficiency text overlay on hover */}
                                                            <motion.div
                                                                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                                            >
                                                                <span className="text-xs font-bold text-white">{skill.proficiency}%</span>
                                                            </motion.div>
                                                        </div>
                                                        <span className="text-sm font-medium text-center text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
