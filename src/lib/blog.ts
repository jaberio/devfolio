import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { getConfig } from './config';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    summary: string;
    content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getBlogPosts(): BlogPost[] {
    const { config = getConfig() } = { config: getConfig() };
    if (!config.features.enableBlog) return [];

    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || new Date().toISOString(),
                summary: data.summary || '',
            } as BlogPost;
        });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { config = getConfig() } = { config: getConfig() };
    if (!config.features.enableBlog) return null;

    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Convert markdown to HTML with syntax highlighting
        const processedContent = await remark()
            .use(remarkRehype)
            .use(rehypeHighlight)
            .use(rehypeStringify)
            .process(content);
        const contentHtml = processedContent.toString();

        return {
            slug,
            content: contentHtml,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            summary: data.summary || '',
        } as BlogPost;
    } catch (error) {
        console.error(`Error loading blog post ${slug}:`, error);
        return null;
    }
}
