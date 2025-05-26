Replace its contents with the following comprehensive README:

md

# Ad Variation Generator

**A** simple AI-powered web app that generates image & video ads, supports A/B testing, customization and analytics.

## _Setup Instructions_

1. **Fork & clone** this repo (see Submission Guidelines).
2. Copy `.env.example` to `.env` and set:
   REPLICATE_API_TOKEN=<your_token>

3. Build & run with Docker Compose:

```bash
docker-compose up --build
Visit:

Frontend → http://localhost:3000

Backend API → http://localhost:5000

🏗  *Architecture Explanation*
Backend

Flask app exposing REST endpoints:

/generate-images → Stable Diffusion via Replicate

/generate-video → Gen-2 text→video via Replicate

/submit-preference & /get-preferences → SQLite (SQLAlchemy) for A/B voting

In-memory cache to reuse identical prompts.

Frontend

React SPA with components:

ImageGenerator (image gen + vote UI)

VideoGenerator (video gen + download)

AnalyticsDashboard (vote-count table)

Containerization

Two Dockerfiles (backend & frontend) and a docker-compose.yml to tie them together.

🖼 *Model Selection Justification**
Images → stability-ai/stable-diffusion v1.5

Photorealistic, fast inference, well-supported on Replicate.

Video → runwayml/gen-2

State-of-the-art text→video diffusion, 5–15s outputs.
```

**Dockerfile**
Already provided service‐level Dockerfiles:

_backend/Dockerfile_

_frontend/Dockerfile_

orchestrated by _docker-compose.yml_
