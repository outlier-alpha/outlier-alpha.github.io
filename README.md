# Outlier Alpha Blog

A modern, minimal blog built with Hugo and deployed on GitHub Pages.

## 🚀 Quick Start

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (latest version)
- [Git](https://git-scm.com/)
- GitHub account

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/outlieralpha/Weblog.git
cd Weblog
```

2. Start the Hugo development server:
```bash
hugo server -D
```

3. Open http://localhost:1313 in your browser

## 📝 Creating Content

### New Blog Post

```bash
hugo new posts/my-new-post.md
```

Edit the file in `content/posts/my-new-post.md` and set `draft: false` when ready to publish.

### Post Front Matter

```yaml
---
title: "Your Post Title"
date: 2025-01-30T10:00:00Z
draft: false
categories: ["Category1", "Category2"]
tags: ["tag1", "tag2", "tag3"]
author: "Your Name"
---
```

## 🎨 Theme Customization

The blog uses a custom minimal theme located in `themes/custom-minimal/`. 

Key files:
- `themes/custom-minimal/static/css/style.css` - Main styles
- `themes/custom-minimal/layouts/` - Template files
- `config.toml` - Site configuration

## 🚢 Deployment

This blog is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Initial Setup

1. Create a new repository on GitHub named `[username].github.io`

2. Initialize Git and push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[username]/[username].github.io.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions"

4. Update `config.toml`:
   - Change `baseURL` to `https://[username].github.io/`

### Automatic Deployment

Every push to the `main` branch triggers automatic deployment via GitHub Actions.

The workflow file is located at `.github/workflows/hugo.yml`.

### Custom Domain (Optional)

1. Add a `CNAME` file in the `static` directory with your domain:
```
yourdomain.com
```

2. Configure your domain's DNS:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
   - CNAME record: `[username].github.io`

3. Update `baseURL` in `config.toml` to your custom domain

4. Enable HTTPS in repository settings > Pages

## 📁 Project Structure

```
Weblog/
├── .github/
│   └── workflows/
│       └── hugo.yml        # GitHub Actions workflow
├── content/
│   ├── posts/             # Blog posts
│   ├── about.md          # About page
│   └── contact.md        # Contact page
├── themes/
│   └── custom-minimal/    # Custom theme
├── static/               # Static assets
├── config.toml          # Hugo configuration
├── .gitignore
└── README.md
```

## 🛠️ Configuration

Edit `config.toml` to customize:
- Site title and description
- Menu items
- Social links
- Author information
- Pagination settings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue or contact via the blog's contact page.

---

Built with ❤️ using [Hugo](https://gohugo.io/) and [GitHub Pages](https://pages.github.com/)
