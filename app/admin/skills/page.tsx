'use client';

import { useState, useEffect } from 'react';
import type { Skill } from '@prisma/client';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function SkillsAdmin() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ category: 'Programming', name: '', proficiency: 50 });

    const fetchSkills = async () => {
        try {
            const res = await fetch('/api/public/skills');
            const data = await res.json();
            setSkills(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;
        try {
            await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' });
            fetchSkills();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch('/api/admin/skills', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingId, ...formData })
                });
            } else {
                await fetch('/api/admin/skills', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            setIsAdding(false);
            setEditingId(null);
            setFormData({ category: 'Programming', name: '', proficiency: 50 });
            fetchSkills();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (skill: Skill) => {
        setFormData({
            category: skill.category,
            name: skill.name,
            proficiency: skill.proficiency
        });
        setEditingId(skill.id);
        setIsAdding(true);
        // Scroll to top where the form is
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ category: 'Programming', name: '', proficiency: 50 });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Skills Management</h1>
                    <p className="text-gray-400">Add, edit, or delete your technical skills.</p>
                </div>
                <button
                    onClick={() => {
                        if (isAdding) {
                            handleCancel();
                        } else {
                            setIsAdding(true);
                        }
                    }}
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
                >
                    <FaPlus /> {isAdding ? 'Cancel' : 'Add New Skill'}
                </button>
            </div>

            {isAdding && (
                <div className="glass p-6 rounded-2xl">
                    <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none"
                            >
                                <option>Programming</option>
                                <option>Frameworks</option>
                                <option>Tools</option>
                                <option>Databases</option>
                                <option>AI Tools</option>
                                <option>Networking</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Name</label>
                            <input
                                type="text" required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Proficiency ({formData.proficiency}%)</label>
                            <input
                                type="range" min="1" max="100" required
                                value={formData.proficiency}
                                onChange={e => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl w-fit transition-colors">
                                {editingId ? 'Update Skill' : 'Save Skill'}
                            </button>
                            {editingId && (
                                <button type="button" onClick={handleCancel} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl w-fit transition-colors">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-gray-400 text-sm border-b border-white/5">
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Category</th>
                            <th className="p-4 font-medium">Proficiency</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill) => (
                            <tr key={skill.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="p-4 font-medium">{skill.name}</td>
                                <td className="p-4 text-gray-400">{skill.category}</td>
                                <td className="p-4 text-primary">{skill.proficiency}%</td>
                                <td className="p-4 flex justify-end gap-3">
                                    <button onClick={() => handleEdit(skill)} className="text-blue-400 hover:text-blue-300 p-2 transition-colors"><FaEdit /></button>
                                    <button onClick={() => handleDelete(skill.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
