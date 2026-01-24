import { getConfig } from './config';

interface GithubRepo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    fork: boolean;
}

export interface ProjectData {
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string;
}

export async function getGithubProjects(): Promise<ProjectData[]> {
    const config = getConfig();
    if (!config.features.useGithubProjects) return [];

    try {
        const headers: HeadersInit = {};
        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        }

        const response = await fetch(`https://api.github.com/users/${config.github.username}/repos?sort=updated&per_page=100`, {
            headers,
            next: { revalidate: 3600 }
        });

        if (!response.ok) return [];

        const repos = await response.json() as GithubRepo[];

        let filteredRepos = repos;
        if (config.github.pinnedOnly) {
            // Simplified pinned logic for demo
            filteredRepos = repos.filter((repo) => !repo.fork && repo.stargazers_count > 0);
        }

        return filteredRepos
            .slice(0, config.github.maxRepos)
            .map((repo) => ({
                name: repo.name,
                description: repo.description || "",
                url: repo.html_url,
                stars: repo.stargazers_count,
                language: repo.language || "Unknown",
            }));
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        return [];
    }
}
