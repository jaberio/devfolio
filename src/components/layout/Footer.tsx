import { Github, Twitter, Linkedin, Mail, Circle } from 'lucide-react';
import { SiteConfig } from '@/lib/config';

export function Footer({ config }: { config: SiteConfig }) {
    const year = new Date().getFullYear();
    const { footer, site } = config;

    return (
        <footer className="glass-card backdrop-blur-2xl border-t border-surface-100/60 dark:border-surface-100/20 py-16 mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-1">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gradient mb-3 drop-shadow-sm">
                            {site.name}<span>{site.branding?.logoHighlight || '.'}</span>
                        </h2>
                        <p className="text-foreground/70 max-w-xs text-base leading-relaxed mb-4">
                            {site.branding?.tagline || site.description}
                        </p>
                        {footer.statusText && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 dark:bg-surface-50/30 rounded-full border border-surface-100 text-xs font-semibold text-green-700 dark:text-green-400 shadow-sm backdrop-blur-sm">
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
                                    className="group flex items-center justify-center w-11 h-11 rounded-2xl bg-surface-100/60 dark:bg-surface-50/30 text-foreground/60 hover:text-primary-color border border-surface-100 dark:border-surface-50 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 backdrop-blur"
                                    aria-label={link.label}
                                >
                                    <link.icon size={20} className="transition-transform group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Credits Section */}
                    <div className="flex flex-col items-center lg:items-end gap-3 text-center lg:text-right lg:col-span-1">
                        <p className="text-foreground/60 text-base font-medium">
                            {footer.credits}
                        </p>
                        <div className="flex flex-col gap-2 text-xs text-foreground/40">
                            <span className="font-semibold">© {year} {site.name}</span>
                            {footer.showBuiltBy && (
                                <div className="flex flex-wrap justify-center lg:justify-end gap-3 text-[10px] font-medium uppercase tracking-wider">
                                    <span className="text-foreground/40">Built with Next.js</span>
                                    <span className="text-foreground/30">•</span>
                                    <span className="text-foreground/40">Statically Generated</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
