# Business Requirements Document
**Project:** Habit Tracker App
**Date:** 2026-03-09
**Source:** GitHub Issue #1 — Feature Request: Habit Tracker App

## 1. Summary
The Habit Tracker App allows authenticated users to create and manage daily habits, log completions each day, and view their progress through streak tracking. After logging in, users see a dashboard of their habits with today's completion status. They can create new habits with a name, description, and frequency target, mark habits as complete for the day, and view detailed progress including current streaks and completion history. The application builds on top of the existing authentication system (login/register) and replaces the "Features coming soon" placeholder with a fully functional habit tracking interface.

## 2. User Roles
| Role | Description |
|------|-------------|
| Authenticated User | A logged-in user who creates habits, logs daily completions, and tracks their progress over time. All habit data is scoped to the individual user. |

## 3. In Scope
- **Habit Management:** Create, view, edit, and delete personal habits
- **Daily Tracking:** Mark habits as complete or incomplete for the current day
- **Streak Tracking:** Display current streak (consecutive days completed) for each habit
- **Habit Dashboard:** Home page displays all user habits with today's completion status
- **Habit Detail View:** View a habit's details, completion history, and streak information
- **Seed Data:** Pre-populated sample habits and logs for the test user so the app is usable immediately

## 4. Out of Scope
- Habit images or icons
- Advanced UI styling, animations, or transitions
- Habit categories or tagging
- Habit reminders or push notifications
- Social features (sharing habits, leaderboards)
- Habit archiving (soft delete)
- Weekly or monthly analytics charts
- Habit templates or suggestions
- Customisable streak rules (e.g. weekdays only)
- Calendar heat-map visualisation
- Data export
- Comprehensive error handling UI beyond basic error messages

## 5. Functional Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-001 | **View Habit List** — After login the home page displays all habits belonging to the authenticated user, each showing name, description, frequency, current streak, and today's completion status. | 1. Logged-in user sees habit cards on the home page (placeholder "Features coming soon" is replaced). 2. Each card shows the habit name, description, frequency, streak count, and a completion toggle for today. |
| FR-002 | **Create Habit** — Users can create a new habit by providing a name, description, and target frequency (e.g. "Daily", "3x per week", "5x per week"). | 1. A "Create Habit" button is visible on the home page. 2. Submitting the form with valid data creates the habit and it appears in the habit list. |
| FR-003 | **Edit Habit** — Users can update the name, description, and frequency of an existing habit they own. | 1. Editing a habit and saving changes updates the habit's details in the list. 2. Users can only edit their own habits. |
| FR-004 | **Delete Habit** — Users can permanently delete a habit they own, including all associated completion logs. | 1. Clicking delete removes the habit from the list. 2. The habit and its logs are deleted from the database. |
| FR-005 | **Log Daily Completion** — Users can mark a habit as complete for today. Toggling again removes the completion for today. | 1. Clicking the completion toggle on a habit card creates a log entry for today's date. 2. Clicking it again removes today's log entry (toggle behaviour). |
| FR-006 | **View Habit Detail** — Users can click on a habit to see its full details, current streak, and a list of recent completion dates. | 1. Clicking a habit card navigates to a detail page showing habit name, description, frequency, current streak, and completion history. 2. A back button returns to the habit list. |
| FR-007 | **Streak Calculation** — The system calculates the current streak as the number of consecutive days (ending today or yesterday) the habit was logged as complete. | 1. A habit completed today and the previous 4 days shows a streak of 5. 2. A habit not completed today but completed yesterday and the 3 days before shows a streak of 4. |
| FR-008 | **User-Scoped Data** — All habit and log data is scoped to the authenticated user. Users cannot see or modify another user's habits. | 1. API endpoints return only the authenticated user's data. 2. Requests without a valid JWT return 401 Unauthorized. |
| FR-009 | **Seed Data** — The database is pre-populated with sample habits and completion logs for the test user so the application is functional immediately after setup. | 1. After seeding, at least 3 sample habits exist for the test user. 2. At least some habits have completion logs producing visible streaks. |

## 6. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-001 | Security | JWT authentication required on all habit and log endpoints. Unauthenticated requests receive 401. |
| NFR-002 | Performance | Page load under 3 seconds. API responses under 500ms. |
| NFR-003 | Usability | Responsive layout — functional on desktop and mobile viewports. |
| NFR-004 | Data Integrity | Deleting a habit cascades to delete all associated completion logs. |
| NFR-005 | Accessibility | All interactive elements have `data-testid` attributes for automated testing. |
| NFR-006 | Code Quality | TypeScript strict mode — no `any`. Async/await throughout. API errors return `{ error: string }` with correct HTTP status codes. |

## 7. Technical Requirements

### Database Models
- **Habit** — id, userId (FK to User), name, description, frequency, createdAt
- **HabitLog** — id, habitId (FK to Habit), completedDate (date of completion), createdAt

### API Endpoints (6 endpoints)
| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | /api/habits | List all habits for the current user with today's status and streak | Required |
| POST | /api/habits | Create a new habit | Required |
| GET | /api/habits/:id | Get habit details with recent completion logs and streak | Required |
| PUT | /api/habits/:id | Update a habit's name, description, or frequency | Required |
| DELETE | /api/habits/:id | Delete a habit and all its logs | Required |
| POST | /api/habits/:id/log | Toggle today's completion for a habit | Required |

### Frontend Components
- **HabitList** — displays all habit cards on the home page (replaces placeholder)
- **HabitCard** — individual habit card with name, description, frequency, streak, and today's toggle
- **HabitForm** — form for creating and editing habits (name, description, frequency fields)
- **HabitDetail** — detail page showing habit info, streak, and completion history
- **CompletionToggle** — button/control to mark a habit as complete/incomplete for today

### Business Logic
- Toggling a habit that is already complete for today removes the completion (idempotent toggle)
- Streak counts consecutive completed days ending with today or yesterday
- Deleting a habit cascades to all associated HabitLog entries
- Each user can only access and modify their own habits

### Seed Data
- At least 3 sample habits for the test user (e.g. "Morning Exercise", "Read 30 Minutes", "Drink Water")
- Completion logs spanning several days to produce visible streaks

### Testing Requirements
- **Unit tests:** Happy path per API endpoint + one auth test + one streak calculation test
- **E2E test:** login → view habits → create habit → toggle completion → view detail → edit habit → delete habit

## 8. Assumptions
- **Single user role only** — the requirement mentions a "Habit Tracker App" without specifying admin functionality, so only the authenticated user role is assumed. No admin or multi-tenant features are included.
- **Daily granularity** — habits are tracked at the day level. There is no time-of-day tracking or multiple completions per day for the same habit.
- **Frequency is informational** — the frequency field (e.g. "Daily", "3x per week") is stored and displayed but does not enforce automated rules or reminders. It is up to the user to log completions.
- **Streak resets on missed day** — a streak counts consecutive days ending today or yesterday. If a habit was not completed yesterday and is not yet completed today, the streak is 0.
- **No images or icons** — habit cards display text only, consistent with the workshop's simplified design decisions.
- **Minimal styling** — basic CSS, functional over fancy, consistent with the workshop scaffold.
- **Test user credentials** — email: `test@example.com`, password: `password123` (pre-built, not modified).
- **Cart/Restaurant models are not relevant** — existing issue files in the `issues/` directory reference a food ordering domain; these are assumed to be workshop template examples and are not part of this Habit Tracker requirement.
- **Payment, notifications, social features out of scope** — not mentioned in the requirement and excluded to keep the scope appropriate for a workshop-length build.
