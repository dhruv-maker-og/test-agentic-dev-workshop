# Workshop Flow

Step-by-step guide for running the agentic SDLC workshop from Issue #1 to passing Playwright tests.

---

## Before You Start

1. Set `VITE_APP_NAME` in `src/frontend/.env` — e.g. `VITE_APP_NAME=BookIt`
2. Create GitHub Issue #1 with the `[REQUIREMENT]` label and your feature description
3. Verify the app runs — login works, "Features coming soon" appears after login

---

## Step 1 — Run brd-agent (PM)

Go to **github.com → your repo → Copilot tab → Agents**

Select `brd-agent` and type:
```
Create a BRD from Issue #1
```

Wait for it to raise a PR with `docs/requirements/BRD.md`

**Review the PR — check:**
- Functional requirements match your Issue #1
- Out of scope items are explicitly listed
- Assumptions are documented

**Merge when satisfied.**

---

## Step 2 — Run user-story-agent (PM)

Select `user-story-agent` and type:
```
Create user stories from the BRD
```

Wait for it to raise a PR with `issues/*.md` files

**Review the PR — check:**
- Slice names are derived from the BRD domain language (not generic names)
- DATABASE issue has Models, Relationships, and Seed Data sections
- FRONTEND issue lists all data-testid values
- PLAYWRIGHT data-testid values match FRONTEND issue exactly

**Merge when satisfied.**

GitHub Actions triggers automatically and creates all GitHub Issues with labels.

---

## Step 3 — Run design-agent (Architect)

Select `design-agent` and type:
```
Create the design document and schema from the BRD and Issues
```

Wait for it to raise a PR with:
- `docs/design/design-doc.md`
- Updated `src/prisma/schema.prisma`

**Review the PR — check:**
- All domain models from the [DATABASE] Issue are present in the schema
- Relations between models are correct
- data-testid values in the design doc match the FRONTEND Issue
- Mermaid diagrams are valid

**Merge when satisfied.**

---

## Step 4 — Assign [DATABASE] Issue to Copilot (Architect)

Go to **Issues tab** → open the `[DATABASE]` Issue → assign it to **Copilot**

Wait for PR with:
- Updated `src/prisma/schema.prisma`
- Migration files
- Updated `src/prisma/seed.ts` with sample domain data

**Review the PR — check:**
- Migration runs without errors
- Seed data has at least 3 realistic sample records
- Pre-built User model is unchanged
- Test user (`test@example.com`) is still in seed

**Merge when satisfied.**

---

## Step 5 — Assign [BACKEND] Issue to Copilot (Backend Dev)

Go to **Issues tab** → open the `[BACKEND]` Issue → assign it to **Copilot**

Wait for PR with:
- `src/backend/routes/` — new route files
- `src/backend/controllers/` — new controller files

**Review the PR — check:**
- All endpoints from the Issue are implemented
- Protected endpoints use auth middleware
- Capacity/business rule checks are implemented
- No frontend files modified

**Merge when satisfied.**

---

## Step 6 — Assign [FRONTEND] Issue to Copilot (UI Dev)

Go to **Issues tab** → open the `[FRONTEND]` Issue → assign it to **Copilot**

Wait for PR with:
- New pages and components
- Updated `HomePage.tsx` — placeholder replaced with real feature UI

**Review the PR — check:**
- HomePage no longer shows "Features coming soon"
- All data-testid values from the Issue are present on the correct elements
- UI calls the correct API endpoints
- No backend files modified

**Merge when satisfied.**

---

## Step 7 — Run playwright-agent (QA Engineer)

Select `playwright-agent` and type:
```
Generate Playwright tests from the [PLAYWRIGHT] Issue
```

Wait for PR with `e2e/` test files

**Review the PR — check:**
- All selectors use `data-testid` — no CSS classes or text content
- Journey steps match the [PLAYWRIGHT] Issue exactly
- `beforeEach` handles login — not repeated inside individual tests
- Missing data-testid values are noted in the PR description

**Merge when satisfied.**

---

## Step 8 — Run Playwright Tests (QA Engineer)

Ensure both dev servers are running:
```bash
# Terminal 1 — backend
cd src/backend && npm run dev

# Terminal 2 — frontend
cd src/frontend && npm run dev
```

Run the tests from root folder:
```bash
npx playwright test --ui
```

**All green = workshop complete ✅**

---

## Human-in-the-Loop Gates Summary

| Gate | Who Reviews | What to Check |
|------|-------------|---------------|
| 1 — BRD PR | PM | FRs match requirement, assumptions documented |
| 2 — Issue files PR | PM | Slice names, seed data section, testid values |
| 3 — Design doc PR | Architect | Schema correct, relations, testid alignment |
| 4 — DATABASE PR | Architect | Migration clean, seed data populated |
| 5 — BACKEND PR | Backend Dev | All endpoints, auth middleware, business rules |
| 6 — FRONTEND PR | UI Dev | HomePage updated, testids present |
| 7 — Playwright PR | QA Engineer | data-testid only, journey matches Issue |

---

## Troubleshooting

**brd-agent produces a vague BRD**
- Check Issue #1 has enough detail — add acceptance criteria and out of scope items
- Re-run the agent with: `Recreate the BRD from Issue #1 with more specific functional requirements`

**user-story-agent uses wrong domain names**
- The BRD domain language drives the slice names — check the BRD uses the correct entity names
- Merge the BRD PR first before running user-story-agent

**GitHub Actions does not create Issues after merge**
- Go to repo Settings → Actions → General → ensure Read and write permissions is enabled

**DATABASE migration fails**
- Check schema.prisma for syntax errors before merging the PR
- Ensure relations have correct `@relation` attributes

**Frontend shows blank page after DATABASE merge**
- Seed data was not added — check `src/prisma/seed.ts` and run `npx prisma db seed` manually

**Playwright tests fail on selectors**
- A data-testid is missing from a component — add it manually and re-run
- Check the PR description — playwright-agent lists missing testids there

**Browser tab shows "Workshop App" instead of app name**
- Ensure `src/frontend/.env` exists with `VITE_APP_NAME=YourAppName`
- Restart the frontend dev server after editing `.env`
