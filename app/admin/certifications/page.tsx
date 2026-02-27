'use client';

import { useState, useEffect } from 'react';
import type { Certification } from '@prisma/client';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function CertificationsAdmin() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', issuer: '', year: new Date().getFullYear() });

    const fetchCertifications = async () => {
        try {
            const res = await fetch('/api/public/certifications');
            const data = await res.json();
            setCertifications(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this certification?')) return;
        try {
            await fetch(`/api/admin/certifications?id=${id}`, { method: 'DELETE' });
            fetchCertifications();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch('/api/admin/certifications', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingId, ...formData })
                });
            } else {
                await fetch('/api/admin/certifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            setIsAdding(false);
            setEditingId(null);
            setFormData({ name: '', issuer: '', year: new Date().getFullYear() });
            fetchCertifications();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (cert: Certification) => {
        setFormData({
            name: cert.name,
            issuer: cert.issuer,
            year: cert.year
        });
        setEditingId(cert.id);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ name: '', issuer: '', year: new Date().getFullYear() });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Certifications Management</h1>
                    <p className="text-gray-400">Add, edit, or delete your professional certifications.</p>
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
                    <FaPlus /> {isAdding ? 'Cancel' : 'Add Certification'}
                </button>
            </div>

            {isAdding && (
                <div className="glass p-6 rounded-2xl">
                    <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Certification' : 'Add Certification'}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Name</label>
                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Issuer</label>
                            <input type="text" required value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Year</label>
                            <input type="number" required value={formData.year} onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl w-fit transition-colors">
                                {editingId ? 'Update Certification' : 'Save Certification'}
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
                            <th className="p-4 font-medium">Issuer</th>
                            <th className="p-4 font-medium">Year</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certifications.map((c) => (
                            <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="p-4 font-bold">{c.name}</td>
                                <td className="p-4 text-primary">{c.issuer}</td>
                                <td className="p-4 text-gray-400">{c.year}</td>
                                <td className="p-4 flex justify-end gap-3">
                                    <button onClick={() => handleEdit(c)} className="text-blue-400 hover:text-blue-300 p-2 transition-colors"><FaEdit /></button>
                                    <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
