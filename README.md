# Sarang Portfolio

Responsive React portfolio built with Vite and ready for GitHub Pages. The portfolio content is stored in `portfolio-data.json` and bundled directly into the frontend.

## Run Locally

From this folder:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
npm run preview
```

## Deploy To GitHub Pages

1. Create a GitHub repository, for example `portfolio`.
2. Push this folder to the repository root.
3. In GitHub, open `Settings` > `Pages`.
4. Under `Build and deployment`, choose `GitHub Actions`.
5. Push to `main`. The workflow in `.github/workflows/deploy.yml` will build the React app and deploy `dist`.
6. GitHub will publish the site at `https://<your-username>.github.io/<repository-name>/`.

If the repository is named `<your-username>.github.io`, GitHub publishes it at `https://<your-username>.github.io/`.