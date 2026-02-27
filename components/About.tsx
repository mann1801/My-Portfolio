'use client';

import { motion } from 'framer-motion';

export default function About() {
    const badges = [
        'MERN Stack', 'PostgreSQL', 'Redis & RQ', 'LLM Integrations',
        'WhatsApp APIs', 'Python', 'React', 'Next.js'
    ];

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
    };

    return (
        <section id="about" className="py-20 relative z-10 w-full mb-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto glass p-6 sm:p-10 md:p-14 rounded-3xl overflow-hidden w-full"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold break-words">
                            About <span className="text-primary">Me</span>
                        </h2>
                        <div className="h-[2px] w-20 bg-primary/50 flex-grow rounded" />
                    </div>

                    <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                        <p>
                            I am a Semester 6 Computer Science student at LJ University (GPA: 8.7/10) with a profound passion for building intelligent, full-stack architectures. I don't just build tutorial projects; I engineer real <strong className="text-white">AI systems</strong>, <strong className="text-white">machine learning pipelines</strong>, and robust <strong className="text-white">backend architectures</strong>.
                        </p>
                        <p>
                            My expertise lies in the <strong className="text-primary">MERN Stack</strong> combined with extensive experience in automation and AI. I thrive on architecting multimodal AI pipelines—integrating Large Language Models, Vision OCR, Redis queues for asynchronous processing, and complex webhook integrations like WhatsApp APIs.
                        </p>
                        <p>
                            Whether it's deploying a generative AI chatbot or engineering a Tinder-style swipe matchmaking engine, my goal is to deliver production-grade scalable applications with a modern, high-end feel.
                        </p>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-xl font-medium tracking-wide text-white mb-6">Core Focus Areas</h3>
                        <div className="flex flex-wrap gap-3">
                            {badges.map((badge, i) => (
                                <motion.span
                                    key={badge}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={variants}
                                    className="px-4 py-2 glass text-sm text-blue-200 border-primary/20 rounded-full font-medium"
                                >
                                    {badge}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
