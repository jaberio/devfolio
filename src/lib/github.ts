import { getConfig } from './config';

export interface GithubRepo {
    name: string;
    description: string;
    stars: number;
    language: string;
    url: string;
    updatedAt: string;
}

export async function getGithubProjects(): Promise<GithubRepo[]> {
    const { config = getConfig() } = { config: getConfig() };
    const { github, features } = config;

    if (!features.useGithubProjects || !github.username) {
        return [];
    }

    try {
        const response = await fetch(
            `https://api.github.com/users/${github.username}/repos?sort=updated&per_page=100`,
            {
                next: { revalidate: false }, // Pure SSG
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    // Optional: Add GITHUB_TOKEN if provided in env
                    ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {}),
                },
            }
        );

        if (!response.ok) {
            if (response.status === 403) {
                console.error("GitHub API rate limit exceeded.");
            } else {
                console.error(`GitHub API error: ${response.statusText}`);
            }
            return [];
        }

        let repos = await response.json();

        // Filter for pinned if requested (simulated via stars/forks or explicit if we used GraphQL, but here we'll just filter valid ones)
        if (github.pinnedOnly) {
            // Note: REST API doesn't have a direct "pinned" filter easily. 
            // We'll just take the top ones by stars as a proxy or keep all if pinnedOnly is false.
            repos = repos.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
        }

        return repos
            .filter((repo: any) => !repo.fork)
            .slice(0, github.maxRepos)
            .map((repo: any) => ({
                name: repo.name,
                description: repo.description,
                stars: repo.stargazers_count,
                language: repo.language,
                url: repo.html_url,
                updatedAt: repo.updated_at,
            }));

    } catch (error) {
        console.error("Failed to fetch GitHub projects:", error);
        return [];
    }
}
