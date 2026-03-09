# [FRONTEND] Restaurant & Menu Browsing

## User Story
As a customer I want to see a list of restaurants after logging in and view a restaurant's menu items so that I can decide what to order.

## Assignment Order
Step 5 of 7 — assign after: [BACKEND] Cart API is merged
Tier: FRONTEND — primary slice

## Context
Pre-built from copilot-instructions.md:
- Login and Register pages — `src/frontend/src/pages/LoginPage.tsx`, `RegisterPage.tsx`
- React Router and auth guard — `src/frontend/src/App.tsx`
- Navbar shell — `src/frontend/src/components/Navbar.tsx`
- React app entry — `src/frontend/src/main.tsx`

HomePage.tsx currently shows a placeholder ("Features coming soon") — this Issue replaces its content with the restaurant list component below.

API endpoints available (from BACKEND issues):
- `GET /api/restaurants` — returns all restaurants
- `GET /api/restaurants/:id/menu` — returns menu items for a restaurant

## What to Build

- **RestaurantList** — displays all restaurants as cards with name and description. Each card is clickable and navigates to the menu page for that restaurant.
- **MenuPage** — displays all menu items for a selected restaurant. Each item shows name, description, and price. Each item has an "Add to Cart" button. A back button navigates to the restaurant list.

## HomePage Update
Replace the placeholder content in `HomePage.tsx` to render the RestaurantList component.
The user must see the restaurant list UI immediately after login — not "Features coming soon".

## data-testid Values
Every interactive and key display element must have a data-testid.
Playwright tests will use these — list them explicitly:
- `restaurant-list` — on the container holding all restaurant cards
- `restaurant-card` — on each individual restaurant card
- `restaurant-name` — on the restaurant name text within a card
- `menu-page` — on the menu page container
- `menu-item-list` — on the container holding all menu item cards
- `menu-item-card` — on each individual menu item card
- `menu-item-name` — on the menu item name text
- `menu-item-description` — on the menu item description text
- `menu-item-price` — on the menu item price text
- `add-to-cart-button` — on each "Add to Cart" button
- `back-button` — on the back navigation button/link

## Acceptance Criteria
- [ ] HomePage displays restaurant cards with name and description after login (placeholder replaced)
- [ ] Clicking a restaurant card navigates to its menu page showing items with name, description, price, and "Add to Cart" button
- [ ] A back button on the menu page returns the user to the restaurant list
- [ ] All data-testid values listed above are present on the correct elements
