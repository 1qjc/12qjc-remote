# Remote Work Hub

Remote-only job platform focused on easy, fast, and safe job discovery.

## Stack
- Next.js App Router
- shadcn-style UI components + Tailwind CSS
- PostgreSQL + Prisma
- API routes for jobs, reports, and alerts

## Quick Start
1. Install dependencies:
   npm install
2. Copy env:
   cp .env.example .env
3. Generate Prisma client:
   npm run prisma:generate
4. Run app:
   npm run dev

## Core routes
- `/` home
- `/jobs` jobs list
- `/jobs/[id]` job detail
- `/post-job` employer post flow
- `/admin` moderation dashboard
