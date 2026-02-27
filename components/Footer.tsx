import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-glass-border bg-black/50 py-12 mt-20">
            <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
                <h2 className="text-2xl font-heading font-bold tracking-tighter mb-6">
                    MANN<span className="text-primary">SONI</span>
                </h2>

                <div className="flex gap-6 mb-6 text-gray-400">
                    <a href="https://github.com/mann1801" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/mannsoni181" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        <FaLinkedin size={24} />
                    </a>
                    {process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                        <a href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`} className="hover:text-white transition-colors">
                            <FaEnvelope size={24} />
                        </a>
                    )}
                    <a href="tel:+917861909355" className="hover:text-white transition-colors">
                        <FaPhone size={24} />
                    </a>
                </div>

                <div className="flex flex-col items-center gap-2 mb-4">
                    <a href="tel:+917861909355" className="text-gray-400 hover:text-primary transition-colors text-sm">
                        +91 7861909355
                    </a>
                </div>

                <p className="text-gray-500 text-sm text-center">
                    &copy; {year} Mann Soni | All rights reserved.
                </p>
            </div>
        </footer>
    );
}
