---
title: "Mastering Tailwind CSS v4"
date: "2026-01-25"
summary: "A deep dive into the new features of Tailwind CSS v4, including the native engine and CSS-first configuration."
---

# The Future of CSS: Tailwind v4

Tailwind CSS v4 brings a revolutionary approach to styling with its new high-performance engine. This portfolio is already leveraging these modern capabilities.

## What's New?

- **CSS-First Configuration**: No more `tailwind.config.js`. Everything is now managed directly in your CSS files using the `@theme` block.
- **Native Engine**: Built from the ground up for speed, making large projects compile in milliseconds.
- **Improved Composability**: Better support for modern CSS features like container queries and logical properties.

### Configuration Example

Here is how we set up our theme in `globals.css`:

```css
@theme {
  --color-brand: #2563eb;
  --font-sans: "Inter", sans-serif;
}
```

Tailwind v4 makes developer experience smoother than ever!
