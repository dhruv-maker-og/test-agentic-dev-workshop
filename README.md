# FoodOrder — Agentic SDLC Workshop

A hands-on workshop where developers experience the complete software
development lifecycle using AI agents — from a 9-line requirement to
a working, tested application.

## Workshop Overview

```
Issue #1 (requirement)
    ↓ brd-agent
BRD.md
    ↓ user-story-agent
4 GitHub Issues
    ↓ design-agent
design-doc.md + schema.prisma
    ↓ Copilot Coding Agent
Cart API + React components
    ↓ unit-test-agent
Jest test suite
    ↓ playwright-agent
Playwright E2E tests
```

## Roles
| Role | Agent Used | Surface |
|------|-----------|---------|
| PM | brd-agent, user-story-agent | github.com |
| Architect | design-agent | github.com |
| Backend Dev | Copilot Coding Agent, unit-test-agent | github.com |
| UI Dev | Copilot Coding Agent | github.com |
| QA Engineer | playwright-agent | github.com |

## Feature Being Built
**Add to Cart** — customers browse restaurants, view menus, add items
to a cart, and manage their cart contents.

## What Is Pre-built

**Functional Features:**
- Complete authentication system (login + register pages + JWT middleware)
- Protected route wrapper in React
- Navbar shell (no functional components yet)

**Data Layer Only (no API or UI):**
- Database models: User, Restaurant, MenuItem (schema.prisma)
- Seed data: 2 restaurants, 6 menu items, 1 test user
- **Note:** Restaurant browsing and menu viewing are NOT implemented yet — these are built during the workshop

**Current State:**
- App opens to login page 
- After login, HomePage shows placeholder: "Restaurants and cart features coming soon..."

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url>
cd foodorderapp

# 2. Install and set up backend
cd src/backend
cp .env.example .env                 # create local environment file
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev                          # runs on port 3001 — keep this terminal open

# 3. Install and start frontend (open a new terminal)
cd src/frontend
npm install
npm run dev                        # runs on port 5173

# 4. Install Playwright (open a new terminal from repo root)
cd foodorderapp
npm install
```

## Test Credentials
- Email: `test@foodorder.com`
- Password: `password123`

## Agents Available
All agents are in `.github/agents/` and available on github.com:

| Agent | Purpose |
|-------|---------|
| brd-agent | Creates BRD from requirement Issue |
| user-story-agent | Creates GitHub Issues from BRD |
| design-agent | Creates design doc and schema |
| unit-test-agent | Generates Jest test suite |
| playwright-agent | Generates Playwright E2E tests |

## Workshop Materials
See `workshop/` for participant guide and facilitator notes.
