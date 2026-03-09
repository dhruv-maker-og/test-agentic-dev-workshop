# [BACKEND] Cart API

## User Story
As a customer I want to add items to my cart, view my cart, adjust quantities, and remove items so that I can manage my food order before checkout.

## Assignment Order
Step 4 of 7 — assign after: [BACKEND] Restaurant & Menu API is merged
Tier: BACKEND — extension slice

## Context
Pre-built from copilot-instructions.md:
- JWT auth middleware → `src/backend/src/middleware/auth.ts`
- Auth routes → `src/backend/src/routes/auth.ts`
- Express app entry → `src/backend/src/index.ts`

Database models available (from DATABASE issues):
- Cart, CartItem, MenuItem (via Prisma)

Endpoints from the previous BACKEND issue:
- GET /api/restaurants, GET /api/restaurants/:id/menu — already implemented

This issue adds only the cart management endpoints. All cart endpoints are user-scoped — each user can only access their own cart.

## API Endpoints

- **GET /api/cart** — returns the authenticated user's cart with all items
  Request: none
  Response: `{ id, userId, createdAt, items: [{ id, menuItemId, quantity, createdAt, menuItem: { id, name, price } }] }`
  Auth: required (JWT)
  Status: 200 OK / 401 Unauthorized

- **POST /api/cart/items** — adds a menu item to the cart (creates cart if needed)
  Request: `{ menuItemId: number }`
  Response: `{ id, cartId, menuItemId, quantity, createdAt }`
  Auth: required (JWT)
  Status: 201 Created / 401 Unauthorized
  Note: If the menuItemId already exists in the cart, increment its quantity by 1 instead of creating a duplicate

- **PUT /api/cart/items/:id** — updates the quantity of a cart item
  Request: `{ quantity: number }`
  Response: `{ id, cartId, menuItemId, quantity, createdAt }`
  Auth: required (JWT)
  Status: 200 OK / 401 Unauthorized / 404 Not Found
  Note: Quantity must be at least 1

- **DELETE /api/cart/items/:id** — removes a cart item
  Request: none
  Response: 204 No Content
  Auth: required (JWT)
  Status: 204 No Content / 401 Unauthorized / 404 Not Found

## Acceptance Criteria
- [ ] `GET /api/cart` returns 200 with the user's cart and all cart items including menu item details
- [ ] `POST /api/cart/items` creates a new cart item with quantity 1, or increments quantity if the item already exists
- [ ] `PUT /api/cart/items/:id` updates quantity and `DELETE /api/cart/items/:id` removes the item
- [ ] All four endpoints return 401 when no valid JWT is provided and are scoped to the authenticated user's cart only
