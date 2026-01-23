import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { getConfig } from '@/lib/config';
import { getGithubProjects } from '@/lib/github';
import { ProjectCard } from '@/components/ui/ProjectCard';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-static';

export default async function HomePage() {
  const config = getConfig();
  const githubProjects = await getGithubProjects();

  // Merge projects if both enabled
  const featuredProjects = [
    ...(config.features.useStaticProjects ? config.staticProjects : []),
    ...githubProjects.map(repo => ({
      slug: repo.name,
      title: repo.name,
      description: repo.description,
      tech: [],
      language: repo.language,
      stars: repo.stars,
      github: repo.url,
    }))
  ].slice(0, 6);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6 leading-[1.1]">
                Hi, I&apos;m <span className="text-blue-600 dark:text-blue-500">{config.site.name}</span>. <br />
                <span className="text-gray-400 dark:text-gray-500">{config.site.title}</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl"
            >
              {config.site.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            >
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/25 active:scale-95"
              >
                Explore Projects <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 dark:border-gray-800 text-base font-bold rounded-2xl text-gray-700 dark:text-gray-300 bg-background hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm active:scale-95"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background shapes */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 dark:opacity-10 pointer-events-none"
        >
          <div className="aspect-square w-[600px] bg-blue-600/40 rounded-full"></div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground mb-4">Featured Work</h2>
            <p className="text-gray-600 dark:text-gray-400">Handpicked projects and open-source contributions.</p>
          </div>
          <Link href="/projects" className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-bold hover:gap-2 transition-all">
            All Projects <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, i) => (
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
      </section>

      {/* GitHub Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="bg-blue-600/5 dark:bg-blue-900/10 rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border border-blue-600/10 dark:border-blue-900/30 overflow-hidden relative shadow-inner"
        >
          <div className="text-center md:text-left relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              Ready to <span className="text-blue-600">Collaborate?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md leading-relaxed">
              I&apos;m always open to new projects, open-source contributions, and technical discussions. Let&apos;s build something great together.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 relative z-10">
            <a
              href={`https://github.com/${config.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background rounded-2xl font-black hover:opacity-90 transition-all shadow-xl active:scale-95"
            >
              <Github size={24} /> github repo
            </a>
          </div>

          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        </motion.div>
      </section>
    </div>
  );
}
