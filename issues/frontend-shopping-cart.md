# [FRONTEND] Shopping Cart

## User Story
As a customer I want to see a cart icon with a quantity badge, open a cart drawer to view my items, adjust quantities, and remove items so that I can manage my order.

## Assignment Order
Step 6 of 7 — assign after: [FRONTEND] Restaurant & Menu Browsing is merged
Tier: FRONTEND — extension slice

## Context
Pre-built from copilot-instructions.md:
- Navbar shell — `src/frontend/src/components/Navbar.tsx`
- React Router and auth guard — `src/frontend/src/App.tsx`

Components from the previous FRONTEND issue:
- RestaurantList and MenuPage with "Add to Cart" buttons — already implemented

API endpoints available (from BACKEND issues):
- `GET /api/cart` — returns the user's cart with all items
- `POST /api/cart/items` — adds item to cart (or increments if duplicate)
- `PUT /api/cart/items/:id` — updates item quantity
- `DELETE /api/cart/items/:id` — removes item from cart

## What to Build

- **CartIcon** — a cart icon with a quantity badge in the Navbar showing the sum of all item quantities. Clicking it opens the cart drawer.
- **CartDrawer** — an overlay/panel listing all cart items. Each item shows name, price, quantity, and line total (price × quantity). Each item has +/− buttons and a remove button. The drawer displays the cart total at the bottom.
- **CartContext** (or equivalent state) — manages cart state across the app. Provides add, update quantity, and remove functions. Keeps the badge count in sync.

## Navbar Update
Add the CartIcon component to the existing Navbar. The Navbar file may be modified for this purpose as the Issue requires it.

## data-testid Values
Every interactive and key display element must have a data-testid.
Playwright tests will use these — list them explicitly:
- `cart-icon` — on the cart icon button in the navbar
- `cart-badge` — on the quantity badge number
- `cart-drawer` — on the cart drawer/overlay container
- `cart-item` — on each item row in the cart drawer
- `cart-item-name` — on the item name in the cart
- `cart-item-price` — on the item price in the cart
- `cart-item-quantity` — on the quantity display for each item
- `cart-item-line-total` — on the line total (price × quantity) for each item
- `quantity-increase` — on the "+" button for each cart item
- `quantity-decrease` — on the "−" button for each cart item
- `remove-item` — on the remove button for each cart item
- `cart-total` — on the overall cart total display

## Acceptance Criteria
- [ ] Navbar displays a cart icon with a badge showing the total quantity of items in the cart
- [ ] Clicking the cart icon opens a drawer showing all cart items with name, price, quantity, line total, +/− buttons, and a remove button
- [ ] Adjusting quantity via +/− buttons updates the quantity and recalculates line totals and cart total; removing an item removes it from the drawer
- [ ] All data-testid values listed above are present on the correct elements
