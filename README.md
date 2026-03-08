# Agentic SDLC Workshop

A hands-on workshop where developers experience the complete software
development lifecycle using AI agents — from a business requirement to
a working, tested application.

## Workshop Overview

```
Issue #1 (requirement)
    ↓ brd-agent
BRD.md
    ↓ user-story-agent
GitHub Issues (per role per slice)
    ↓ design-agent
design-doc.md + schema additions
    ↓ Copilot Coding Agent
Feature API + UI components
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

## What Is Pre-built
- Authentication (login + register)
- JWT middleware
- User database model
- Test user via seed data
- React app shell with routing and Navbar
- HomePage placeholder

All domain models, API routes, UI components, and tests
are built during the workshop by agents.

## Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd workshop-app

# Install backend dependencies
cd src/backend && npm install

# Install frontend dependencies
cd ../frontend && npm install



# Set up database
cd src/backend
# Set up environment
cp .env.example .env
npx prisma migrate dev --name init
npx prisma db seed

# Start backend (port 3001)
npm run dev

# Start frontend (port 5173) — new terminal
cd src/frontend && npm run dev
```

## Test Credentials
- Email:    `test@example.com`
- Password: `password123`

## Agents Available
All agents are in `.github/agents/` and available on github.com:

| Agent | Purpose |
|-------|---------|
| brd-agent | Creates BRD from requirement Issue |
| user-story-agent | Creates GitHub Issues from BRD |
| design-agent | Creates design doc and schema additions |
| unit-test-agent | Generates Jest test suite |
| playwright-agent | Generates Playwright E2E tests |

## Workshop Materials
See `workshop/` for participant guide and facilitator notes.
