'use client';

import { Send, Github, Twitter, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
            // Encode form data in the format Netlify expects
            const formElement = e.currentTarget;
            const formData = new FormData(formElement);

            // Convert FormData to URLSearchParams for proper encoding
            const params = new URLSearchParams();
            formData.forEach((value, key) => {
                params.append(key, value.toString());
            });

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString(),
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
                    className="p-8 md:p-12 rounded-[2rem] border border-gray-200 dark:border-slate-700/50 shadow-xl dark:shadow-2xl space-y-6"
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
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2.5">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-sm dark:shadow-none"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2.5">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-sm dark:shadow-none"
                            placeholder="john@example.com"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2.5">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all resize-none shadow-sm dark:shadow-none"
                            placeholder="Tell me about your project or inquiry..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20 active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100"
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
                            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 rounded-xl text-green-800 dark:text-green-300"
                        >
                            <CheckCircle size={20} className="flex-shrink-0" />
                            <span className="font-semibold">Message sent successfully! I'll get back to you soon.</span>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 rounded-xl text-red-800 dark:text-red-300"
                        >
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <span className="font-semibold">Failed to send message. Please try again or contact me at {email}</span>
                        </motion.div>
                    )}
                </form>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center py-10"
            >
                <h3 className="text-xl font-bold text-foreground mb-3">Other Channels</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm max-w-xs">
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
