# Schysch's Archiv

A private download archive webapp for Minecraft worlds and Abitur videos.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Container:** Docker + NGINX

## Installation (Local)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Build

```bash
# Production build
npm run build

# Build Docker image
docker build -t schymon/archive-webapp:latest .
```

## Configuration

### Environment Variables

- `VITE_CONFIG_URL` (optional)
  - **Local dev:** not set → uses embedded `sampleConfig`
  - **Server:** `/content.json` → loads from server

### content.json Structure

The `content.json` controls all content:

```json
{
  "categories": [
    {
      "id": "minecraft-worlds",
      "title": "Minecraft Worlds",
      "items": [
        {
          "id": "world-1",
          "title": "My World",
          "image": "/images/image.jpg",
          "downloads": [
            {
              "label": "Download",
              "url": "/downloads/world1.zip",
              "passwordRequired": false,
              "password": "",
              "passwordHint": "Optional: Hint for password"
            }
          ]
        }
      ]
    }
  ]
}
```

### Folder Structure on Server (Example)

```
/opt/<your-project-folder>/
├── content.json    # Content configuration
├── downloads/      # Download files (.zip, .mp4, etc.)
└── images/         # Images for cards
```

## Docker Deployment

### Docker Compose

```yaml
services:
  archive-webapp:
    image: schymon/archive-webapp:latest
    container_name: archive-webapp
    ports:
      - "3000:80"
    volumes:
      - /opt/YourFolder/content.json:/usr/share/nginx/html/content.json:ro
      - /opt/YourFolder/downloads:/usr/share/nginx/html/downloads:ro
      - /opt/YourFolder/images:/usr/share/nginx/html/images:ro
    environment:
      - VITE_CONFIG_URL=/content.json
    restart: unless-stopped
```

### Docker Hub Push (Manual)

```bash
docker build -t schymon/archive-webapp:latest .
docker push schymon/archive-webapp:latest
```

## GitHub Actions

Automatic build and push on merge to `main`:

1. GitHub Repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Docker Hub Access Token

## Git Workflow

### Branches

- **`main`** - Production branch (triggers Docker build & push)
- **`dev`** - Development branch (work here)

### Workflow

```bash
# 1. Work on dev branch
git checkout dev
# ... make your changes ...

# 2. When ready to release, merge to main
# (via GitHub PR or directly)

# 3. Keep dev up to date with main
git checkout dev
git pull origin main
```

## Version

Current version: **1.0.4** (see `src/components/Navbar.tsx`)

## Project Structure

```
archive-webapp/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Navbar.tsx
│   │   ├── DownloadCard.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── fetchConfig.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── config.ts
│   ├── App.tsx
│   └── main.tsx
├── data/
│   └── content.json    # Sample content
├── public/
│   └── images/         # Local sample images
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Features

- Download cards with password protection
- Password hint for protected downloads
- Light mode design
- shadcn/ui components
- Skeleton loading states
- Responsive design
- Docker-ready for Coolify/Self-Hosted