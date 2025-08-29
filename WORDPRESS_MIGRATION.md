
# Migration Instructions for investeddatadiaries.wordpress.com Content

## Step 1: Export WordPress Content
1. Log in to your WordPress admin dashboard
2. Go to Tools → Export
3. Choose "All content" 
4. Download the export file (XML format)

## Step 2: Convert WordPress to Markdown
Use one of these methods:
- WordPress plugin: [WordPress to Hugo Exporter](https://github.com/SchumacherFM/wordpress-to-hugo-exporter)
- Command-line tool: [ExitWP](https://github.com/thomasf/exitwp) or [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown)

## Step 3: Organize Content
1. Move blog posts to: `/content/posts/`
2. Move book reviews to: `/content/resources/book-reviews/`
3. Move podcast summaries to: `/content/resources/podcast-summaries/`
4. Move AI-related content to: `/content/resources/ai-hacks/`
5. Move code snippets to: `/content/resources/code-corner/`

## Step 4: Update Front Matter
Each file should have front matter like:
```yaml
---
title: "Post Title"
date: YYYY-MM-DDT00:00:00Z
draft: false
categories: ["Category1", "Category2"]
tags: ["tag1", "tag2", "tag3"]
description: "Brief description of the post"
---
```

## Step 5: Update Image Paths
1. Move all images to: `/static/images/imported/`
2. Update image references in markdown to use: `/images/imported/filename.jpg`

## Step 6: Run Hugo Server to Test
```bash
hugo server
```

## Additional Resources
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)
