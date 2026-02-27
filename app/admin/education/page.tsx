'use client';

import { useState, useEffect } from 'react';

type Education = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpa: number;
  maxGpa: number;
  status: string;
  createdAt: string;
};
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function EducationAdmin() {
    const [education, setEducation] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        degree: '', institution: '', period: '', gpa: 0, maxGpa: 10, status: ''
    });

    const fetchEducation = async () => {
        try {
            const res = await fetch('/api/public/education');
            const data = await res.json();
            setEducation(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this education entry?')) return;
        try {
            await fetch(`/api/admin/education?id=${id}`, { method: 'DELETE' });
            fetchEducation();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch('/api/admin/education', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingId, ...formData })
                });
            } else {
                await fetch('/api/admin/education', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            setIsAdding(false);
            setEditingId(null);
            setFormData({ degree: '', institution: '', period: '', gpa: 0, maxGpa: 10, status: '' });
            fetchEducation();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (edu: Education) => {
        setFormData({
            degree: edu.degree,
            institution: edu.institution,
            period: edu.period,
            gpa: edu.gpa,
            maxGpa: edu.maxGpa,
            status: edu.status
        });
        setEditingId(edu.id);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ degree: '', institution: '', period: '', gpa: 0, maxGpa: 10, status: '' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Education Management</h1>
                    <p className="text-gray-400">Add, edit, or delete your education details.</p>
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
                    <FaPlus /> {isAdding ? 'Cancel' : 'Add Education'}
                </button>
            </div>

            {isAdding && (
                <div className="glass p-6 rounded-2xl">
                    <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Education' : 'Add Education'}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Degree</label>
                                <input type="text" required value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="B.Tech Computer Science" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Institution</label>
                                <input type="text" required value={formData.institution} onChange={e => setFormData({ ...formData, institution: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="LJ University" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Period</label>
                                <input type="text" required value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="August 2023 – August 2027" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Status</label>
                                <input type="text" required value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="Current Status: Semester 6." />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">GPA/CGPA</label>
                                <input type="number" step="0.01" required value={formData.gpa} onChange={e => setFormData({ ...formData, gpa: parseFloat(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Max GPA (e.g. 10 or 4.0)</label>
                                <input type="number" step="0.01" required value={formData.maxGpa} onChange={e => setFormData({ ...formData, maxGpa: parseFloat(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl w-fit transition-colors">
                                {editingId ? 'Update Education' : 'Save Education'}
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
                            <th className="p-4 font-medium">Degree</th>
                            <th className="p-4 font-medium">Institution</th>
                            <th className="p-4 font-medium">Period</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {education.map((edu) => (
                            <tr key={edu.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="p-4 font-bold">{edu.degree}</td>
                                <td className="p-4 text-primary">{edu.institution}</td>
                                <td className="p-4 text-gray-400">{edu.period}</td>
                                <td className="p-4 flex justify-end gap-3">
                                    <button onClick={() => handleEdit(edu)} className="text-blue-400 hover:text-blue-300 p-2 transition-colors"><FaEdit /></button>
                                    <button onClick={() => handleDelete(edu.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
