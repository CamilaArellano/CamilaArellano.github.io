# Camila Arellano — Personal Portfolio

> Cybersecurity Research & Reports  
> [camilaarellano.github.io](https://camilaarellano.github.io/)

Personal portfolio and knowledge base built with Jekyll. I use this site to publish technical notes, security research, incident analyses, and hands-on lab projects.

## About

I'm a computer systems engineer specializing in cybersecurity, currently working as a Level 1 SOC Analyst. My areas of focus include:

- Security Operations (SOC)
- Open Source Intelligence (OSINT)
- Threat Detection & Incident Response
- Malware Analysis

## Tech Stack

- **Jekyll** — static site generator
- **GitHub Pages** — hosting
- Custom CSS with a cyberpunk/terminal aesthetic (no frameworks)

## Project Structure

```
.
├── _layouts/
│   ├── default.html      # Base layout with nav
│   └── post.html         # Blog post layout
├── _includes/
│   └── about.md          # About section content
├── _posts/               # Blog posts (YYYY-MM-DD-title.md)
├── assets/
│   ├── css/style.css     # All styles
│   ├── js/terminal.js    # Terminal + live log animations
│   └── logo.png          # Hero logo
├── _config.yml           # Jekyll configuration
└── index.html            # Homepage
```

## Running Locally

```bash
gem install bundler jekyll
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Writing a New Post

Create a file in `_posts/` following the naming convention:

```
_posts/YYYY-MM-DD-post-title.md
```

With this front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
---
```

## Contact

- Email: [camila-are@proton.me](mailto:camila-are@proton.me)
- LinkedIn: [camila-arellano-a442982b7](https://www.linkedin.com/in/camila-arellano-a442982b7)
- GitHub: [CamilaArellano](https://github.com/CamilaArellano)

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.
