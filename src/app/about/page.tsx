import { getConfig } from '@/lib/config';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-static';

export default function AboutPage() {
    const config = getConfig();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <header className="mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-foreground mb-6"
                >
                    About Me
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl"
                >
                    I&apos;m {config.site.name}, a {config.site.title} passionate about crafting elegant code.
                </motion.p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="md:col-span-2 space-y-12">
                    <motion.section
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-blue-500/10 dark:border-blue-400/5">Background</h2>
                        <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-5 text-lg">
                            {config.profile.bio.split('\n').map((para, i) => para.trim() && (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-blue-500/10 dark:border-blue-400/5">Expertise</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            {config.profile.skills.map((item, i) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.05) }}
                                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group"
                                >
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
                                    <span className="font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.section>
                </div>

                <motion.aside
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8"
                >
                    <div className="p-8 bg-surface-50/50 dark:bg-surface-50/10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full" />
                        <h3 className="text-lg font-bold text-foreground mb-6 relative z-10">Follow Me</h3>
                        <div className="space-y-3 relative z-10">
                            {[
                                { name: 'GitHub', icon: Github, href: `https://github.com/${config.social.github}` },
                                { name: 'LinkedIn', icon: Linkedin, href: `https://linkedin.com/in/${config.social.linkedin}` },
                                { name: 'Twitter', icon: Twitter, href: `https://twitter.com/${config.social.twitter}` },
                                { name: 'Email', icon: Mail, href: `mailto:${config.social.email}` },
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-surface-100 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all group/link border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
                                >
                                    <span className="flex items-center gap-3 font-semibold text-[11px] uppercase tracking-widest">
                                        <link.icon size={18} /> {link.name}
                                    </span>
                                    <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.aside>
            </div>
        </div>
    );
}
