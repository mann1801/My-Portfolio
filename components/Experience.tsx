'use client';

import { motion } from 'framer-motion';

type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  createdAt: string;
};
import { FaBriefcase } from 'react-icons/fa';

export default function Experience({ experience }: { experience: Experience[] }) {
    if (!experience || experience.length === 0) return null;

    return (
        <section id="experience" className="py-20 relative z-10 w-full mb-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center gap-4 mb-16 justify-center">
                    <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded hidden md:block" />
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-center">
                        Work & <span className="text-primary">Experience</span>
                    </h2>
                    <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded hidden md:block" />
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-600 before:to-transparent">
                        {experience.map((exp, idx) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                {/* Node */}
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                                    <FaBriefcase size={14} className="text-primary" />
                                </div>

                                {/* Content Box */}
                                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-6 glass rounded-2xl border border-glass-border hover:border-primary/50 transition-colors">
                                    <div className="flex flex-col mb-2">
                                        <h3 className="text-xl font-bold font-heading text-white">{exp.role}</h3>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 gap-2">
                                            <span className="text-primary font-medium">{exp.company}</span>
                                            <span className="text-xs text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">{exp.duration}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-4 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
