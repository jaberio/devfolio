import { Github, Twitter, Linkedin, Mail, Circle } from 'lucide-react';

export function Footer({ config }: { config: any }) {
    const year = new Date().getFullYear();
    const { footer, site } = config;

    return (
        <footer className="bg-surface-50 dark:bg-surface-50/20 border-t border-gray-100 dark:border-gray-800/60 py-24 mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {site.name}<span className="text-blue-600">{site.branding?.logoHighlight || '.'}</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm text-base leading-relaxed mb-6">
                            {site.branding?.tagline || site.description}
                        </p>
                        {footer.statusText && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-100 rounded-full border border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-500 dark:text-gray-400 shadow-sm transition-all hover:scale-105">
                                <Circle size={8} className="fill-green-500 text-green-500 animate-pulse" />
                                {footer.statusText}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-12">
                        <div className="flex gap-4">
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
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-surface-50 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-100 dark:border-gray-800 transition-all shadow-sm hover:-translate-y-1 active:scale-100"
                                    aria-label={link.label}
                                >
                                    <link.icon size={20} />
                                </a>
                            ))}
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-tight">
                                {footer.credits}
                            </p>
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                                <span>© {year} {site.name}</span>
                                {footer.showBuiltBy && (
                                    <div className="flex gap-4">
                                        <span>Built with Next.js</span>
                                        <span>Statically Generated</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
