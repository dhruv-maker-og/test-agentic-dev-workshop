---
name: generate-playwright-tests
description: Generates Playwright E2E test scripts from user story Issues covering
  complete user journeys. Use when asked to generate E2E tests, Playwright tests,
  browser tests, or end-to-end test scripts.
---

# Skill — Generate Playwright Tests

## What You Do
Read the [PLAYWRIGHT] GitHub Issue and produce Playwright E2E test scripts
that verify complete user journeys in the browser.

## Steps
1. Read the [PLAYWRIGHT] GitHub Issue — identify the user journey
2. Read `docs/design/design-doc.md` — get data-testid values
3. Read `src/frontend/src/` — understand component structure
4. Generate test files in `e2e/`
5. Raise PR with test files

## Selector Convention — Non-Negotiable
Always use `data-testid` attributes. Never use CSS classes or text content.

```typescript
// CORRECT
page.locator('[data-testid="add-to-cart-button"]')

// WRONG — brittle, breaks on style changes
page.locator('.btn-primary')
page.locator('text=Add to Cart')
```

If a component is missing `data-testid` — note it in the PR description
so the UI Dev can add it before tests are run.

## Test File Structure
```typescript
// Journey: {journey name}
// Source: GitHub Issue #{number}

import { test, expect } from '@playwright/test'

test.describe('{Feature Name}', () => {

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'test@foodorder.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    await page.waitForURL('**/home')
  })

  test('{journey description}', async ({ page }) => {
    // Step 1
    // Step 2
    // Assert
  })

})
```

## Assertion Rules
Every action must be followed by an assertion. Never fire and forget.

| What to check | Playwright assertion |
|---------------|---------------------|
| Element visible | `expect(locator).toBeVisible()` |
| Element count | `expect(locator).toHaveCount(n)` |
| Text content | `expect(locator).toHaveText('text')` |
| URL changed | `expect(page).toHaveURL('/path')` |
| Input value | `expect(locator).toHaveValue('value')` |
| Not visible | `expect(locator).not.toBeVisible()` |

## Journey Mapping
Break the Issue journey into discrete test cases.
One test per distinct assertion point — not one giant test.

```
WRONG — one giant test
test('full cart journey', async ({ page }) => {
  // 20 steps and 10 assertions in one test
  // if step 5 fails you don't know where
})

CORRECT — focused tests
test('should add item and update cart count', ...)
test('should show item in cart drawer', ...)
test('should remove item from cart', ...)
```

## Run Instructions to Include in PR
```bash
# Ensure dev servers are running first
cd src/backend && npm run dev    # port 3001
cd src/frontend && npm run dev   # port 5173

# Run tests
npx playwright test
npx playwright test --ui          # visual mode — recommended for workshop
npx playwright show-report        # view HTML report after run
```

## On Missing data-testid
If a required `data-testid` is missing from a component:
- Write the test as if it exists
- Add a comment: `// Requires data-testid="{value}" on {ComponentName}`
- Note in PR description which components need updating

## Example Tests (Add to Cart)
```typescript
test('should add item to cart and show count', async ({ page }) => {
  await page.goto('/restaurants/1/menu')
  await page.locator('[data-testid="add-to-cart-button"]').first().click()
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1')
})

test('should open drawer and show added item', async ({ page }) => {
  await page.goto('/restaurants/1/menu')
  await page.locator('[data-testid="add-to-cart-button"]').first().click()
  await page.locator('[data-testid="cart-icon"]').click()
  await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible()
  await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1)
})

test('should remove item and reset count', async ({ page }) => {
  await page.goto('/restaurants/1/menu')
  await page.locator('[data-testid="add-to-cart-button"]').first().click()
  await page.locator('[data-testid="cart-icon"]').click()
  await page.locator('[data-testid="remove-item-button"]').first().click()
  await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(0)
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('0')
})
```
