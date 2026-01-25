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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            // Using !important to force update and bypass cache
            className="group glass-card flex flex-col items-start p-6 rounded-[2rem] h-full dark:!bg-slate-950/90 dark:hover:!bg-black"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex justify-between w-full mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                        <Github size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    {language && (
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300 opacity-90">
                            {language}
                        </span>
                    )}
                </div>
                {stars !== undefined && stars > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/50 dark:bg-blue-950/50 rounded-full text-xs font-bold text-gray-600 dark:text-blue-200 border border-blue-100 dark:border-blue-500/20 shadow-sm backdrop-blur-md">
                        <Star size={12} className="fill-blue-400 text-blue-400" />
                        <span>{stars}</span>
                    </div>
                )}
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10">
                {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300/90 mb-8 text-[15px] leading-relaxed line-clamp-2 relative z-10 font-medium">
                {description}
            </p>

            <div className="mt-auto w-full flex items-center justify-between relative z-10">
                <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {tech && tech.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-1 rounded-md bg-gray-100 dark:bg-blue-900/20 border border-gray-200 dark:border-blue-500/10">
                            {t}
                        </span>
                    ))}
                </div>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-all duration-300 shadow-sm"
                    aria-label="View Project"
                >
                    <ExternalLink size={18} />
                </a>
            </div>
        </motion.div>
    );
}
