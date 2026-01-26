import { Github, Twitter, Linkedin, Mail, Circle } from 'lucide-react';
import { SiteConfig } from '@/lib/config';

export function Footer({ config }: { config: SiteConfig }) {
    const year = new Date().getFullYear();
    const { footer, site } = config;

    return (
        <footer className="bg-gradient-to-b from-transparent to-surface-50/50 dark:to-slate-900/30 border-t border-gray-200/50 dark:border-gray-800/50 py-16 mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-1">
                        <h2 className="text-2xl font-bold text-foreground mb-3">
                            {site.name}<span className="text-blue-600 dark:text-blue-400">{site.branding?.logoHighlight || '.'}</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xs text-sm leading-relaxed mb-4">
                            {site.branding?.tagline || site.description}
                        </p>
                        {footer.statusText && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 shadow-sm backdrop-blur-sm">
                                <Circle size={6} className="fill-green-500 text-green-500 animate-pulse" />
                                {footer.statusText}
                            </div>
                        )}
                    </div>

                    {/* Social Links Section */}
                    <div className="flex flex-col items-center gap-6 lg:col-span-1">
                        <div className="flex gap-3">
                            {[
                                { icon: Github, href: `https://github.com/${config.social.github}`, label: 'GitHub' },
                                { icon: Twitter, href: `https://twitter.com/${config.social.twitter}`, label: 'Twitter' },
                                { icon: Linkedin, href: `https://linkedin.com/in/${config.social.linkedin}`, label: 'LinkedIn' },
                                { icon: Mail, href: `mailto:${config.social.email}`, label: 'Email' },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center w-11 h-11 rounded-xl bg-white/80 dark:bg-slate-800/80 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm"
                                    aria-label={link.label}
                                >
                                    <link.icon size={18} className="transition-transform group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Credits Section */}
                    <div className="flex flex-col items-center lg:items-end gap-3 text-center lg:text-right lg:col-span-1">
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                            {footer.credits}
                        </p>
                        <div className="flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-500">
                            <span className="font-semibold">© {year} {site.name}</span>
                            {footer.showBuiltBy && (
                                <div className="flex flex-wrap justify-center lg:justify-end gap-3 text-[10px] font-medium uppercase tracking-wider">
                                    <span className="text-gray-400 dark:text-gray-600">Built with Next.js</span>
                                    <span className="text-gray-300 dark:text-gray-700">•</span>
                                    <span className="text-gray-400 dark:text-gray-600">Statically Generated</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
