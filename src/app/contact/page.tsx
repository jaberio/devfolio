import { getConfig } from '@/lib/config';
import { Mail, MessageSquare, Send, Github, Twitter } from 'lucide-react';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-static';

export default function ContactPage() {
    const config = getConfig();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <header className="mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter"
                >
                    Let's talk<span className="text-blue-600">.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Currently focusing on full-stack solutions and open source. Have an inquiry or just want to connect?
                </motion.p>
            </header>

            <div className="max-w-3xl mx-auto space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex flex-col items-center p-12 bg-surface-50/50 dark:bg-surface-50/10 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden group">
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            className="p-5 bg-white dark:bg-surface-100 rounded-2xl text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/5 mb-8 border border-gray-100 dark:border-gray-800"
                        >
                            <Mail size={40} />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Email Me</h3>
                        <p className="text-gray-500 dark:text-gray-500 mb-10 font-bold tracking-widest uppercase text-xs">{config.social.email}</p>
                        <a
                            href={`mailto:${config.social.email}`}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-2xl font-black hover:opacity-90 transition-all shadow-2xl active:scale-95"
                        >
                            Send Message <Send size={20} />
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
                        I'm also active on these platforms for faster response times.
                    </p>
                    <div className="flex gap-6">
                        {[
                            { name: 'GitHub', href: `https://github.com/${config.social.github}`, icon: Github },
                            { name: 'Twitter', href: `https://twitter.com/${config.social.twitter}`, icon: Twitter },
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
        </div>
    );
}
