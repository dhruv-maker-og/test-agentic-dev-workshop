import { test, expect } from '@playwright/test'

const TEST_EMAIL = process.env.TEST_USER_EMAIL || 'test@example.com'
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD || 'password123'

test.describe('Habit Tracking journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByTestId('email-input').fill(TEST_EMAIL)
    await page.getByTestId('password-input').fill(TEST_PASSWORD)
    await page.getByTestId('login-button').click()
    await page.waitForURL('**/home')
  })

  test('should display habit list with at least 3 habit cards', async ({ page }) => {
    await expect(page.getByTestId('habit-list')).toBeVisible()
    await expect(page.getByTestId('habit-card')).toHaveCount(3)
    const firstCard = page.getByTestId('habit-card').first()
    await expect(firstCard.getByTestId('habit-name')).toBeVisible()
    await expect(firstCard.getByTestId('habit-streak')).toBeVisible()
    await expect(firstCard.getByTestId('completion-toggle')).toBeVisible()
  })

  test('should show habit form when clicking Create Habit button', async ({ page }) => {
    await page.getByTestId('create-habit-button').click()
    await expect(page.getByTestId('habit-form')).toBeVisible()
    await expect(page.getByTestId('habit-name-input')).toBeVisible()
    await expect(page.getByTestId('habit-description-input')).toBeVisible()
    await expect(page.getByTestId('habit-frequency-input')).toBeVisible()
    await expect(page.getByTestId('habit-form-submit')).toBeVisible()
  })

  test('should create a new habit and show it in the list', async ({ page }) => {
    const initialCount = await page.getByTestId('habit-card').count()

    await page.getByTestId('create-habit-button').click()
    await expect(page.getByTestId('habit-form')).toBeVisible()

    await page.getByTestId('habit-name-input').fill('Playwright Test Habit')
    await page.getByTestId('habit-description-input').fill('Created by Playwright E2E test')
    await page.getByTestId('habit-frequency-input').selectOption('daily')
    await page.getByTestId('habit-form-submit').click()

    await expect(page.getByTestId('habit-card')).toHaveCount(initialCount + 1)
  })

  test('should toggle completion status on a habit', async ({ page }) => {
    const firstToggle = page.getByTestId('completion-toggle').first()
    const initialText = await firstToggle.textContent()

    await firstToggle.click()

    await expect(firstToggle).not.toHaveText(initialText!)
  })

  test('should navigate to habit detail page when clicking a habit card', async ({ page }) => {
    await page.getByTestId('habit-card').first().click()
    await page.waitForURL('**/habits/**')

    await expect(page.getByTestId('habit-detail')).toBeVisible()
    await expect(page.getByTestId('habit-detail-name')).toBeVisible()
    await expect(page.getByTestId('habit-detail-description')).toBeVisible()
    await expect(page.getByTestId('habit-detail-frequency')).toBeVisible()
    await expect(page.getByTestId('habit-detail-streak')).toBeVisible()
    await expect(page.getByTestId('completion-history')).toBeVisible()
  })

  test('should navigate back to habit list when clicking back button', async ({ page }) => {
    await page.getByTestId('habit-card').first().click()
    await page.waitForURL('**/habits/**')
    await expect(page.getByTestId('habit-detail')).toBeVisible()

    await page.getByTestId('back-button').click()
    await page.waitForURL('**/home')

    await expect(page.getByTestId('habit-list')).toBeVisible()
  })
})

test.describe('Habit Editing & Deletion journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByTestId('email-input').fill(TEST_EMAIL)
    await page.getByTestId('password-input').fill(TEST_PASSWORD)
    await page.getByTestId('login-button').click()
    await page.waitForURL('**/home')
  })

  test('should navigate to habit detail page from habit card', async ({ page }) => {
    await page.getByTestId('habit-card').first().click()
    await page.waitForURL('**/habits/**')
    await expect(page.getByTestId('habit-detail')).toBeVisible()
  })

  test('should show pre-filled edit form when clicking edit button', async ({ page }) => {
    await page.getByTestId('habit-card').first().click()
    await page.waitForURL('**/habits/**')

    const habitName = await page.getByTestId('habit-detail-name').textContent()
    await page.getByTestId('edit-habit-button').click()

    await expect(page.getByTestId('habit-form')).toBeVisible()
    await expect(page.getByTestId('habit-name-input')).toHaveValue(habitName!)
  })

  test('should update habit name after editing', async ({ page }) => {
    await page.getByTestId('habit-card').first().click()
    await page.waitForURL('**/habits/**')

    await page.getByTestId('edit-habit-button').click()
    await expect(page.getByTestId('habit-form')).toBeVisible()

    const updatedName = 'Updated Habit Name'
    await page.getByTestId('habit-name-input').clear()
    await page.getByTestId('habit-name-input').fill(updatedName)
    await page.getByTestId('habit-form-submit').click()

    await expect(page.getByTestId('habit-form')).not.toBeVisible()
    await expect(page.getByTestId('habit-detail-name')).toHaveText(updatedName)
  })

  test('should delete a habit and return to habit list with fewer habits', async ({ page }) => {
    const initialCount = await page.getByTestId('habit-card').count()

    await page.getByTestId('habit-card').last().click()
    await page.waitForURL('**/habits/**')
    await expect(page.getByTestId('habit-detail')).toBeVisible()

    page.on('dialog', (dialog) => dialog.accept())
    await page.getByTestId('delete-habit-button').click()

    await page.waitForURL('**/home')
    await expect(page.getByTestId('habit-list')).toBeVisible()
    await expect(page.getByTestId('habit-card')).toHaveCount(initialCount - 1)
  })
})
