'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { FaUser, FaBriefcase, FaCode, FaLaptopCode, FaTrophy, FaEnvelope } from 'react-icons/fa';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.replace('#', '');
            const elem = document.getElementById(targetId);
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', href);
            }
        }
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'About', href: '#about', icon: FaUser },
        { name: 'Experience', href: '#experience', icon: FaBriefcase },
        { name: 'Skills', href: '#education-skills', icon: FaCode },
        { name: 'Projects', href: '#projects', icon: FaLaptopCode },
        { name: 'Achievements', href: '#achievements', icon: FaTrophy },
        { name: 'Contact', href: '#contact', icon: FaEnvelope },
    ];

    return (
        <>
            {/* Desktop Vertical Sidebar */}
            <motion.aside
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-20 lg:w-24 glass border-r border-glass-border z-50 py-10 items-center justify-between"
            >
                <button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        window.history.pushState(null, '', window.location.pathname);
                        setTimeout(() => window.dispatchEvent(new Event('resetHeroTyping')), 100);
                    }}
                    className="text-2xl font-heading font-bold tracking-tighter cursor-pointer focus:outline-none mt-4 hidden lg:block"
                >
                    MANN<span className="text-primary">.</span>
                </button>
                <button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        window.history.pushState(null, '', window.location.pathname);
                        setTimeout(() => window.dispatchEvent(new Event('resetHeroTyping')), 100);
                    }}
                    className="text-xl font-heading font-bold tracking-tighter cursor-pointer focus:outline-none mt-4 lg:hidden"
                >
                    M<span className="text-primary">.</span>
                </button>

                <nav className="flex flex-col items-center gap-10 justify-center flex-grow w-full">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="relative group w-12 h-12 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <Icon size={20} />
                                {/* Accent line effect */}
                                <span className="absolute -left-[16px] lg:-left-[24px] top-1/2 -translate-y-1/2 w-[2px] h-0 bg-primary transition-all duration-300 group-hover:h-8" />

                                {/* Tooltip */}
                                <div className="absolute left-full ml-4 px-3 py-1.5 bg-black border border-glass-border rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                    {link.name}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="w-8 h-[1px] bg-glass-border mb-4" />
            </motion.aside>

            {/* Mobile Header (Horizontal) */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="md:hidden fixed top-0 left-0 right-0 z-50 glass py-4 px-6 border-b border-glass-border flex items-center justify-between"
            >
                <button
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        window.history.pushState(null, '', window.location.pathname);
                        setTimeout(() => window.dispatchEvent(new Event('resetHeroTyping')), 100);
                    }}
                    className="text-2xl font-heading font-bold tracking-tighter cursor-pointer focus:outline-none"
                >
                    MANN<span className="text-primary">.</span>
                </button>

                <button
                    className="text-gray-300 hover:text-white focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </motion.header>

            {/* Mobile Nav Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass backdrop-blur-xl border-t border-glass-border fixed top-[69px] left-0 right-0 shadow-2xl z-40 overflow-hidden"
                    >
                        <nav className="flex flex-col items-center py-6 gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
