# [FRONTEND] Habit Dashboard & Tracking

## User Story
As an authenticated user I want to see my habits on the home page with today's completion status and streaks, create new habits, toggle daily completions, and view habit details so that I can manage and track my daily habits.

## Assignment Order
Step 4 of 6 — assign after: [BACKEND] Habit Edit & Delete API is merged
Tier: FRONTEND — primary slice

## Context
Pre-built from copilot-instructions.md:
- Login and Register pages — `src/frontend/src/pages/LoginPage.tsx`, `RegisterPage.tsx`
- React Router and auth guard — `src/frontend/src/App.tsx`
- Navbar shell — `src/frontend/src/components/Navbar.tsx`
- React app entry — `src/frontend/src/main.tsx`

HomePage.tsx currently shows a placeholder ("Features coming soon") — this Issue replaces its content with the habit list component below.

API endpoints available (from BACKEND issues):
- `GET /api/habits` — returns all habits with today's status and streak
- `POST /api/habits` — creates a new habit
- `GET /api/habits/:id` — returns habit details with logs and streak
- `POST /api/habits/:id/log` — toggles today's completion

## What to Build

- **HabitList** — displays all habit cards on the home page. Shows a "Create Habit" button.
- **HabitCard** — individual habit card with name, description, frequency, current streak, and a CompletionToggle for today.
- **HabitForm** — form for creating a new habit with name, description, and frequency fields. Displayed when the "Create Habit" button is clicked.
- **HabitDetail** — detail page showing habit name, description, frequency, current streak, and a list of recent completion dates. Includes a back button to return to the habit list.
- **CompletionToggle** — button/control on each habit card to mark a habit as complete/incomplete for today.

## HomePage Update
Replace the placeholder content in `HomePage.tsx` to render the HabitList component.
The user must see the habit list UI immediately after login — not "Features coming soon".

## data-testid Values
Every interactive and key display element must have a data-testid.
Playwright tests will use these — list them explicitly:
- `habit-list` — on the container holding all habit cards
- `habit-card` — on each individual habit card
- `habit-name` — on the habit name text within a card
- `habit-description` — on the habit description text within a card
- `habit-frequency` — on the habit frequency text within a card
- `habit-streak` — on the streak count display within a card
- `completion-toggle` — on the completion toggle button for each habit
- `create-habit-button` — on the "Create Habit" button
- `habit-form` — on the habit creation form container
- `habit-name-input` — on the name input field in the form
- `habit-description-input` — on the description input field in the form
- `habit-frequency-input` — on the frequency input/select field in the form
- `habit-form-submit` — on the form submit button
- `habit-detail` — on the habit detail page container
- `habit-detail-name` — on the habit name in the detail view
- `habit-detail-description` — on the habit description in the detail view
- `habit-detail-frequency` — on the habit frequency in the detail view
- `habit-detail-streak` — on the streak display in the detail view
- `completion-history` — on the completion history list/container
- `back-button` — on the back navigation button/link

## Acceptance Criteria
- [ ] HomePage displays habit cards with name, description, frequency, streak, and completion toggle after login (placeholder replaced)
- [ ] Clicking "Create Habit" shows a form; submitting with valid data creates the habit and it appears in the list
- [ ] Clicking the completion toggle toggles today's status; clicking a habit navigates to a detail page with streak and completion history
- [ ] All data-testid values listed above are present on the correct elements
