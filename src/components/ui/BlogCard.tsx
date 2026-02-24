'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogCardProps {
    title: string;
    summary: string;
    date: string;
    slug: string;
    index: number;
}

export function BlogCard({ title, summary, date, slug, index }: BlogCardProps) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <Link href={`/blog/${slug}`} className="group block">
                <article
                    className="glass-card p-6 rounded-2xl border border-surface-100/60 dark:border-surface-100/20 group-hover:border-primary-color transition-all duration-300 shadow-sm hover:shadow-2xl h-full flex flex-col cursor-pointer"
                    style={{ backdropFilter: 'var(--glass-blur)' }}
                >
                    <div className="flex items-center text-xs text-foreground/50 mb-3 gap-2">
                        <Calendar size={14} />
                        <time dateTime={date}>{formattedDate}</time>
                    </div>

                    <h3 className="text-xl font-extrabold tracking-tight text-gradient mb-2 group-hover:scale-[1.03] group-hover:drop-shadow transition-transform">
                        {title}
                    </h3>

                    <p className="text-foreground/70 mb-6 flex-grow line-clamp-3 text-base">
                        {summary}
                    </p>

                    <div className="flex items-center font-semibold text-primary-color group-hover:translate-x-1 transition-transform">
                        Read post <ArrowRight size={16} className="ml-1" />
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
