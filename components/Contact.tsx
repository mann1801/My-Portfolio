'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 relative z-10 w-full">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 w-full overflow-hidden">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 break-words">
                        Let's <span className="text-primary">Connect</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg px-4 break-words">
                        Interested in collaboration or have a project in mind? Feel free to reach out. I'm always open to discussing new opportunities, especially in AI and full-stack development.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto glass p-6 sm:p-8 md:p-12 rounded-3xl w-full"
                >
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center h-full min-h-[400px]">
                            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                                <FaPaperPlane size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-8 px-6 py-2 border border-glass-border rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col gap-2 flex-grow">
                                    <label htmlFor="name" className="text-sm text-gray-400 font-medium">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 flex-grow">
                                    <label htmlFor="email" className="text-sm text-gray-400 font-medium">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm text-gray-400 font-medium">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                    placeholder="Tell me about your project or inquiry..."
                                />
                            </div>

                            {status === 'error' && (
                                <p className="text-red-400 text-sm">There was an error sending your message. Please try again.</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="mt-4 w-full md:w-auto self-end bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                                {!status && <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
