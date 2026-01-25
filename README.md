# Devfolio

A clean, production-ready developer portfolio template built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **TypeScript**.

## 🚀 Features

- **YAML Config Driven**: Control the entire site's metadata, links, and features from a single `config.yml`.
- **SSG (Static Site Generation)**: 100% pre-rendered pages for maximum performance and SEO.
- **SEO Optimized**: Automatic sitemap, robots.txt, and enhanced Open Graph metadata.
- **Analytics Ready**: Built-in support for Google Analytics 4 and Vercel Analytics.
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

## 🔐 Environment Variables

Create a `.env.local` file in the root directory (use `.env.example` as template):

```bash
# GitHub Personal Access Token (Optional but recommended)
# Increases API rate limits from 60 to 5,000 requests/hour
# Create at: https://github.com/settings/tokens
# Required permissions: public_repo (read access to public repositories)
GITHUB_TOKEN=your_github_token_here

# Deployment Configuration
IS_GITHUB_PAGES=false
BASE_PATH=

# Site URL for SEO
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Creating a GitHub Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scope: **public_repo** (Access public repositories)
4. Copy the token and add it to `.env.local`


### Deployment Variables

- **`IS_GITHUB_PAGES`**: Set to `true` when deploying to GitHub Pages
- **`BASE_PATH`**: Custom basePath for subfolder hosting (e.g., `/portfolio`)
- **`NEXT_PUBLIC_SITE_URL`**: Your production URL for sitemap and SEO

### Analytics Variables

- **`NEXT_PUBLIC_GA_ID`**: Google Analytics 4 Measurement ID (format: `G-XXXXXXXXXX`)
- **`NEXT_PUBLIC_VERCEL_ANALYTICS`**: Set to `true` to enable Vercel Analytics

#### Setting up Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (starts with `G-`)
4. Add it to `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

#### Setting up Vercel Analytics

1. Deploy to Vercel
2. Enable Analytics in your project settings
3. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_VERCEL_ANALYTICS=true
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


## 📦 Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. Add environment variables:
   - `GITHUB_TOKEN` (optional, for higher API limits)
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
4. Deploy! Vercel will automatically run SSG during the build.

### GitHub Pages

1. Update your repository settings to enable GitHub Pages
2. Create a workflow file at `.github/workflows/deploy.yml`
3. Set environment variables in GitHub Secrets:
   - `IS_GITHUB_PAGES=true`
   - `BASE_PATH=/your-repo-name` (if using project pages)
4. Push to trigger the build and deployment

### Other Platforms (Netlify, Cloudflare Pages)

1. Connect your repository
2. Build command: `npm run build`
3. Output directory: `out` (for static export) or `.next` (for standard builds)
4. Add environment variables as needed

---

Built with ❤️ by Jaber.
