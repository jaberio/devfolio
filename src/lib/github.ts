import { getConfig } from './config';

interface GithubRepo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    fork: boolean;
    topics: string[];
}

export interface ProjectData {
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string;
    topics: string[];
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

        if (!response.ok) {
            // Enhanced error logging
            const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
            const rateLimitReset = response.headers.get('x-ratelimit-reset');

            if (response.status === 403 && rateLimitRemaining === '0') {
                const resetDate = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleString() : 'unknown';
                console.error(`GitHub API rate limit exceeded. Resets at: ${resetDate}`);
                console.error('Consider adding a GITHUB_TOKEN environment variable to increase rate limits.');
            } else {
                console.error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            return [];
        }

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
                // Ensure language is never null/undefined. GitHub API returns null for some repos.
                language: repo.language || "code",
                topics: repo.topics || [],
            }));
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        if (error instanceof Error) {
            console.error("Error details:", error.message);
        }
        return [];
    }
}

/**
 * Fetches the top N repositories sorted by star count
 * @param limit Number of top repos to return
 * @returns Array of top-starred projects
 */
export async function getTopStarredProjects(limit: number = 3): Promise<ProjectData[]> {
    try {
        const headers: HeadersInit = {};
        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        }

        const config = getConfig();
        const response = await fetch(`https://api.github.com/users/${config.github.username}/repos?per_page=100`, {
            headers,
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`GitHub API error: ${response.status} ${response.statusText}`);
            return [];
        }

        const repos = await response.json() as GithubRepo[];

        // Filter out forks and sort by stars (descending)
        return repos
            .filter((repo) => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, limit)
            .map((repo) => ({
                name: repo.name,
                description: repo.description || "",
                url: repo.html_url,
                stars: repo.stargazers_count,
                language: repo.language || "code",
                topics: repo.topics || [],
            }));
    } catch (error) {
        console.error("Error fetching top-starred projects:", error);
        return [];
    }
}
