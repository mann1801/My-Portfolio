import { prisma } from '@/lib/prisma';
import type { ContactMessage } from '@prisma/client';
import { FaUsers, FaEnvelope, FaProjectDiagram } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [messagesCount, projectsCount, skillsCount, messages]: [number, number, number, ContactMessage[]] = await Promise.all([
        prisma.contactMessage.count(),
        prisma.project.count(),
        prisma.skill.count(),
        prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20
        })
    ]);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard Data</h1>
                <p className="text-gray-400">Overview of your portfolio metrics and recent messages.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-2xl border-l-4 border-primary">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary"><FaEnvelope size={24} /></div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium">Total Messages</p>
                            <h3 className="text-2xl font-bold">{messagesCount}</h3>
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border-l-4 border-green-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><FaProjectDiagram size={24} /></div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium">Projects</p>
                            <h3 className="text-2xl font-bold">{projectsCount}</h3>
                        </div>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border-l-4 border-purple-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500"><FaUsers size={24} /></div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium">Tech Skills</p>
                            <h3 className="text-2xl font-bold">{skillsCount}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden flex flex-col mt-4">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold">Recent Messages</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-sm border-b border-white/5">
                                <th className="p-4 font-medium min-w-[150px]">Date</th>
                                <th className="p-4 font-medium min-w-[200px]">Sender</th>
                                <th className="p-4 font-medium">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-gray-500">
                                        No messages received yet.
                                    </td>
                                </tr>
                            ) : (
                                messages.map((msg) => (
                                    <tr key={msg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-sm text-gray-400">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-medium text-white">{msg.name}</p>
                                            <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
                                        </td>
                                        <td className="p-4 text-sm text-gray-300 max-w-md">
                                            {msg.message}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
