# HireLens

HireLens is a full-stack applicant tracking and screening platform built for early-stage startups hiring their first 10-20 employees. It turns role requirements into structured scoring, supports async video interviews, and gives recruiting teams a clean pipeline for evaluating candidates without forcing live first-round scheduling.

## Product focus

This MVP is tailored for startup hiring teams that need:

- structured job requirements instead of vague job descriptions,
- consistent applicant scoring across a single role,
- fast candidate review without endless interview coordination,
- asynchronous recorded video responses for initial screening,
- a recruiter-friendly, transparent hiring pipeline.

## Core user roles

- Recruiter / Admin: define roles, review scorecards, move candidates through stages, manage comments and approvals.
- Candidate: apply to a role, answer screening questions, upload materials, and complete async video interview prompts.

## Visual system

The product uses the requested brand palette:

- Primary: #185FA5
- Secondary: #7F77DD
- Background: #F1EFE8
- Text: #2C2C2A

The layout is intentionally clean and operational, emphasizing trust, speed, and hiring signal quality rather than a generic ATS aesthetic.

## Architecture

- Frontend: Next.js 16 App Router + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Database: PostgreSQL + Prisma
- Cache and rate limiting: Redis
- Storage: S3-compatible object storage via presigned URLs
- Security: JWT auth, bcrypt password hashing, role guards, validation, and rate limiting

## Repository structure

- src/app — route-level pages for dashboard, candidate flow, and pipeline
- src/components/dashboard — extracted UI components for recruiter operations
- api/ — NestJS backend, Prisma schema, and service modules
- api/prisma/seed.ts — seed script for demo jobs and applicants
- api/.env.example — backend environment configuration

## Features in scope

- Auth and role-based access
- Job posting and requirement definition
- Candidate application flow
- Weighted score engine for role fit
- Pipeline board with drag-and-drop stage movement
- Async video review flow
- Scorecards and requirement breakdowns
- Presigned upload endpoints for resumes and videos
- Seeded demo data for local development

## Local development

1. Install app dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd api
   npm install
   ```

3. Create environment files:
   ```bash
   cp api/.env.example api/.env
   cp .env.example .env
   ```

4. Start PostgreSQL and Redis locally.

5. Run Prisma migrations and seed data:
   ```bash
   cd api
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed
   ```

6. Start the app and API:
   ```bash
   npm run dev
   cd api && npm run start:dev
   ```

7. Open the frontend at http://localhost:3000 and the API at http://localhost:4000.

## Demo data

The included seed script populates realistic role and applicant data so the recruiter dashboard and pipeline demonstrate real hiring workflow patterns without requiring a backend integration to be manually configured.

## Deployment notes

- Frontend: deploy to Vercel
- API: deploy to Railway, Render, or a Node-compatible container host
- Database: managed PostgreSQL
- Storage: S3-compatible bucket such as AWS S3 or MinIO
- Secrets: keep JWT and storage credentials in environment variables at the deployment layer

## Security notes

- Passwords are hashed with bcrypt.
- JWT access tokens are issued with role claims.
- Role-based authorization is enforced on protected routes.
- Request validation prevents malformed payloads.
- Rate limiting and CORS controls are included as part of the API foundation.

## Deliverables status

This repo includes the requested core deliverables:

- README documentation
- backend environment template
- Prisma seed script for demo data
- modular full-stack architecture
- recruiter dashboard and candidate flow pages
- API scaffolding for auth, jobs, applications, uploads, and scoring
