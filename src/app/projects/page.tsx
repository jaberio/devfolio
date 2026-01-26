import { getConfig } from '@/lib/config';
import { getGithubProjects, getTopStarredProjects } from '@/lib/github';
import { ProjectCard } from '@/components/ui/ProjectCard';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-static';

export default async function ProjectsPage() {
    const config = getConfig();

    // Get static projects (either dynamic top-starred or manual)
    let staticProjects = [];
    if (config.staticProjects.useDynamic) {
        const topStarred = await getTopStarredProjects(config.staticProjects.count);
        staticProjects = topStarred.map(repo => ({
            slug: repo.name,
            title: repo.name,
            description: repo.description,
            tech: [repo.language],
            language: repo.language,
            stars: repo.stars,
            github: repo.url,
        }));
    } else {
        staticProjects = config.staticProjects.manual;
    }

    // Get remaining GitHub projects (excluding top-starred ones if dynamic)
    const githubProjects = await getGithubProjects();
    const topStarredUrls = new Set(staticProjects.map(p => p.github));
    const remainingGithubProjects = githubProjects
        .filter(repo => !topStarredUrls.has(repo.url))
        .map(repo => ({
            slug: repo.name,
            title: repo.name,
            description: repo.description,
            tech: [repo.language],
            language: repo.language,
            stars: repo.stars,
            github: repo.url,
        }));

    const allProjects = [
        ...(config.features.useStaticProjects ? staticProjects : []),
        ...remainingGithubProjects
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <header className="mb-16">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl md:text-7xl font-black text-foreground mb-6"
                >
                    Projects
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
                >
                    A comprehensive collection of my open-source work, experiments, and tools.
                </motion.p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allProjects.map((project, i) => (
                    <ProjectCard
                        key={project.slug}
                        title={project.title}
                        description={project.description}
                        tech={project.tech}
                        link={project.github}
                        stars={project.stars}
                        language={project.language}
                        index={i}
                    />
                ))}
            </div>

            {allProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl p-12 text-center border border-dashed border-gray-300 dark:border-gray-800"
                >
                    <p className="text-gray-500 dark:text-gray-400 text-lg italic">
                        No projects found. Check back later!
                    </p>
                </motion.div>
            )}
        </div>
    );
}
