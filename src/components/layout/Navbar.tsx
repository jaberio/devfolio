'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteConfig } from '@/lib/config';

export function Navbar({ config }: { config: SiteConfig }) {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const branding = config.site.branding;
    const logoName = branding?.logoName || "Devfolio";
    const logoHighlight = branding?.logoHighlight || ".dev";

    if (!mounted) {
        return (
            <nav className="sticky top-0 z-50 w-full glass-card backdrop-blur-xl border-b border-surface-100/60 dark:border-surface-100/20">
                <div className="h-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="text-2xl font-extrabold tracking-tight text-gradient drop-shadow-sm">{logoName}{logoHighlight}</div>
                </div>
            </nav>
        );
    }

    const navLinks = [
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog', enabled: config.features.enableBlog },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ].filter(link => link.enabled !== false);

    const isDark = resolvedTheme === 'dark';

    return (
        <nav className="sticky top-0 z-50 w-full glass-card backdrop-blur-xl border-b border-surface-100/60 dark:border-surface-100/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <Link href="/" className="text-2xl font-extrabold tracking-tight text-gradient drop-shadow-sm">
                            {logoName}{logoHighlight}
                        </Link>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="relative px-2 py-1 font-semibold text-foreground/80 hover:text-primary-color transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            className="ml-2 p-2 rounded-xl bg-surface-100/60 dark:bg-surface-50/30 text-foreground/70 hover:ring-2 hover:ring-primary-color transition-all"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>
                    </div>

                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            className="p-2 rounded-xl bg-surface-100/60 dark:bg-surface-50/30 text-foreground/70"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-foreground/70"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-card border-t border-surface-100/60 dark:border-surface-100/20 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 font-semibold text-foreground/80 hover:text-primary-color rounded-lg transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
