# [BACKEND] Habit Tracking API

## User Story
As an authenticated user I want to create habits, view my habit list with streaks and today's status, view habit details, and toggle daily completions so that I can track my habits.

## Assignment Order
Step 2 of 6 — assign after: [DATABASE] Habit & HabitLog Models is merged
Tier: BACKEND — primary slice

## Context
Pre-built from copilot-instructions.md:
- JWT auth middleware → `src/backend/src/middleware/auth.ts`
- Auth routes → `src/backend/src/routes/auth.ts`
- Express app entry → `src/backend/src/index.ts`

Database models available (from DATABASE issue):
- Habit, HabitLog (via Prisma)

This issue adds the core habit tracking endpoints. All endpoints are user-scoped — each user can only access their own habits.

## API Endpoints

- **GET /api/habits** — returns all habits for the authenticated user with today's completion status and current streak
  Request: none
  Response: `[{ id, userId, name, description, frequency, createdAt, completedToday: boolean, streak: number }]`
  Auth: required (JWT)
  Status: 200 OK / 401 Unauthorized

- **POST /api/habits** — creates a new habit for the authenticated user
  Request: `{ name: string, description: string, frequency: string }`
  Response: `{ id, userId, name, description, frequency, createdAt }`
  Auth: required (JWT)
  Status: 201 Created / 401 Unauthorized

- **GET /api/habits/:id** — returns habit details with recent completion logs and current streak
  Request: none (habit ID in URL param)
  Response: `{ id, userId, name, description, frequency, createdAt, streak: number, completedToday: boolean, logs: [{ id, completedDate, createdAt }] }`
  Auth: required (JWT)
  Status: 200 OK / 401 Unauthorized / 404 Not Found (if habit does not exist or belongs to another user)

- **POST /api/habits/:id/log** — toggles today's completion for a habit
  Request: none
  Response: `{ completed: boolean }` (true if log was created, false if log was removed)
  Auth: required (JWT)
  Status: 200 OK / 401 Unauthorized / 404 Not Found

## Streak Calculation
The current streak is the number of consecutive days (ending today or yesterday) the habit was logged as complete.
- A habit completed today and the previous 4 days shows a streak of 5
- A habit not completed today but completed yesterday and the 3 days before shows a streak of 4
- A habit not completed today or yesterday shows a streak of 0

## Acceptance Criteria
- [ ] `GET /api/habits` returns 200 with all habits for the authenticated user, each including `completedToday` and `streak`
- [ ] `POST /api/habits` creates a new habit and returns 201 with the created habit
- [ ] `GET /api/habits/:id` returns 200 with habit details, streak, and completion logs; returns 404 if the habit does not exist or belongs to another user
- [ ] `POST /api/habits/:id/log` toggles today's completion (creates log if absent, removes if present) and returns the new status
