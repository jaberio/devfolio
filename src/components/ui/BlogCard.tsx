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
                <article className="p-6 bg-surface-50 dark:bg-surface-100 rounded-2xl border border-gray-200 dark:border-gray-800 group-hover:border-blue-500 dark:group-hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl h-full flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 gap-2">
                        <Calendar size={14} />
                        <time dateTime={date}>{formattedDate}</time>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3 text-sm">
                        {summary}
                    </p>

                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                        Read post <ArrowRight size={16} className="ml-1" />
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
