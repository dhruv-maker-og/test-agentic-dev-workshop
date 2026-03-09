# [PLAYWRIGHT] Food Ordering Journey

## User Story
As a QA engineer I want to verify the food ordering journey end to end so that I can confirm customers can browse restaurants, view menus, manage their cart, and see correct totals.

## Assignment Order
Step 7 of 7 — assign after: [FRONTEND] Shopping Cart is merged
Tier: PLAYWRIGHT — assign this last, after all FRONTEND Issues are merged

## Primary Journey — Restaurant & Menu Browsing
One action per step with expected result:
1. Navigate to the login page — expect login form is visible
2. Log in with test credentials — expect redirect to home page
3. Verify restaurant list is displayed — expect at least 2 restaurant cards visible
4. Click on a restaurant card (e.g. Pizza Palace) — expect navigation to menu page
5. Verify menu items are displayed — expect at least 3 menu item cards with name, description, and price
6. Click "Add to Cart" on a menu item — expect cart badge updates to show 1
7. Click back button — expect return to restaurant list

## Extension Journey — Shopping Cart Management
> Only run if extension slice issues are implemented and merged.

1. Click the cart icon in the navbar — expect cart drawer opens
2. Verify cart item is displayed — expect item name, price, quantity (1), and line total
3. Click the "+" button on the cart item — expect quantity increases to 2 and line total doubles
4. Verify cart total updates — expect cart total equals sum of all line totals
5. Click the "−" button on the cart item — expect quantity decreases to 1
6. Click the remove button on the cart item — expect item is removed from cart drawer
7. Verify cart badge updates — expect badge shows 0 or is hidden
8. Close the cart drawer — expect drawer is no longer visible

## Test Credentials
- Email: test@example.com
- Password: password123

## data-testid Reference
These must match the data-testid values in the FRONTEND issues exactly:

From [FRONTEND] Restaurant & Menu Browsing:
- `restaurant-list` — used to verify restaurant list container is visible
- `restaurant-card` — used to click a restaurant and verify count
- `restaurant-name` — used to verify restaurant name text
- `menu-page` — used to verify menu page is displayed
- `menu-item-list` — used to verify menu items container
- `menu-item-card` — used to verify menu item count
- `menu-item-name` — used to verify item name text
- `menu-item-description` — used to verify item description text
- `menu-item-price` — used to verify item price text
- `add-to-cart-button` — used to click add to cart
- `back-button` — used to navigate back to restaurant list

From [FRONTEND] Shopping Cart:
- `cart-icon` — used to open cart drawer
- `cart-badge` — used to verify item count badge
- `cart-drawer` — used to verify drawer is open/closed
- `cart-item` — used to verify cart items are displayed
- `cart-item-name` — used to verify item name in cart
- `cart-item-price` — used to verify item price in cart
- `cart-item-quantity` — used to verify quantity value
- `cart-item-line-total` — used to verify line total calculation
- `quantity-increase` — used to click "+" button
- `quantity-decrease` — used to click "−" button
- `remove-item` — used to click remove button
- `cart-total` — used to verify overall cart total

## Acceptance Criteria
- [ ] Full primary journey passes: login → browse restaurants → view menu → add item to cart → navigate back
- [ ] Full extension journey passes: open cart → verify item → adjust quantity → verify totals → remove item
- [ ] All selectors use data-testid only — no CSS classes or text content
- [ ] Test uses the provided test credentials and does not create new users
