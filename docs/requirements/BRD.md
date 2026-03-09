# Business Requirements Document
**Project:** FoodOrder (Workshop App)
**Date:** 2026-03-09
**Source:** GitHub Issue #1 — [REQUIREMENT] Add to Cart

## 1. Summary
FoodOrder is a web-based food ordering application that allows authenticated customers to browse a catalogue of restaurants, view each restaurant's menu, and manage a personal shopping cart. The core workflow is: log in → browse restaurants → select a restaurant → view its menu items → add items to a cart → adjust quantities → review the cart with calculated totals → remove unwanted items. The application is built on a pre-existing authentication scaffold (login, register, JWT middleware, User model) and extends it with restaurant, menu, and cart domain functionality.

## 2. User Roles
| Role | Description |
|------|-------------|
| Customer | An authenticated user who browses restaurants, views menus, and manages a shopping cart. All domain features require login. |

## 3. In Scope
- Restaurant listing — display all restaurants with name and description
- Menu browsing — display all menu items for a selected restaurant with name, description, and price
- Navigation between restaurant list and individual restaurant menu pages
- Shopping cart creation — one cart per authenticated user per session
- Add to cart — add a menu item to the cart with an initial quantity of 1
- Duplicate handling — adding the same menu item again increments its quantity instead of creating a duplicate entry
- Quantity adjustment — increase or decrease item quantity using +/− buttons
- Item removal — remove an item entirely from the cart
- Cart calculations — line total (price × quantity) per item and overall cart total
- Cart icon with quantity badge — displayed in the navbar, showing the sum of all item quantities
- Cart drawer — an overlay/panel listing all cart items with quantity controls and totals
- Cart persistence during the user's session
- Backend API (6 endpoints) for restaurants, menus, and cart operations
- Database models for Cart and CartItem (Restaurant and MenuItem are pre-seeded)
- Seed data — 2 restaurants (Pizza Palace, Burger Barn) and 6 menu items
- Unit tests — happy-path coverage for each endpoint plus authentication and quantity-increment tests
- E2E test — full user journey from login through browse, add, adjust, and remove

## 4. Out of Scope
- Restaurant or menu item images — cards display text only
- Advanced UI styling, animations, or transitions
- Restaurant search, filtering, or sorting
- Menu item customisation (sizes, toppings, add-ons)
- Empty-state illustrations or placeholder graphics
- Comprehensive error-handling UI (beyond basic error responses)
- Extensive edge-case testing
- Payment processing, checkout, or order placement
- Order history or order tracking
- Restaurant administration (adding/editing restaurants or menus)
- User profile management
- Multi-user or shared carts
- Guest (unauthenticated) cart functionality

## 5. Functional Requirements

### Restaurant Browsing
| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-001 | The system shall display a list of all restaurants on the home page after login | 1. Logged-in user sees restaurant cards showing name and description (no images). 2. API `GET /api/restaurants` returns all restaurants with 200 status. |
| FR-002 | The system shall allow a user to navigate from the restaurant list to a restaurant's menu page | 1. Clicking a restaurant card navigates to the menu page for that restaurant. 2. The URL changes to reflect the selected restaurant. |
| FR-003 | The system shall require authentication for restaurant browsing | 1. `GET /api/restaurants` returns 401 when no valid JWT is provided. 2. Unauthenticated users are redirected to the login page. |

### Menu Viewing
| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-004 | The system shall display all menu items for a selected restaurant | 1. Menu page shows every item belonging to the selected restaurant with name, description, and price (no images). 2. API `GET /api/restaurants/:id/menu` returns all menu items for the given restaurant with 200 status. |
| FR-005 | Each menu item shall have an "Add to Cart" button | 1. Every menu item card displays an "Add to Cart" button. 2. The button is clickable and triggers the add-to-cart action. |
| FR-006 | The user shall be able to navigate back to the restaurant list from the menu page | 1. A back button or navigation link is visible on the menu page. 2. Clicking it returns the user to the restaurant list. |

### Shopping Cart
| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-007 | The system shall create a cart entry with quantity 1 when a user adds a menu item for the first time | 1. `POST /api/cart/items` with `{ menuItemId, quantity: 1 }` creates a new CartItem with quantity 1. 2. The cart icon badge updates to reflect the new total quantity. |
| FR-008 | Adding the same menu item again shall increment the existing cart item's quantity instead of creating a duplicate | 1. Adding an item that already exists in the cart increases its quantity by 1. 2. No duplicate CartItem rows are created for the same menuItemId within the same cart. |
| FR-009 | The system shall display a cart icon with a count badge in the navbar | 1. The navbar shows a cart icon at all times when logged in. 2. The badge number equals the sum of all item quantities in the cart and updates in real-time. |
| FR-010 | The system shall provide a cart drawer showing all cart items | 1. Clicking the cart icon opens a drawer/panel listing all items. 2. Each item displays name, price, quantity, and line total (price × quantity). |
| FR-011 | The user shall be able to adjust item quantity using +/− buttons | 1. Each cart item has "+" and "−" buttons. 2. `PUT /api/cart/items/:id` with `{ quantity }` updates the quantity and the cart totals recalculate. |
| FR-012 | The user shall be able to remove an item from the cart | 1. Each cart item has a remove button. 2. `DELETE /api/cart/items/:id` removes the item and the cart totals recalculate. |
| FR-013 | The cart drawer shall display the cart total at the bottom | 1. Cart total equals the sum of (price × quantity) for all items. 2. The total updates immediately when quantities change or items are removed. |
| FR-014 | The cart shall persist during the user's session | 1. `GET /api/cart` returns all current cart items for the authenticated user. 2. Navigating between pages does not clear the cart. |

### Backend API
| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-015 | All cart endpoints shall be user-scoped | 1. Each user can only access their own cart. 2. Cart queries filter by the authenticated user's ID. |
| FR-016 | All domain API endpoints shall require JWT authentication | 1. Every endpoint returns 401 if no valid token is provided. 2. Valid token grants access and returns the expected data. |

### Database
| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-017 | The database shall include Cart and CartItem models | 1. Cart model has fields: id, userId, createdAt. 2. CartItem model has fields: id, cartId, menuItemId, quantity. |
| FR-018 | Seed data shall include 2 restaurants and 6 menu items | 1. After seeding, the database contains Pizza Palace and Burger Barn. 2. Each restaurant has 3 menu items with realistic names, descriptions, and prices. |

### Testing
| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-019 | Unit tests shall cover every API endpoint's happy path plus authentication and quantity logic | 1. At least 8 unit tests: 6 endpoint happy paths + 1 auth test + 1 quantity-increment test. 2. All tests pass. |
| FR-020 | An E2E test shall validate the complete user journey | 1. Test covers: login → browse restaurants → view menu → add item → open cart → adjust quantity → verify total → remove item. 2. Test passes end-to-end. |

## 6. Non-Functional Requirements
| ID | Category | Requirement |
|----|----------|-------------|
| NFR-001 | Security | All protected API routes use JWT authentication via the pre-built auth middleware. Unauthenticated requests receive a 401 response. |
| NFR-002 | Performance | Pages load in under 3 seconds on a standard broadband connection. |
| NFR-003 | Usability | The UI is responsive and functional on both desktop and mobile viewports. |
| NFR-004 | Usability | All interactive elements include `data-testid` attributes for automated testing. |
| NFR-005 | Maintainability | TypeScript strict mode — no use of `any`. Async/await pattern — no raw promises. |
| NFR-006 | Data Integrity | Cart is user-scoped; one user cannot read or modify another user's cart. |
| NFR-007 | Simplicity | UI uses basic CSS with no animations, hover effects, or image assets — text-only cards. |

## 7. Assumptions
- **Auth is pre-built:** Login, registration, JWT middleware, and the User model already exist and will not be rebuilt or modified.
- **Restaurant and MenuItem models are provided by the [DATABASE] Issue:** These models and their seed data (2 restaurants, 6 menu items) will be created during the workshop pipeline before the backend and frontend work begins.
- **Single user role:** Only the Customer role is needed; there is no admin or restaurant-owner role.
- **No payment or checkout:** The cart is the final step in scope; placing an order or paying is not part of this feature.
- **Cart is session-scoped:** The cart persists via the database for the duration of the user's authenticated session. No explicit "clear cart" action is required beyond removing individual items.
- **No guest cart:** Only authenticated users can use the cart. There is no anonymous/guest cart that merges on login.
- **Quantity minimum is 1:** Using the "−" button when quantity is 1 either removes the item or prevents further decrement (implementation detail left to the developer).
- **No pagination:** The restaurant list and menu items are small enough to display without pagination.
- **SQLite database:** The application uses SQLite via Prisma ORM as specified by the tech stack.
- **Test user exists:** The seed data includes a test user (`test@example.com` / `password123`) that is used for all testing.
