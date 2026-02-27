'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function Hero() {
    const [typingKey, setTypingKey] = useState(0);
    const [isRendered, setIsRendered] = useState(true);

    useEffect(() => {
        const handleReset = () => {
            // Forcefully eject the component from the virtual DOM
            setIsRendered(false);

            // Wait a tick, then remount it with a brand new identifier
            setTimeout(() => {
                setTypingKey(prev => prev + 1);
                setIsRendered(true);
            }, 50);
        };

        window.addEventListener('resetHeroTyping', handleReset);
        return () => window.removeEventListener('resetHeroTyping', handleReset);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* 3D Background Effect (Placeholder for Neural Network/Particle Canvas) */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary glow-pulse rounded-full blur-[150px]" />
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center text-center w-full overflow-visible">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-6 inline-block overflow-visible"
                    >
                        <span className="glass px-4 py-2 rounded-full text-primary text-sm font-medium tracking-wide">
                            Available for New Opportunities
                        </span>
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-extrabold tracking-tight mb-6 break-words px-2 w-full h-[140px] sm:h-[160px] md:h-[200px] lg:h-[240px] flex flex-col items-center justify-center pb-4">
                        <div>Hi, I'm</div>
                        {isRendered && (
                            <TypeAnimation
                                key={typingKey}
                                sequence={[
                                    'Mann Soni',
                                    4000,
                                    'an AI Engineer',
                                    2000,
                                    'a Full-Stack Dev',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={5}
                                repeat={Infinity}
                                className="text-gradient-primary tracking-normal"
                            />
                        )}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed px-4 break-words"
                    >
                        AI Systems Engineer | MERN Stack Developer | ML & Automation Enthusiast
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <a
                            href="/cv.pdf"
                            download="Mann_Soni_CV.pdf"
                            className="group relative px-8 py-4 bg-primary text-white rounded-full font-medium text-lg overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2 transition-transform hover:scale-105"
                        >
                            <span className="relative z-10">View my CV</span>
                            <FaDownload className="relative z-10 group-hover:translate-y-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </a>

                        <Link
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                window.history.pushState(null, '', '#contact');
                            }}
                            className="group glass px-8 py-4 rounded-full font-medium text-lg text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 w-full sm:w-auto hover:text-primary hover:border-primary"
                        >
                            <FaEnvelope />
                            <span>Contact Me</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
                <span className="text-gray-500 text-sm mb-2 tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
            </motion.div>
        </section>
    );
}
