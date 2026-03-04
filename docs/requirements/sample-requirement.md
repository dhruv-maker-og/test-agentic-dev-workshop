# Sample Workshop Requirement

Use this as the content when creating Issue #1 at the start of the workshop.

---

**Issue Title:** `[REQUIREMENT] Food Order App`

**Issue Body:**

## Feature Name
Restaurant Browsing and Shopping Cart

## Business Context
FoodOrder customers need to browse restaurants, view menus, and add items to a cart with quantity management before placing orders.

## Current Application State
- User authentication works (login/register)
- Database models exist: User, Restaurant, MenuItem
- Seed data: 2 restaurants (Pizza Palace, Burger Barn), 6 menu items
- No browsing or cart functionality exists

## What Users Can Do
**Restaurant Discovery:**
- View list of available restaurants on home page
- See restaurant name and description (no images)
- Click restaurant card to view its menu

**Menu Browsing:**
- View all menu items for selected restaurant
- See item name, description, and price (no images)
- Navigate back to restaurant list

**Shopping Cart:**
- Add menu items to cart with "Add to Cart" button
- Adjust quantity using +/- buttons in cart
- View cart count badge on cart icon in navbar
- Open cart drawer to see all items
- See item name, price, quantity, and line total for each item
- See cart total at bottom of drawer
- Remove items completely from cart
- Cart persists during session

## Simplified Design Decisions
To fit in 4 hours while keeping core functionality:
- **No images:** Restaurant and menu item cards display text only
- **Minimal styling:** Basic CSS, no animations or hover effects
- **Simple UI components:** Functional over fancy
- **Core test coverage:** Happy paths and auth, skip extensive edge cases

## Out of Scope
- Restaurant or menu item images
- Advanced UI styling, animations, transitions
- Restaurant search or filtering
- Menu item customization (size, add-ons)
- Empty state illustrations
- Comprehensive error handling UI
- Extensive edge case testing

## Technical Requirements

**Backend API (6 endpoints):**
- `GET /api/restaurants` - List all restaurants
- `GET /api/restaurants/:id/menu` - Get menu items for a restaurant
- `GET /api/cart` - Get current user's cart with all items
- `POST /api/cart/items` - Add item to cart (body: { menuItemId, quantity: 1 })
- `PUT /api/cart/items/:id` - Update cart item quantity (body: { quantity })
- `DELETE /api/cart/items/:id` - Remove cart item

**Database Models:**
- `Cart` (id, userId, createdAt)
- `CartItem` (id, cartId, menuItemId, quantity)

**Frontend Components:**
- Restaurant listing page (HomePage)
- Menu page for selected restaurant
- CartIcon with count badge (sum of all quantities)
- CartDrawer component
- CartContext for global cart state
- Quantity controls (+/- buttons)

**Business Logic:**
- Adding same item increments quantity instead of creating duplicate
- Cart count badge = sum of all item quantities
- Cart total = sum of (price × quantity) for all items

**Testing Requirements:**
- Unit tests: Happy path per endpoint + one auth test
- E2E test: Complete user journey (browse → add → adjust quantity → remove)

## Acceptance Criteria

**Restaurant Listing:**
- [ ] Logged-in users see restaurant cards (name + description, no images)
- [ ] Clicking restaurant navigates to menu page
- [ ] API returns 401 for unauthenticated requests

**Menu Viewing:**
- [ ] Menu page shows all items for selected restaurant (name, description, price, no images)
- [ ] Each item has "Add to Cart" button
- [ ] Back button returns to restaurant list

**Cart Management:**
- [ ] Adding item creates cart entry with quantity 1
- [ ] Adding same item again increments quantity (no duplicates)
- [ ] Cart icon shows total quantity count across all items
- [ ] Cart count updates in real-time
- [ ] Cart drawer opens showing all items

**Cart Drawer:**
- [ ] Displays item name, price, quantity, and line total
- [ ] +/- buttons adjust quantity
- [ ] Quantity changes update item total and cart total
- [ ] Remove button deletes item from cart
- [ ] Cart total displayed at bottom

**Backend:**
- [ ] All endpoints require authentication (401 without token)
- [ ] Cart is user-scoped
- [ ] Adding duplicate item increments quantity
- [ ] Quantity updates persist correctly

**Testing:**
- [ ] Unit tests: 6 endpoints (happy path) + 1 auth test + 1 quantity test
- [ ] E2E test: login → browse restaurants → view menu → add item → open cart → adjust quantity → verify total → remove item
- [ ] All tests pass

## Success Metrics
- Complete user journey functional
- Quantity management works correctly
- Cart calculations accurate
- All tests green
