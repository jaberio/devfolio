import { getBlogPosts } from '@/lib/blog';
import { getConfig } from '@/lib/config';
import { BlogCard } from '@/components/ui/BlogCard';
import { notFound } from 'next/navigation';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-static';

export default function BlogPage() {
    const config = getConfig();

    if (!config.features.enableBlog) {
        notFound();
    }

    const posts = getBlogPosts();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <header className="mb-16">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl md:text-7xl font-black text-foreground mb-6"
                >
                    Blog
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                    Tech tutorials, industry insights, and developer logs.
                </motion.p>
            </header>

            <div className="flex flex-col gap-8">
                {posts.map((post, i) => (
                    <BlogCard
                        key={post.slug}
                        title={post.title}
                        summary={post.summary}
                        date={post.date}
                        slug={post.slug}
                        index={i}
                    />
                ))}

                {posts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl p-12 text-center border border-dashed border-gray-300 dark:border-gray-800"
                    >
                        <p className="text-gray-500 dark:text-gray-400 text-lg italic">
                            No blog posts found. Check back soon!
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
