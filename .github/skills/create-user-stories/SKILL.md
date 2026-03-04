---
name: create-user-stories
description: Decomposes a BRD into role-specific GitHub Issue files covering frontend,
  backend, database and E2E testing. Writes one .md file per issue to the issues/ folder.
  A GitHub Actions workflow reads these files and creates the Issues automatically on merge.
---

# Skill — Create User Stories

## What You Do
Read the BRD and write one markdown file per role per feature into the `issues/` folder.
Each file starts with an H1 heading (the Issue title) followed by the Issue body.
When the PR is merged, GitHub Actions creates the Issues automatically.

## Steps
1. Read `docs/requirements/BRD.md`
2. Identify features from the functional requirements
3. For each feature write 4 files — one per role — into `issues/`
4. Raise a PR with all files
5. Confirm with a summary of all files created

## Issue Roles
For every feature, create exactly these 4 files:

| File | Prefix | Owner | Covers |
|------|--------|-------|--------|
| `issues/frontend.md` | [FRONTEND] | UI Developer | React components, pages, UI behaviour |
| `issues/backend.md` | [BACKEND] | Backend Developer | API endpoints, controllers, services |
| `issues/database.md` | [DATABASE] | Architect | Prisma schema additions, migrations |
| `issues/playwright.md` | [PLAYWRIGHT] | QA Engineer | E2E user journey, assertions |

## File Format

The FIRST LINE must be an H1 heading — this becomes the GitHub Issue title.
Everything after becomes the Issue body.

### issues/frontend.md
```
# [FRONTEND] {Feature Name}

## User Story
As a {role} I want to {action} so that {benefit}

## Context
{What already exists that this builds on}

## What to Build
- {Component 1}
- {Component 2}
- {Component 3}

## Acceptance Criteria
- [ ] {UI behaviour criterion 1}
- [ ] {UI behaviour criterion 2}
- [ ] {UI behaviour criterion 3}
```

### issues/backend.md
```
# [BACKEND] {Feature Name}

## User Story
As a system I need to {action} so that {benefit}

## Context
{What already exists — middleware, auth, app setup etc.}

## API Endpoints
- METHOD /api/path — description

## Acceptance Criteria
- [ ] {endpoint} returns {status} with {shape}
- [ ] All endpoints return 401 without valid JWT
- [ ] {Validation criterion}
```

### issues/database.md
```
# [DATABASE] {Feature Name}

## User Story
As a system I need {data models} so that {benefit}

## Context
{Existing models this builds on}

## Models to Add
{ModelName}
- field: type
- field: type

## Relationships
- {Entity A} has {one/many} {Entity B}

## Acceptance Criteria
- [ ] Migration runs without errors
- [ ] Models have correct fields and relations
- [ ] Existing models unchanged
```

### issues/playwright.md
```
# [PLAYWRIGHT] {Feature Name}

## User Story
As a QA engineer I want to verify {feature} end to end

## User Journey
1. {Step 1 — action}
2. {Step 2 — action}
3. {Step 3 — expected result}

## Test Credentials
Email: test@foodorder.com
Password: password123

## Acceptance Criteria
- [ ] Full journey passes end to end
- [ ] {Assertion 1}
- [ ] {Assertion 2}
```

## Example (Add to Cart Feature)

### issues/frontend.md
```
# [FRONTEND] Add to Cart

## User Story
As a customer I want to add menu items to my cart so that I can place an order.

## Context
Auth is pre-built (LoginPage, RegisterPage, JWT token in localStorage).
Navbar component exists at src/frontend/src/components/Navbar.tsx.
HomePage exists with restaurant placeholder cards.
This issue adds cart UI on top of the existing scaffold.

## What to Build
- CartIcon component in Navbar showing item count badge
- CartDrawer slide-out panel listing cart items with quantity and total
- Add to Cart button on each menu item card
- All interactive elements must have data-testid attributes

## Acceptance Criteria
- [ ] Cart icon appears in Navbar with count badge showing number of items
- [ ] Clicking cart icon opens CartDrawer from the right
- [ ] CartDrawer lists items with name, quantity, and price
- [ ] Add to Cart button on each menu item updates the count
- [ ] Removing an item from CartDrawer updates count correctly
- [ ] All elements have data-testid for Playwright tests
```

### issues/backend.md
```
# [BACKEND] Add to Cart

## User Story
As a system I need to serve restaurant data and manage cart state
so that customers can browse menus and build their orders.

## Context
Express server runs at src/backend/src/index.ts on port 3001.
Auth middleware exists at src/backend/src/middleware/auth.ts.
JWT verification is already implemented.
This issue adds restaurant, menu, and cart routes.

## API Endpoints
- GET /api/restaurants — list all restaurants
- GET /api/restaurants/:id/menu — list menu items for a restaurant
- GET /api/cart — get current user cart (requires JWT)
- POST /api/cart/items — add item to cart (requires JWT)
- PUT /api/cart/items/:id — update item quantity (requires JWT)
- DELETE /api/cart/items/:id — remove item from cart (requires JWT)

## Acceptance Criteria
- [ ] GET /api/restaurants returns array of restaurants with id, name, description, imageUrl
- [ ] GET /api/restaurants/:id/menu returns array of menu items
- [ ] GET /api/cart returns cart with items for authenticated user
- [ ] POST /api/cart/items adds item and returns updated cart
- [ ] PUT /api/cart/items/:id updates quantity and returns updated cart
- [ ] DELETE /api/cart/items/:id removes item and returns updated cart
- [ ] All cart endpoints return 401 without valid JWT
```

### issues/database.md
```
# [DATABASE] Add to Cart

## User Story
As a system I need Cart and CartItem models so that user cart state
can be persisted across sessions.

## Context
Prisma schema at src/backend/prisma/schema.prisma.
User model already exists with id, email, password, name.
Restaurant and MenuItem models need to be added.
This issue adds all missing models.

## Models to Add
Restaurant
- id: Int @id @default(autoincrement())
- name: String
- description: String
- imageUrl: String
- menuItems: MenuItem[]

MenuItem
- id: Int @id @default(autoincrement())
- restaurantId: Int
- restaurant: Restaurant
- name: String
- description: String
- price: Float
- imageUrl: String

Cart
- id: Int @id @default(autoincrement())
- userId: Int @unique
- user: User
- items: CartItem[]
- createdAt: DateTime @default(now())

CartItem
- id: Int @id @default(autoincrement())
- cartId: Int
- cart: Cart
- menuItemId: Int
- menuItem: MenuItem
- quantity: Int @default(1)

## Relationships
- User has one Cart
- Cart has many CartItems
- CartItem belongs to one MenuItem
- Restaurant has many MenuItems

## Acceptance Criteria
- [ ] Migration runs without errors
- [ ] All 4 models created with correct fields
- [ ] Relations are correct and Prisma Client generates without errors
- [ ] Existing User model and auth flow unchanged
```

### issues/playwright.md
```
# [PLAYWRIGHT] Add to Cart

## User Story
As a QA engineer I want to verify the full add-to-cart journey end to end
so that we can ship with confidence.

## User Journey
1. Navigate to http://localhost:5173/login
2. Enter email: test@foodorder.com and password: password123
3. Click Login button — expect redirect to /home
4. See restaurant list — click on Pizza Palace
5. See menu items — click Add to Cart on Margherita Pizza
6. Verify cart icon in Navbar shows count badge with 1
7. Click cart icon — CartDrawer opens from the right
8. Verify Margherita Pizza appears in CartDrawer with quantity 1
9. Click remove button on the item
10. Verify CartDrawer shows empty state
11. Verify Navbar cart count returns to 0

## Test Credentials
Email: test@foodorder.com
Password: password123

## Acceptance Criteria
- [ ] Login journey completes and redirects to /home
- [ ] Restaurant list is visible on /home
- [ ] Menu items load when a restaurant is selected
- [ ] Add to Cart updates the cart count in Navbar
- [ ] CartDrawer opens and shows correct items
- [ ] Removing item updates count and shows empty state
- [ ] All assertions use data-testid selectors
```
