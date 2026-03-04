# Agentic SDLC Workshop — Facilitator Notes

**Duration:** 4 hours  
**Participants:** 5 (one per role)  
**Prerequisites:** GitHub accounts, repo access, Node.js 20+ installed

---

## Pre-Workshop Checklist (Day Before)

### Repository Setup
- [ ] Create a new GitHub repository — private
- [ ] Push all scaffold files from this repo to main branch
- [ ] Confirm `.github/copilot-instructions.md` exists on main
- [ ] Confirm `.github/agents/` has all 5 `.agent.md` files on main
- [ ] Confirm `.github/skills/` has all 5 `SKILL.md` files on main
- [ ] Confirm `AGENTS.md` exists on main
- [ ] Confirm `playwright.config.ts` exists at repo root
- [ ] Confirm `docs/design/.gitkeep` and `docs/test-reports/.gitkeep` exist

### GitHub Configuration
- [ ] Enable GitHub Copilot for the repository (repo settings → Copilot)
- [ ] Enable Copilot Coding Agent (repo settings → Copilot → Coding Agent → Enable)
- [ ] Enable custom agents (repo settings → Copilot → Agents → Enable)
- [ ] GitHub MCP server is built-in and enabled by default — no manual setup needed
- [ ] Verify GitHub MCP write permission is enabled
      repo settings → Copilot → Coding Agent → MCP permissions → Issues: Write
- [ ] Add all 5 participant GitHub accounts as collaborators with Write access

### Local Setup — Each Participant Machine
- [ ] `git clone <repo-url>`
- [ ] `cd src/backend && npm install`
- [ ] `cd src/frontend && npm install`
- [ ] `npm install` at repo root (for Playwright)
- [ ] `cd src/backend && cp .env.example .env`
- [ ] `cd src/backend && npx prisma migrate dev --name init`
- [ ] `cd src/backend && npx prisma db seed`
- [ ] `cd src/backend && npm run dev` → confirm running on port 3001
- [ ] `cd src/frontend && npm run dev` → confirm running on port 5173
- [ ] Open `http://localhost:5173` → login with `test@foodorder.com / password123`
- [ ] Confirm the app loads and auth works

### Verify Agents Work
- [ ] Go to github.com → repo → Copilot → Agents
- [ ] Confirm all 5 custom agents appear in the dropdown
- [ ] Confirm Copilot Coding Agent is available when assigning an Issue
- [ ] Do a test run: assign brd-agent with a dummy instruction, confirm it responds

---

## Workshop Schedule

| Time | Phase | Activity |
|------|-------|----------|
| 0:00–0:15 | Intro | Facilitator presents agentic SDLC concept |
| 0:15–0:30 | Setup | Participants clone repo, verify app runs locally |
| 0:30–0:50 | Phase 1 | PM runs brd-agent and user-story-agent |
| 0:50–1:10 | Phase 2 | Architect runs design-agent, assigns DATABASE Issue |
| 1:10–1:50 | Phase 3 | Backend Dev and UI Dev assign Issues to Coding Agent (parallel) |
| 1:50–2:05 | Phase 4 | Backend Dev runs unit-test-agent |
| 2:05–2:25 | Phase 5 | QA runs playwright-agent, executes tests |
| 2:25–2:35 | Demo | Group watches Playwright visual runner projected on screen |
| 2:35–3:00 | Debrief | Facilitated discussion |

---

## Intro Talking Points (15 min)

**The concept:**
> "Today you will build a working, tested feature using AI agents at every
> step of the SDLC. You are not pair programming with AI. You are directing
> autonomous agents that do the work and raise PRs for you to review."

**Key distinction — make this explicit:**
> "These agents are not chat assistants. You do not have a conversation
> with them. You assign them a task, they go away, do the work in the
> background, and come back with a Pull Request. Your job is to review
> and merge — or reject and reassign with feedback."

**The human role:**
> "The goal is not to remove developers. It is to shift the developer's
> role from writing every line to reviewing, guiding, and making
> architectural decisions. The PR review gate is your checkpoint.
> The agents handle the repetitive scaffolding. You focus on quality."

**Show the pipeline on screen** before starting:
```
Issue #1 → BRD → 4 Issues → Design Doc → DATABASE → BACKEND → FRONTEND → Tests
```

---

## Issue #1 — Create This Before Workshop Starts

Go to GitHub → New Issue → paste this exactly.

**Title:**
```
[REQUIREMENT] Add to Cart
```

**Body:**
```
## Feature Name
Add to Cart

## Business Context
FoodOrder needs a cart feature so customers can collect items from a
restaurant menu before placing an order. Without a cart, customers
cannot select multiple items in a single session.

## What Users Can Do
- Browse a list of available restaurants
- View the menu for a selected restaurant
- Add a menu item to their cart
- View current cart contents in a slide-out drawer
- Remove items from the cart
- See a running item count on the cart icon in the navigation bar

## Out of Scope
- Payment processing
- Order submission
- Delivery tracking
- Browsing multiple restaurants in one cart session

## Acceptance Criteria
- [ ] Logged-in users can add items from a restaurant menu to their cart
- [ ] Cart icon in navbar shows current item count
- [ ] Cart drawer shows all items with name, price and quantity
- [ ] Users can remove individual items from the cart
- [ ] Cart persists for the duration of the session
```

Add label: `requirement` — then submit.

---

## Phase-by-Phase Facilitation Notes

### Phase 1 — PM (0:30–0:50)

**Watch for:** PM trying to chat back and forth with the agent.
Remind them — one clear instruction, then wait. Do not keep adding messages.

**Common issue:** brd-agent raises PR but BRD is vague or missing sections.
PM can add a review comment: "Expand functional requirements with specific
acceptance criteria." Agent will update the PR.

**Common issue:** user-story-agent creates Issues but they are thin.
Check: does the [BACKEND] Issue list all 6 API endpoints? Does [PLAYWRIGHT]
describe a step-by-step journey? If not, PM can comment on the Issue and
reassign the agent with: "Expand the [BACKEND] Issue to include all API
endpoint definitions with HTTP methods and paths."

**Gate to Phase 2:** All 4 Issues visible on the Issues tab with acceptance criteria.

---

### Phase 2 — Architect (0:50–1:10)

**Watch for:** design-agent producing a schema without defining relations.
Architect should verify CartItem has both `cartId` and `menuItemId` as
foreign keys with explicit `@relation` decorators.

**Watch for:** data-testid values missing from the component tree in design-doc.
This will break Phase 5. If missing, Architect should comment on the PR
requesting: "Add data-testid values to the component tree section."

**Common issue:** Mermaid diagrams render with syntax errors.
Not a blocker — merge and move on. Note it in debrief as a quality gap.

**Critical gate:** DATABASE PR must be merged before Phase 3 starts.
Backend Dev cannot write API code without Cart models in the schema.
Hold Phase 3 until you confirm migration ran: `npx prisma generate` should
show Cart and CartItem in the generated client.

---

### Phase 3 — Backend Dev + UI Dev (1:10–1:50)

**This phase runs in parallel.** Both can assign their Issues at the same time.
UI Dev will wait idle once their Issue is assigned — their components will
not work until the BACKEND PR merges. That is fine — use the time to review
the design doc and prepare for the PR review.

**Watch for Backend Dev:** Coding Agent sometimes puts all logic in the route
file rather than separating into controller and service. Not a blocker for
the workshop — but call it out in debrief as an architecture concern.

**Watch for UI Dev:** Missing `data-testid` attributes on components.
If the reviewer catches this in PR review — have them request changes with
specific comment: "Add data-testid='cart-icon' to CartIcon component."
This is a good teaching moment about the PR review gate working as intended.

**Common issue:** CORS error when frontend calls backend.
Confirm `src/frontend/vite.config.ts` proxy is pointing to `http://localhost:3001`.
Confirm backend is running on port 3001 not another port.

**Common issue:** Prisma client not regenerated after DATABASE migration.
Run `cd src/backend && npx prisma generate` to fix.

**Gate to Phase 4:** Both BACKEND and FRONTEND PRs merged.
Verify manually: login → browse restaurant → add item → cart count updates → drawer opens.

---

### Phase 4 — Backend Dev (1:50–2:05)

**Watch for:** unit-test-agent generating tests that only check status codes.
Good tests validate response shape. Point to a specific test and ask:
"What does this test tell us about the shape of the response?"

**Common issue:** Tests fail because the test database has no seed data.
The `beforeAll` login step requires `test@foodorder.com` to exist.
If seed was not run: `cd src/backend && npx prisma db seed`.

**Common issue:** Jest cannot find Prisma client.
Run `npx prisma generate` first to ensure the client reflects the latest schema.

**Gate to Phase 5:** `npm run test` passes — all green.

---

### Phase 5 — QA (2:05–2:25)

**Watch for:** playwright-agent using CSS class selectors instead of data-testid.
This violates the skill instructions. Have QA request changes on the PR:
"All selectors must use data-testid attributes per the skill instructions."
Good governance teaching moment — the agent can be corrected via PR review.

**Common issue:** Tests fail because data-testid values in tests do not
match what was implemented. Walk through the failure:
- design-agent defined testid values in design-doc
- UI Dev should have followed them
- playwright-agent reads them from design-doc
Find where the chain broke. This is one of the best learning moments in the workshop.

**Common issue:** Both dev servers must be running for tests to pass.
Confirm: backend on 3001, frontend on 5173 before running.

**Gate to demo:** At least the happy path test passes in `--ui` mode.
Partial pass is fine — run the demo with what works.

---

## Demo Moment (2:25–2:35)

Project the screen. Run from the repo root:

```bash
npm run test:e2e:ui
```

Walk the group through each test executing in the browser. Narrate:
- "This login step was generated by playwright-agent reading the design doc"
- "This data-testid was defined by design-agent and implemented by UI Dev"
- "This assertion was written by playwright-agent from the [PLAYWRIGHT] Issue"

After the run, open the report:

```bash
npm run test:e2e:report
```

Show `docs/test-reports/index.html` — a shareable artefact of the workshop.

---

## Debrief Questions (25 min)

**On agent quality:**
- Where did an agent produce output that needed human correction?
- What would have happened if you merged without reviewing?
- Which agent produced the highest quality output? Why?

**On the pipeline:**
- Where did a dependency in the wrong order cause a problem?
- How did the data-testid convention flow from design-agent to playwright-agent?
- What would break if copilot-instructions.md was missing?

**On human judgment:**
- What decisions required human judgment that the agent could not make?
- Was the PR review gate effective as a quality checkpoint?
- What would you add to the agent instructions to improve output quality?

**On governance:**
- Who owns quality in this pipeline?
- If a test fails in production, which agent is responsible?
- How would you add a security review step to this pipeline?

---

## Troubleshooting Reference

| Problem | Cause | Fix |
|---------|-------|-----|
| Agent not in dropdown | `.agent.md` not on main branch | Push `.github/agents/` to main |
| MCP Issues not created | MCP server not connected or wrong tool names | Verify GitHub MCP in repo settings |
| Prisma migration error | Old db file conflict | Delete `dev.db`, re-run `prisma migrate dev --name init` |
| CORS error frontend→backend | Wrong proxy config or wrong port | Check `vite.config.ts` proxy → `http://localhost:3001` |
| Playwright tests fail | data-testid mismatch | Compare testids in design-doc vs component vs test |
| Playwright tests fail | Servers not running | Confirm backend 3001 and frontend 5173 are both up |
| Coding Agent no PR | Agent not enabled | Repo settings → Copilot → Coding Agent → Enable |
| `npm run test` fails | No seed data | Run `cd src/backend && npx prisma db seed` |
| Report not generated | `docs/test-reports/` missing | Run `mkdir -p docs/test-reports` at repo root |
| Prisma client stale | Schema changed, client not regenerated | Run `cd src/backend && npx prisma generate` |
