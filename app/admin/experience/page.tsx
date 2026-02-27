'use client';

import { useState, useEffect } from 'react';

type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  createdAt: string;
};
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function ExperienceAdmin() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        role: '', company: '', duration: '', description: ''
    });

    const fetchExperiences = async () => {
        try {
            const res = await fetch('/api/public/experience');
            const data = await res.json();
            setExperiences(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;
        try {
            await fetch(`/api/admin/experience?id=${id}`, { method: 'DELETE' });
            fetchExperiences();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch('/api/admin/experience', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingId, ...formData })
                });
            } else {
                await fetch('/api/admin/experience', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            setIsAdding(false);
            setEditingId(null);
            setFormData({ role: '', company: '', duration: '', description: '' });
            fetchExperiences();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (exp: Experience) => {
        setFormData({
            role: exp.role,
            company: exp.company,
            duration: exp.duration,
            description: exp.description
        });
        setEditingId(exp.id);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ role: '', company: '', duration: '', description: '' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Experience Management</h1>
                    <p className="text-gray-400">Add, edit, or delete your work experience.</p>
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
                    <FaPlus /> {isAdding ? 'Cancel' : 'Add Experience'}
                </button>
            </div>

            {isAdding && (
                <div className="glass p-6 rounded-2xl">
                    <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Role/Position</label>
                                <input type="text" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="Full Stack Developer" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Company</label>
                                <input type="text" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="Tech Company Inc." />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Duration</label>
                            <input type="text" required value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="June 2024 - Present" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Description</label>
                            <textarea required rows={5} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="Describe your responsibilities and achievements..." />
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl w-fit transition-colors">
                                {editingId ? 'Update Experience' : 'Save Experience'}
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
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Company</th>
                            <th className="p-4 font-medium">Duration</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiences.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    No experience entries yet. Add your first one!
                                </td>
                            </tr>
                        ) : (
                            experiences.map((exp) => (
                                <tr key={exp.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4 font-bold">{exp.role}</td>
                                    <td className="p-4 text-primary">{exp.company}</td>
                                    <td className="p-4 text-gray-400">{exp.duration}</td>
                                    <td className="p-4 flex justify-end gap-3">
                                        <button onClick={() => handleEdit(exp)} className="text-blue-400 hover:text-blue-300 p-2 transition-colors"><FaEdit /></button>
                                        <button onClick={() => handleDelete(exp.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
