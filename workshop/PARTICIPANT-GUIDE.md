# Agentic SDLC Workshop — Participant Guide

**Duration:** 4 hours  
**Feature:** Add to Cart  
**Surface:** github.com/copilot/agents

---

## What You Are Building

A food ordering app where customers browse restaurants, view menus and add items
to a cart. You are building one specific feature — **Add to Cart** — from a
9-line requirement through to tested, working code.

Every step is driven by an AI agent. Your job is to guide, review and merge.

---

## How Agents Work

Agents are **not chat assistants**. They work autonomously in the background.

```
You assign a task to an agent on github.com
Agent reads the repo, does the work, raises a Pull Request
You review the PR and merge
Next person picks up from there
```

**To assign a task to a custom agent:**
1. Go to `github.com` → your repo
2. Click **Copilot** in the top nav → **Agents**
3. Select the agent from the dropdown
4. Type your instruction
5. Wait — the agent works in the background and raises a PR

**To assign an Issue to the built-in Coding Agent:**
1. Go to **Issues** → open the Issue
2. Right panel → **Assignees** → assign to **Copilot**
3. Wait — Copilot works autonomously and raises a PR

---

## Test Credentials

Pre-loaded via seed data — used by agents and for manual testing.

| Field | Value |
|-------|-------|
| Email | `test@foodorder.com` |
| Password | `password123` |

---

## Role Instructions

---

### 🟦 PM — Product Manager

**Your agents:** `brd-agent`, `user-story-agent`  
**Your surface:** github.com  
**Your dependency:** None — you go first

---

**Step 1 — Create the BRD**

The facilitator has created Issue #1 with the feature requirement.
Your job is to turn that into a proper Business Requirements Document.

1. Go to github.com → Copilot → Agents
2. Select **brd-agent**
3. Type: `Create a BRD from Issue #1`
4. Wait for the agent to raise a PR
5. Open the PR → review `docs/requirements/BRD.md`
6. Check: are functional requirements clear? Is out of scope explicit?
7. Merge the PR

**What good looks like:**
- BRD has numbered functional requirements (FR-001, FR-002...)
- Each requirement has 2 testable acceptance criteria
- Out of scope items are explicitly listed

---

**Step 2 — Create User Stories**

1. Select **user-story-agent**
2. Type: `Create GitHub Issues from the BRD`
3. Wait — the agent creates 4 Issues automatically via MCP
4. Go to the Issues tab → verify 4 Issues exist:
   - `[FRONTEND] Add to Cart`
   - `[BACKEND] Add to Cart`
   - `[DATABASE] Add to Cart`
   - `[PLAYWRIGHT] Add to Cart`
5. Review each Issue — do the acceptance criteria make sense?
6. Tell the Architect the Issues are ready

**What good looks like:**
- Each Issue has a user story, context section, what to build, and acceptance criteria
- [BACKEND] Issue lists all 6 API endpoints
- [DATABASE] Issue describes Cart and CartItem models
- [PLAYWRIGHT] Issue describes the full user journey step by step

---

### 🟨 Architect — Solution Architect

**Your agent:** `design-agent`  
**Your surface:** github.com  
**Your dependency:** Wait for PM — Issues must exist before you start

---

**Step 1 — Create the Design Document**

1. Go to github.com → Copilot → Agents
2. Select **design-agent**
3. Type: `Create design document and schema from the BRD and user story Issues`
4. Wait for the agent to raise a PR with two files:
   - `docs/design/design-doc.md`
   - `src/prisma/schema.prisma`
5. Review both files:
   - Does the schema have Cart and CartItem models with correct fields?
   - Are data-testid values listed in the component tree section?
   - Do API endpoints in the design doc match the [BACKEND] Issue?
   - Are pre-existing models marked `// PRE-BUILT — do not modify`?
6. Merge the PR

**What good looks like:**
- Schema has `Cart` (id, userId, createdAt) and `CartItem` (id, cartId, menuItemId, quantity)
- Design doc has 4 Mermaid diagrams: architecture, ER, component tree, sequence
- data-testid values are listed for every interactive element

---

**Step 2 — Assign the DATABASE Issue**

1. Go to Issues → `[DATABASE] Add to Cart`
2. Right panel → **Assignees** → assign to **Copilot**
3. Wait for Copilot to raise a PR with schema additions and migration
4. Review: Cart and CartItem models added correctly, existing models untouched?
5. Merge the PR — this unblocks the Backend Developer

---

### 🟩 Backend Developer

**Your agent:** `unit-test-agent`  
**Your surface:** github.com  
**Your dependency:** Wait for Architect — DATABASE PR must be merged first

---

**Step 1 — Assign the BACKEND Issue**

1. Go to Issues → `[BACKEND] Add to Cart`
2. Right panel → **Assignees** → assign to **Copilot**
3. Wait for Copilot to raise a PR with:
   - `src/backend/src/routes/cartRoutes.ts`
   - `src/backend/src/controllers/cartController.ts`
   - `src/backend/src/services/cartService.ts`
4. Review the PR:
   - Is `authenticate` middleware applied to all cart routes?
   - Are all 6 endpoints implemented? (GET /cart, POST /cart/items, PUT /cart/items/:id, DELETE /cart/items/:id, GET /restaurants, GET /restaurants/:id/menu)
   - No `any` types in TypeScript?
5. Test locally: `cd src/backend && npm run dev`
6. Merge the PR

**What good looks like:**
- All routes return 401 without a valid JWT
- Services handle Prisma calls — controllers stay thin
- Cart is user-scoped — one cart per logged-in user

---

**Step 2 — Generate Jest Tests**

1. Go to github.com → Copilot → Agents
2. Select **unit-test-agent**
3. Type: `Generate Jest tests for the cart API`
4. Wait for the agent to raise a PR
5. Review: does every endpoint have happy path, auth and validation tests?
6. Run locally: `cd src/backend && npm run test`
7. Merge the PR

**What good looks like:**
- Every test follows arrange / act / assert pattern
- Response shape validated — not just status codes
- Auth test (no token → 401) exists for every protected route
- Edge cases covered: duplicate item increments quantity, item not found returns 404

---

### 🟧 UI Developer

**Your agent:** None — Copilot Coding Agent only  
**Your surface:** github.com  
**Your dependency:** Wait for Backend Developer — BACKEND PR must be merged first

---

**Step 1 — Assign the FRONTEND Issue**

1. Go to Issues → `[FRONTEND] Add to Cart`
2. Right panel → **Assignees** → assign to **Copilot**
3. Wait for Copilot to raise a PR with:
   - `src/frontend/src/components/CartIcon.tsx`
   - `src/frontend/src/components/CartDrawer.tsx`
   - `src/frontend/src/context/CartContext.tsx`
   - `src/frontend/src/pages/RestaurantPage.tsx`
   - Updated `src/frontend/src/components/Navbar.tsx` (CartIcon added)
4. Review the PR:
   - Does every interactive element have a `data-testid`?
   - Do testid values match those defined in `docs/design/design-doc.md`?
   - No `any` types in TypeScript?
5. Test locally: `cd src/frontend && npm run dev`
6. Verify manually: login → browse restaurant → add item → cart count updates → open drawer
7. Merge the PR

**What good looks like:**
- CartIcon in Navbar shows count badge that updates on add/remove
- CartDrawer slides open with item list showing name, price and quantity
- Add to Cart button on each menu item card
- All `data-testid` values match the design doc exactly

---

### 🟥 QA Engineer

**Your agent:** `playwright-agent`  
**Your surface:** github.com  
**Your dependency:** Wait for UI Developer — FRONTEND PR must be merged first

---

**Step 1 — Generate Playwright Tests**

1. Go to github.com → Copilot → Agents
2. Select **playwright-agent**
3. Type: `Generate Playwright E2E tests for the Add to Cart journey`
4. Wait for the agent to raise a PR with test files in `e2e/`
5. Review the PR:
   - Are all selectors using `data-testid`? (No CSS classes or text selectors)
   - Is each test focused on one assertion — not one giant test?
   - Does `beforeEach` handle login so test bodies stay clean?
6. Merge the PR

---

**Step 2 — Run the Tests**

Ensure both servers are running first:

```bash
# Terminal 1 — backend
cd src/backend && npm run dev

# Terminal 2 — frontend
cd src/frontend && npm run dev

# Terminal 3 — run tests from repo root
npm run test:e2e:ui
```

The visual runner opens in the browser — watch each test execute step by step.
This is the workshop's closing demo moment.

After the run, view the full HTML report:

```bash
npm run test:e2e:report
```

The report is saved to `docs/test-reports/` and is shareable with the team.

**What good looks like:**
- All tests green in the visual runner
- Full journey passes: login → browse → add item → cart count updates → open drawer → remove item
- `docs/test-reports/` contains the HTML report with pass/fail detail

---

## Implementation Order — Why It Matters

```
1. DATABASE   schema must exist before the API can reference Cart models
2. BACKEND    API must exist before the frontend can make real requests
3. FRONTEND   components connect to a working API
4. TESTS      run against the complete, working application
```

Running out of order causes import errors, missing database tables, and broken
API calls. If something is not working — check the order before debugging.

---

## Quick Reference

| Step | Agent / Tool | Owner | Input | Output |
|------|-------------|-------|-------|--------|
| 1 | brd-agent | PM | Issue #1 | `docs/requirements/BRD.md` PR |
| 2 | user-story-agent | PM | BRD.md | 4 GitHub Issues via MCP |
| 3 | design-agent | Architect | BRD + Issues | `docs/design/design-doc.md` + schema PR |
| 4 | Copilot Coding Agent | Architect | [DATABASE] Issue | Schema migration PR |
| 5 | Copilot Coding Agent | Backend Dev | [BACKEND] Issue | Cart API PR |
| 6 | Copilot Coding Agent | UI Dev | [FRONTEND] Issue | Cart UI PR |
| 7 | unit-test-agent | Backend Dev | Cart API code | Jest test suite PR |
| 8 | playwright-agent | QA Engineer | [PLAYWRIGHT] Issue | E2E tests PR |
