'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@prisma/client';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '', description: '', tech_stack: '', architecture_overview: '',
        github_link: '', live_link: '', featured: false
    });

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/public/projects');
            const data = await res.json();
            setProjects(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dbData = {
                ...formData,
                tech_stack: formData.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
            };
            if (editingId) {
                await fetch('/api/admin/projects', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingId, ...dbData })
                });
            } else {
                await fetch('/api/admin/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dbData)
                });
            }
            setIsAdding(false);
            setEditingId(null);
            setFormData({ title: '', description: '', tech_stack: '', architecture_overview: '', github_link: '', live_link: '', featured: false });
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (project: Project) => {
        setFormData({
            title: project.title,
            description: project.description,
            tech_stack: project.tech_stack.join(', '),
            architecture_overview: project.architecture_overview || '',
            github_link: project.github_link || '',
            live_link: project.live_link || '',
            featured: project.featured
        });
        setEditingId(project.id);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ title: '', description: '', tech_stack: '', architecture_overview: '', github_link: '', live_link: '', featured: false });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Projects Management</h1>
                    <p className="text-gray-400">Add, edit, or delete your portfolio projects.</p>
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
                    <FaPlus /> {isAdding ? 'Cancel' : 'Add New Project'}
                </button>
            </div>

            {isAdding && (
                <div className="glass p-6 rounded-2xl">
                    <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Title</label>
                                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Tech Stack (comma separated)</label>
                                <input type="text" required value={formData.tech_stack} onChange={e => setFormData({ ...formData, tech_stack: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" placeholder="React, Node.js, Prisma" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Description</label>
                            <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Architecture Flow (e.g. Frontend -{'>'} Backend)</label>
                            <input type="text" value={formData.architecture_overview} onChange={e => setFormData({ ...formData, architecture_overview: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none" />
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Featured?</label>
                                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl w-fit transition-colors">
                                {editingId ? 'Update Project' : 'Save Project'}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="glass p-6 rounded-2xl flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <div className="flex gap-3">
                                <button onClick={() => handleEdit(project)} className="text-blue-400 hover:text-blue-300 p-2 transition-colors"><FaEdit /></button>
                                <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors"><FaTrash /></button>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                            {project.tech_stack.slice(0, 3).map(tech => (
                                <span key={tech} className="text-xs bg-white/10 px-2 py-1 rounded">{tech}</span>
                            ))}
                            {project.tech_stack.length > 3 && <span className="text-xs text-gray-500">+{project.tech_stack.length - 3}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
