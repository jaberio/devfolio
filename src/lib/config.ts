import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface SiteConfig {
  site: {
    name: string;
    title: string;
    description: string;
    url: string;
    branding: {
      primaryColor: string;
      fontSans: string;
      logoName: string;
      logoHighlight: string;
      tagline: string;
    };
  };
  footer: {
    credits: string;
    statusText: string;
    showBuiltBy: boolean;
  };
  features: {
    useStaticProjects: boolean;
    useGithubProjects: boolean;
    enableBlog: boolean;
  };
  social: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
  profile: {
    bio: string;
    skills: string[];
  };
  staticProjects: Array<{
    slug: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    stars?: number;
    language?: string;
  }>;
  github: {
    username: string;
    pinnedOnly: boolean;
    maxRepos: number;
  };
  blog: {
    contentPath: string;
  };
}

const DEFAULT_CONFIG: SiteConfig = {
  site: {
    name: "Developer",
    title: "Portfolio",
    description: "Welcome to my portfolio",
    url: "https://example.com",
    branding: {
      primaryColor: "#2563eb",
      fontSans: "Inter",
      logoName: "jaberio",
      logoHighlight: ".dev",
      tagline: "Building digital experiences that matter.",
    }
  },
  footer: {
    credits: "Crafted with passion",
    statusText: "Available for new opportunities",
    showBuiltBy: true,
  },
  features: {
    useStaticProjects: true,
    useGithubProjects: false,
    enableBlog: false,
  },
  social: {
    github: "",
    twitter: "",
    linkedin: "",
    email: "",
  },
  profile: {
    bio: "",
    skills: [],
  },
  staticProjects: [],
  github: {
    username: "",
    pinnedOnly: true,
    maxRepos: 6,
  },
  blog: {
    contentPath: "content/blog",
  },
};

export function getConfig(): SiteConfig {
  try {
    const configPath = path.join(process.cwd(), 'config.yml');
    if (!fs.existsSync(configPath)) {
      console.warn("config.yml not found, using default configuration.");
      return DEFAULT_CONFIG;
    }
    const fileContents = fs.readFileSync(configPath, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = yaml.load(fileContents) as any;

    // Deep merge or manual merge to ensure defaults
    return {
      ...DEFAULT_CONFIG,
      ...config,
      site: {
        ...DEFAULT_CONFIG.site,
        ...config.site,
        branding: { ...DEFAULT_CONFIG.site.branding, ...config.site?.branding }
      },
      footer: { ...DEFAULT_CONFIG.footer, ...config.footer },
      features: { ...DEFAULT_CONFIG.features, ...config.features },
      social: { ...DEFAULT_CONFIG.social, ...config.social },
      profile: { ...DEFAULT_CONFIG.profile, ...config.profile },
      github: { ...DEFAULT_CONFIG.github, ...config.github },
    };
  } catch (error) {
    console.error("Error loading config.yml:", error);
    return DEFAULT_CONFIG;
  }
}
