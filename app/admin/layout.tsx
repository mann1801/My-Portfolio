'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaHome, FaChalkboardTeacher, FaProjectDiagram, FaTrophy, FaCertificate, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const navLinks = [
        { name: 'Dashboard', href: '/admin', icon: FaHome },
        { name: 'Education', href: '/admin/education', icon: FaGraduationCap },
        { name: 'Experience', href: '/admin/experience', icon: FaBriefcase },
        { name: 'Skills', href: '/admin/skills', icon: FaChalkboardTeacher },
        { name: 'Projects', href: '/admin/projects', icon: FaProjectDiagram },
        { name: 'Hackathons', href: '/admin/hackathons', icon: FaTrophy },
        { name: 'Certifications', href: '/admin/certifications', icon: FaCertificate },
    ];

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                // Force a full reload to clear middleware state completely
                window.location.href = '/admin/login';
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
            <aside className="w-full md:w-64 glass border-r border-glass-border flex flex-col pt-10 px-6 h-auto md:h-screen md:sticky top-0 z-20">
                <div className="mb-10 flex flex-col">
                    <Link href="/admin" className="text-2xl font-heading font-bold grid">
                        <span className="text-primary tracking-widest text-sm font-mono uppercase">Portfolio</span>
                        Dashboard
                    </Link>

                    <Link href="/" className="text-xs text-gray-500 hover:text-white mt-2 transition-colors flex items-center gap-1">
                        &larr; View Public Site
                    </Link>
                </div>

                <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 mb-auto">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap md:whitespace-normal"
                            >
                                <Icon className="text-primary" />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 md:mt-auto pb-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            <main className="flex-grow p-6 md:p-12 overflow-y-auto w-full">
                {children}
            </main>
        </div>
    );
}
