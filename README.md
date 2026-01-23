# Devfolio

A clean, production-ready developer portfolio template built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **TypeScript**.

## 🚀 Features

- **YAML Config Driven**: Control the entire site's metadata, links, and features from a single `config.yml`.
- **SSG (Static Site Generation)**: 100% pre-rendered pages for maximum performance and SEO.
- **GitHub Integration**: Automatically fetch repositories at build time.
- **Markdown Blog**: Write posts in markdown with front-matter support and syntax highlighting.
- **Feature Toggles**: Easily enable/disable Static Projects, GitHub Projects, or the Blog.
- **Dark/Light Mode**: Smooth theme switching using `next-themes`.
- **Responsive Design**: Fast and accessible UI built with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Data**: YAML (`js-yaml`) & Markdown (`gray-matter`, `remark`)
- **Theme**: `next-themes`

## 📁 Project Structure

```text
├── config.yml           # Central configuration
├── content/
│   └── blog/            # Markdown blog posts
├── src/
│   ├── app/             # App Router pages
│   ├── components/      # UI & Layout components
│   └── lib/             # Utilities (Config, GitHub API, Blog parser)
```

## ⚙️ Configuration (`config.yml`)

Edit the `config.yml` in the root directory to customize your site:

```yaml
site:
  name: "Your Name"
  title: "Your Title"
  description: "Your bio here"
  url: "https://yourdomain.com"

features:
  useStaticProjects: true
  useGithubProjects: true
  enableBlog: true

social:
  github: "yourusername"
  twitter: "yourusername"
  linkedin: "yourusername"
  email: "your@email.com"

github:
  username: "yourusername"
  pinnedOnly: false
  maxRepos: 6
```

## 📝 Writing Blog Posts

Add `.md` files to `content/blog/` with the following front-matter:

```markdown
---
title: "My Awesome Post"
date: "2026-01-23"
summary: "A brief summary of what this post is about."
---

Your content here...
```

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. (Optional) Add a `GITHUB_TOKEN` environment variable if you hit rate limits fetching repositories.
4. Deploy! Vercel will automatically run SSG during the build.

---

Built with ❤️ by Jaber.
