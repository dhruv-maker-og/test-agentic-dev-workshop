# [BACKEND] Restaurant & Menu API

## User Story
As a customer I want to retrieve a list of restaurants and view a restaurant's menu items so that I can browse what is available to order.

## Assignment Order
Step 3 of 7 — assign after: [DATABASE] Cart & CartItem Models is merged
Tier: BACKEND — primary slice

## Context
Pre-built from copilot-instructions.md:
- JWT auth middleware → `src/backend/src/middleware/auth.ts`
- Auth routes → `src/backend/src/routes/auth.ts`
- Express app entry → `src/backend/src/index.ts`

Database models available (from DATABASE issues):
- Restaurant, MenuItem, Cart, CartItem (via Prisma)

This issue adds only the restaurant and menu endpoints.

## API Endpoints

- **GET /api/restaurants** — returns all restaurants
  Request: none
  Response: `[{ id, name, description, createdAt }]`
  Auth: required (JWT)
  Status: 200 OK / 401 Unauthorized

- **GET /api/restaurants/:id/menu** — returns all menu items for a given restaurant
  Request: none (restaurant ID in URL param)
  Response: `[{ id, name, description, price, restaurantId, createdAt }]`
  Auth: required (JWT)
  Status: 200 OK / 401 Unauthorized / 404 Not Found (if restaurant does not exist)

## Acceptance Criteria
- [ ] `GET /api/restaurants` returns 200 with an array of all restaurants
- [ ] `GET /api/restaurants/:id/menu` returns 200 with menu items for the specified restaurant
- [ ] `GET /api/restaurants/:id/menu` returns 404 when the restaurant does not exist
- [ ] Both endpoints return 401 when no valid JWT is provided
