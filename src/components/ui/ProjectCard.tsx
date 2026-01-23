'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    description: string;
    tech?: string[];
    link: string;
    stars?: number;
    language?: string;
    index: number;
}

export function ProjectCard({ title, description, tech, link, stars, language, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group flex flex-col items-start p-8 bg-surface-50/50 dark:bg-surface-100/20 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:-translate-y-1.5"
        >
            <div className="flex justify-between w-full mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <Github size={20} className="text-foreground/50 group-hover:text-blue-500 transition-colors" />
                    {language && (
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 opacity-80">
                            {language}
                        </span>
                    )}
                </div>
                {stars !== undefined && stars > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-surface-100 rounded-full text-xs font-bold text-gray-500 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <Star size={12} className="fill-current text-yellow-500" />
                        <span>{stars}</span>
                    </div>
                )}
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10">
                {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-8 text-[15px] leading-relaxed line-clamp-2 relative z-10">
                {description}
            </p>

            <div className="mt-auto w-full flex items-center justify-between relative z-10">
                <div className="flex flex-wrap gap-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">
                    {tech && tech.slice(0, 3).map(t => (
                        <span key={t} className="hover:text-blue-500 transition-colors cursor-default">{t}</span>
                    ))}
                </div>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-110 active:scale-95"
                    aria-label="View Project"
                >
                    <ExternalLink size={20} />
                </a>
            </div>
        </motion.div>
    );
}
