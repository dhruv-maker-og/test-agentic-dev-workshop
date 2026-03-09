# [FRONTEND] Habit Editing & Deletion

## User Story
As an authenticated user I want to edit and delete my habits so that I can keep my habit list accurate and remove habits I no longer track.

## Assignment Order
Step 5 of 6 — assign after: [FRONTEND] Habit Dashboard & Tracking is merged
Tier: FRONTEND — extension slice

## Context
Pre-built from copilot-instructions.md:
- React Router and auth guard — `src/frontend/src/App.tsx`

Components from the previous FRONTEND issue:
- HabitList, HabitCard, HabitForm, HabitDetail, CompletionToggle — already implemented

API endpoints available (from BACKEND issues):
- `PUT /api/habits/:id` — updates a habit's name, description, or frequency
- `DELETE /api/habits/:id` — deletes a habit and all its logs

## What to Build

- **Edit functionality** — add an edit button to the habit detail page or habit card. Clicking it opens the HabitForm pre-filled with the habit's current data. Saving updates the habit via the PUT endpoint.
- **Delete functionality** — add a delete button to the habit detail page or habit card. Clicking it deletes the habit via the DELETE endpoint and returns to the habit list.

## data-testid Values
Every interactive and key display element must have a data-testid.
Playwright tests will use these — list them explicitly:
- `edit-habit-button` — on the edit button for each habit
- `delete-habit-button` — on the delete button for each habit
- `habit-form` — reuse the existing form component (same testid as create)
- `habit-form-submit` — reuse the existing submit button (same testid as create)

## Acceptance Criteria
- [ ] An edit button is visible on the habit detail or card; clicking it opens a pre-filled form, and saving updates the habit
- [ ] A delete button is visible on the habit detail or card; clicking it removes the habit and its logs from the list
- [ ] Users can only edit and delete their own habits
- [ ] All data-testid values listed above are present on the correct elements
