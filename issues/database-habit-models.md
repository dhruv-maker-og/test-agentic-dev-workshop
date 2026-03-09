# [DATABASE] Habit & HabitLog Models

## User Story
As a system I need Habit and HabitLog models with seed data so that the API can store and manage habit tracking data for authenticated users.

## Assignment Order
Step 1 of 6 — assign after: nothing (assign this first)
Tier: DATABASE — primary slice

## Context
Pre-built models from copilot-instructions.md:
- User model in `src/backend/prisma/schema.prisma` — do not modify
- Test user seed data in `src/backend/prisma/seed.ts` — do not modify existing seed logic

This issue adds only the Habit and HabitLog models required for the habit tracking feature.

## Models to Add

**Habit**
- id: Int — auto-incrementing primary key
- userId: Int — foreign key to User
- name: String — habit display name
- description: String — short description of the habit
- frequency: String — target frequency (e.g. "Daily", "3x per week", "5x per week")
- createdAt: DateTime — defaults to now

**HabitLog**
- id: Int — auto-incrementing primary key
- habitId: Int — foreign key to Habit
- completedDate: DateTime — date of completion
- createdAt: DateTime — defaults to now

## Relationships
- User has many Habits
- Habit belongs to one User
- Habit has many HabitLogs
- HabitLog belongs to one Habit
- Deleting a Habit cascades to delete all associated HabitLogs

## Seed Data
Add realistic sample data to `src/backend/prisma/seed.ts` so the app is usable immediately after migration — never leave domain tables empty.

**Habit** — add at least 3 sample records for the test user (test@example.com):
- Morning Exercise — "30 minutes of morning workout" — "Daily"
- Read 30 Minutes — "Read a book for at least 30 minutes" — "Daily"
- Drink Water — "Drink at least 8 glasses of water" — "Daily"

**HabitLog** — add completion logs spanning several consecutive days for at least some habits to produce visible streaks. For example:
- Morning Exercise: logs for the past 5 consecutive days (produces a streak of 5)
- Read 30 Minutes: logs for the past 3 consecutive days (produces a streak of 3)
- Drink Water: logs for 2 days ago and 3 days ago only (produces a streak of 0 — missed yesterday)

Seed data is required for:
- Frontend to show real habit data after login (not a blank page)
- Playwright tests to find and interact with real records
- Visible streaks to verify streak calculation logic

## Acceptance Criteria
- [ ] Migration runs without errors
- [ ] Habit and HabitLog models created with correct fields and relations
- [ ] Seed data populates at least 3 habits for the test user and completion logs producing visible streaks
- [ ] Pre-built User model and test user seed data unchanged
