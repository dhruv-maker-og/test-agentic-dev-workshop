# [BACKEND] Habit Edit & Delete API

## User Story
As an authenticated user I want to update or delete my habits so that I can keep my habit list accurate and remove habits I no longer track.

## Assignment Order
Step 3 of 6 — assign after: [BACKEND] Habit Tracking API is merged
Tier: BACKEND — extension slice

## Context
Pre-built from copilot-instructions.md:
- JWT auth middleware → `src/backend/src/middleware/auth.ts`
- Auth routes → `src/backend/src/routes/auth.ts`
- Express app entry → `src/backend/src/index.ts`

Database models available (from DATABASE issue):
- Habit, HabitLog (via Prisma)

Endpoints from the previous BACKEND issue:
- GET /api/habits, POST /api/habits, GET /api/habits/:id, POST /api/habits/:id/log — already implemented

This issue adds the edit and delete endpoints. All endpoints are user-scoped — each user can only access their own habits.

## API Endpoints

- **PUT /api/habits/:id** — updates a habit's name, description, or frequency
  Request: `{ name?: string, description?: string, frequency?: string }`
  Response: `{ id, userId, name, description, frequency, createdAt }`
  Auth: required (JWT)
  Status: 200 OK / 401 Unauthorized / 404 Not Found (if habit does not exist or belongs to another user)

- **DELETE /api/habits/:id** — deletes a habit and all associated completion logs
  Request: none
  Response: 204 No Content
  Auth: required (JWT)
  Status: 204 No Content / 401 Unauthorized / 404 Not Found

## Acceptance Criteria
- [ ] `PUT /api/habits/:id` updates the habit and returns 200 with the updated habit; returns 404 if the habit does not exist or belongs to another user
- [ ] `DELETE /api/habits/:id` deletes the habit and all its logs and returns 204; returns 404 if the habit does not exist or belongs to another user
- [ ] Both endpoints return 401 when no valid JWT is provided
- [ ] Deleting a habit cascades to delete all associated HabitLog entries
