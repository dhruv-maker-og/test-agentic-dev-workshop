# AGENTS.md

Instructions for GitHub Copilot Coding Agent when assigned a GitHub Issue in this repository.

## Before You Start
Read these files first:
1. `.github/copilot-instructions.md` — project context and standards
2. The assigned GitHub Issue — feature requirements and acceptance criteria
3. `docs/design/design-doc.md` — architecture and API contracts
4. `src/prisma/schema.prisma` — current data model

## What Is Pre-built — Do Not Touch
- `src/backend/middleware/auth.ts` — JWT middleware
- `src/backend/routes/auth.ts` — login and register routes
- `src/backend/index.ts` — Express app entry point
- `src/frontend/src/App.tsx` — React Router and auth guard
- `src/frontend/src/pages/LoginPage.tsx`
- `src/frontend/src/pages/RegisterPage.tsx`
- `src/prisma/schema.prisma` User, Restaurant, MenuItem models

## Issue Assignment Guide

### [DATABASE] Issues — Architect assigns
You are responsible for:
- Adding Cart and CartItem models to `src/prisma/schema.prisma`
- Running `npx prisma migrate dev --name add-cart`
- Running `npx prisma generate`

Do not touch backend or frontend files.

### [BACKEND] Issues — Backend Dev assigns
You are responsible for:
- `src/backend/routes/` — new route files only
- `src/backend/controllers/` — new controller files only
- `src/backend/services/` — new service files only

Always use existing auth middleware on protected routes.
Do not touch frontend files or schema.prisma.

### [FRONTEND] Issues — UI Dev assigns
You are responsible for:
- `src/frontend/src/pages/` — new page files only
- `src/frontend/src/components/` — new component files only
- `src/frontend/src/context/` — new context files only
- `src/frontend/src/services/` — new API service files only
- `src/frontend/src/components/Navbar.tsx` — add CartIcon only

All interactive elements must have `data-testid` attributes.
Do not touch backend files or schema.prisma.

## Implementation Order
Always implement in this order to avoid dependency failures:
1. [DATABASE] — schema must exist before API
2. [BACKEND] — API must exist before frontend
3. [FRONTEND] — connects to working API

## PR Conventions
- Link PR to the originating Issue
- PR title format: `feat: [feature name] [Issue type]`
- Run `npm run lint` before raising PR — fix all errors
- Run `npm run build` — confirm it succeeds
- Do not merge your own PR — leave for human review

## Run Commands
```bash
# Backend
cd src/backend && npm run dev

# Frontend  
cd src/frontend && npm run dev

# Database
npx prisma migrate dev
npx prisma generate
npx prisma db seed

# Tests
npm run test
npx playwright test
```
