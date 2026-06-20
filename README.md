# homecoming

A quiet countdown to August 1, 2026, 05:00 — the day she's home.

Built with Create React App. Auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

## Local development

```bash
npm install
npm start
```

## Deployment

Deployment is automatic. Pushing to `main` triggers `.github/workflows/deploy.yml`,
which builds the app and publishes it to GitHub Pages.

One-time setup (only needed once per repo): in the GitHub repo, go to
**Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.

Live at: https://somnovem.github.io/homecoming
