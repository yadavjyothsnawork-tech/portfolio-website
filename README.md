# Portfolio — Jyothsna Yadav

This repository contains the static portfolio site for Jyothsna Yadav.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

## Deploy to GitHub Pages (recommended)

1. Create a repo on GitHub.
2. Push your local project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

3. On GitHub: Settings → Pages → Source → `main` branch / `/ (root)` → Save.

## Quick deploy alternatives
- Netlify: connect repo and deploy (no build step for static site).
- Surge: `npm i -g surge` then `surge` from project root.
- Vercel: import repo and deploy (select "Other" / static).

If you want me to push to a GitHub repo and enable Pages, provide the repo URL or allow me to run the push commands.
