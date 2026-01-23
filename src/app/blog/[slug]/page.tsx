import { getBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { getConfig } from '@/lib/config';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-static';

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.date,
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const config = getConfig();
    const { slug } = await params;

    if (!config.features.enableBlog) {
        notFound();
    }

    const post = await getBlogPostBySlug(slug);
    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Link href="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-12 font-medium group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to blog
                </Link>
            </motion.div>

            <header className="mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center text-gray-500 dark:text-gray-400 mb-4 gap-2"
                >
                    <Calendar size={18} />
                    <time dateTime={post.date}>{formattedDate}</time>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-black text-foreground leading-tight"
                >
                    {post.title}
                </motion.h1>
            </header>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="prose prose-blue max-w-none prose-headings:font-black prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-3xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}
