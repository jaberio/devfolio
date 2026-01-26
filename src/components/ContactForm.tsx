'use client';

import { Mail, Send, Github, Twitter, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import * as motion from 'framer-motion/client';
import { useState, FormEvent } from 'react';

interface ContactFormProps {
    email: string;
    github: string;
    twitter: string;
}

export default function ContactForm({ email, github, twitter }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const form = e.currentTarget;
            const formDataObj = new FormData(form);

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formDataObj as any).toString(),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="p-8 md:p-12 rounded-[2rem] border border-gray-200 dark:border-gray-800 space-y-6"
                    style={{ backgroundColor: 'var(--card-bg)' }}
                >
                    {/* Netlify form detection */}
                    <input type="hidden" name="form-name" value="contact" />

                    {/* Honeypot for spam protection */}
                    <div className="hidden">
                        <label>
                            Don't fill this out if you're human: <input name="bot-field" />
                        </label>
                    </div>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="Tell me about your project or inquiry..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message <Send size={20} />
                            </>
                        )}
                    </button>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-800 dark:text-green-300"
                        >
                            <CheckCircle size={20} />
                            <span className="font-semibold">Message sent successfully! I'll get back to you soon.</span>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-300"
                        >
                            <AlertCircle size={20} />
                            <span className="font-semibold">Failed to send message. Please try again or email me directly.</span>
                        </motion.div>
                    )}
                </form>

                {/* Direct Email Option */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Or email me directly at
                    </p>
                    <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                        <Mail size={16} />
                        {email}
                    </a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center py-10"
            >
                <h3 className="text-xl font-bold text-foreground mb-3">Other Channels</h3>
                <p className="text-gray-500 dark:text-gray-500 mb-10 text-sm max-w-xs">
                    I&apos;m also active on these platforms for faster response times.
                </p>
                <div className="flex gap-6">
                    {[
                        { name: 'GitHub', href: `https://github.com/${github}`, icon: Github },
                        { name: 'Twitter', href: `https://twitter.com/${twitter}`, icon: Twitter },
                    ].map(platform => (
                        <a
                            key={platform.name}
                            href={platform.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-foreground font-bold text-xs uppercase tracking-[0.2em] transition-colors"
                        >
                            <platform.icon size={16} /> {platform.name}
                        </a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
