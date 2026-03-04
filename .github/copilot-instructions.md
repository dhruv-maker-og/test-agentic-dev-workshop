# FoodOrder — Copilot Instructions

## Project
FoodOrder is a web application where customers browse restaurants,
view menus, and add items to a cart.

## Tech Stack
- Backend: Node.js + Express + TypeScript
- Frontend: React + TypeScript + Vite
- Database: SQLite via Prisma ORM
- Auth: JWT (pre-built — do not rebuild)
- Testing: Jest (unit) + Playwright (E2E)

## What Is Pre-built
The following already exist in the repo — never rebuild them:
- Login and Register pages (src/frontend/src/pages/LoginPage.tsx, RegisterPage.tsx)
- JWT auth middleware (src/backend/middleware/auth.ts)
- Auth routes (src/backend/routes/auth.ts)
- Navbar shell component (src/frontend/src/components/Navbar.tsx) — empty, no cart icon yet
- React app entry point, Router, protected route wrapper

## Data Models Only (No API or UI Implementation)
These models exist in schema.prisma with seed data, but have NO routes, controllers, or frontend pages:
- User, Restaurant, MenuItem Prisma models
- Seed data — 2 restaurants (Pizza Palace, Burger Barn), 6 menu items, 1 test user
- **Important:** Restaurant listing API and menu viewing UI do NOT exist — build them in this workshop

## Feature in Scope
This workshop builds: **Restaurant Browsing and Shopping Cart**

**Restaurant Discovery & Menu Browsing:**
- List restaurants (name + description only, no images)
- View menu items per restaurant (name, description, price — no images)
- Navigate between restaurant list and menu pages

**Shopping Cart:**
- Add menu items to cart with quantity management
- Adjust quantity using +/- buttons
- Cart persists per user
- Cart icon in Navbar shows total item count (sum of quantities)
- Cart drawer shows items with quantity controls and cart total
- Remove items from cart

**Simplifications for 4-hour timeline:**
- No images for restaurants or menu items
- Basic styling only (functional over fancy)
- Core test coverage (happy paths, minimal edge cases)

## Out of Scope
- Payment processing
- Order placement
- Delivery tracking
- Restaurant admin features
- Restaurant or menu item images
- Advanced UI animations or transitions
- Restaurant search/filtering
- Menu item customization (size options, add-ons)
- Comprehensive error handling UI
- Extensive edge case testing

## Design Constraints
To complete the workshop in 4 hours, follow these constraints:
- **No images:** All restaurant and menu item displays are text-only
- **Minimal styling:** Basic CSS for layout and functionality, no complex animations
- **Single cart per user:** Cart automatically created on first item addition
- **Quantity logic:** Adding duplicate item increments existing cart item quantity
- **Testing scope:** Happy path + authentication tests only, skip extensive edge cases

## Coding Standards
- TypeScript strict mode — no `any`
- Async/await — no raw promises
- All API errors return `{ error: string }` with correct HTTP status
- All protected routes use existing auth middleware
- React components use functional style with hooks
- All interactive elements must have `data-testid` attributes

## File Structure
```
src/
├── backend/
│   ├── index.ts
│   ├── middleware/
│   ├── routes/
│   ├── controllers/
│   └── __tests__/
├── frontend/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── context/
│       └── services/
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

## Test User Credentials
- Email: test@foodorder.com
- Password: password123

## Never
- Rebuild auth
- Use `any` in TypeScript
- Skip `data-testid` on interactive elements
- Touch pre-built files unless explicitly asked
