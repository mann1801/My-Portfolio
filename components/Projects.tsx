'use client';

import { motion } from 'framer-motion';

type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  architecture_overview?: string | null;
  github_link?: string | null;
  live_link?: string | null;
  featured: boolean;
  createdAt: string;
};
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects({ projects }: { projects: Project[] }) {
    return (
        <section id="projects" className="py-20 relative z-10 w-full mb-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 w-full overflow-hidden">
                <div className="flex items-center gap-4 mb-20 justify-center">
                    <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded hidden md:block" />
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-center">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded hidden md:block" />
                </div>

                <div className="flex flex-col gap-20">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 items-stretch`}
                        >
                            {/* Architecture/Visual Column */}
                            <div className="w-full lg:w-1/2 glass rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

                                <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-widest font-semibold relative z-10">Architecture Flow</h4>

                                {project.architecture_overview ? (
                                    <div className="flex flex-col gap-4 relative z-10">
                                        {project.architecture_overview.split('->').map((step, stepIdx, arr) => (
                                            <div key={stepIdx} className="flex flex-col items-center w-full">
                                                <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-center text-sm md:text-base text-gray-200 shadow-xl backdrop-blur-md w-full max-w-sm break-words overflow-hidden">
                                                    {step.trim()}
                                                </div>
                                                {stepIdx < arr.length - 1 && (
                                                    <div className="h-6 w-[2px] bg-gradient-to-b from-primary to-transparent my-1" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full min-h-[300px] flex items-center justify-center text-gray-500 border border-dashed border-gray-600 rounded-2xl relative z-10">
                                        Architecture diagram visualization
                                    </div>
                                )}
                            </div>

                            {/* Text / Details Column */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white break-words">
                                    {project.title}
                                </h3>

                                <div className="glass p-6 rounded-2xl mb-6 relative z-10 w-full overflow-hidden">
                                    <p className="text-gray-300 leading-relaxed text-lg w-full break-words">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech_stack.map(tech => (
                                        <span key={tech} className="text-primary text-sm font-mono bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6 mt-auto">
                                    {project.github_link && (
                                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                                            <FaGithub size={24} className="group-hover:scale-110 transition-transform" />
                                            <span className="font-medium">Source</span>
                                        </a>
                                    )}
                                    {project.live_link && (
                                        <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-blue-400 transition-colors group">
                                            <FaExternalLinkAlt size={20} className="group-hover:scale-110 transition-transform" />
                                            <span className="font-medium">Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
