'use client';

import { motion } from 'framer-motion';
import type { Hackathon, Certification } from '@prisma/client';
import { FaTrophy, FaCertificate } from 'react-icons/fa';

export default function Achievements({ hackathons, certifications }: { hackathons: Hackathon[], certifications: Certification[] }) {
    return (
        <section id="achievements" className="py-20 relative z-10 w-full mb-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center gap-4 mb-16 justify-center">
                    <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded hidden md:block" />
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-center">
                        Certifications & <span className="text-primary">Achievements</span>
                    </h2>
                    <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded hidden md:block" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Certifications Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass p-8 rounded-3xl"
                    >
                        <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                            <FaCertificate className="text-primary" /> Certifications
                        </h3>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-600 before:to-transparent">
                            {certifications.map((cert) => (
                                <div key={cert.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-primary">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 glass rounded-xl border border-glass-border">
                                        <div className="flex justify-between items-start mb-1 gap-2">
                                            <span className="font-bold text-gray-200 break-words">{cert.name}</span>
                                            <span className="text-primary font-mono text-sm shrink-0">{cert.year}</span>
                                        </div>
                                        <p className="text-sm text-gray-400 break-words">{cert.issuer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hackathons Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass rounded-3xl p-8 h-full flex flex-col"
                    >
                        <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3 border-b border-glass-border pb-4">
                            <FaTrophy className="text-primary" /> Hackathons & Competitions
                        </h3>

                        <div className="flex flex-col gap-6 flex-grow">
                            {hackathons.map((hackathon, i) => (
                                <motion.div
                                    key={hackathon.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white/5 border border-white/10 p-5 rounded-2xl transition-colors hover:bg-white/10"
                                >
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <h4 className="text-lg font-bold text-white break-words">{hackathon.name}</h4>
                                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-mono font-medium shrink-0">
                                            {hackathon.year}
                                        </span>
                                    </div>
                                    <p className="text-primary text-sm font-medium mb-2">{hackathon.role}</p>
                                    <p className="text-gray-400 text-sm">
                                        {hackathon.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
