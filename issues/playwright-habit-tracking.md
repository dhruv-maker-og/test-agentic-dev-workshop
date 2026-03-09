# [PLAYWRIGHT] Habit Tracking Journey

## User Story
As a QA engineer I want to verify the habit tracking journey end to end so that I can confirm users can view, create, track, edit, and delete habits.

## Assignment Order
Step 6 of 6 — assign after: [FRONTEND] Habit Editing & Deletion is merged
Tier: PLAYWRIGHT — assign this last, after all FRONTEND Issues are merged

## Primary Journey — Habit Dashboard & Tracking
One action per step with expected result:
1. Navigate to the login page — expect login form is visible
2. Log in with test credentials — expect redirect to home page
3. Verify habit list is displayed — expect at least 3 habit cards visible with name, streak, and completion toggle
4. Click "Create Habit" button — expect habit form is displayed
5. Fill in habit name, description, and frequency and submit — expect new habit appears in the list
6. Click the completion toggle on a habit — expect today's completion status changes
7. Click on a habit card — expect navigation to habit detail page with name, description, frequency, streak, and completion history
8. Click back button — expect return to habit list

## Extension Journey — Habit Editing & Deletion
> Only run if extension slice issues are implemented and merged.

1. Click on a habit card to navigate to detail — expect detail page is displayed
2. Click the edit button — expect form is pre-filled with habit data
3. Change the habit name and submit — expect updated name is displayed
4. Click the delete button — expect habit is removed from the list
5. Verify habit is no longer visible — expect habit count decreased

## Test Credentials
- Email: test@example.com
- Password: password123

## data-testid Reference
These must match the data-testid values in the FRONTEND issues exactly:

From [FRONTEND] Habit Dashboard & Tracking:
- `habit-list` — used to verify habit list container is visible
- `habit-card` — used to click a habit and verify count
- `habit-name` — used to verify habit name text
- `habit-description` — used to verify habit description text
- `habit-frequency` — used to verify habit frequency text
- `habit-streak` — used to verify streak count
- `completion-toggle` — used to toggle daily completion
- `create-habit-button` — used to click create habit
- `habit-form` — used to verify form is displayed
- `habit-name-input` — used to fill in habit name
- `habit-description-input` — used to fill in description
- `habit-frequency-input` — used to fill in frequency
- `habit-form-submit` — used to submit the form
- `habit-detail` — used to verify detail page
- `habit-detail-name` — used to verify habit name in detail
- `habit-detail-description` — used to verify description in detail
- `habit-detail-frequency` — used to verify frequency in detail
- `habit-detail-streak` — used to verify streak in detail
- `completion-history` — used to verify completion history list
- `back-button` — used to navigate back

From [FRONTEND] Habit Editing & Deletion:
- `edit-habit-button` — used to click edit button
- `delete-habit-button` — used to click delete button

## Acceptance Criteria
- [ ] Full primary journey passes: login → view habits → create habit → toggle completion → view detail → navigate back
- [ ] Full extension journey passes: view detail → edit habit → delete habit → verify removal
- [ ] All selectors use data-testid only — no CSS classes or text content
- [ ] Test uses the provided test credentials and does not create new users
