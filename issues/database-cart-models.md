# [DATABASE] Cart & CartItem Models

## User Story
As a system I need Cart and CartItem models so that the API can store and manage per-user shopping cart data.

## Assignment Order
Step 2 of 7 — assign after: [DATABASE] Restaurant & Menu Item Models is merged
Tier: DATABASE — extension slice

## Context
Pre-built models from copilot-instructions.md:
- User model in `src/backend/prisma/schema.prisma` — do not modify

Models added by the previous DATABASE issue:
- Restaurant and MenuItem models — do not modify

This issue adds only the Cart and CartItem models required for the shopping cart slice.

## Models to Add

**Cart**
- id: Int — auto-incrementing primary key
- userId: Int — foreign key to User (unique — one cart per user)
- createdAt: DateTime — defaults to now

**CartItem**
- id: Int — auto-incrementing primary key
- cartId: Int — foreign key to Cart
- menuItemId: Int — foreign key to MenuItem
- quantity: Int — number of this item in the cart (minimum 1)
- createdAt: DateTime — defaults to now

## Relationships
- User has one Cart
- Cart belongs to one User
- Cart has many CartItems
- CartItem belongs to one Cart
- CartItem belongs to one MenuItem

## Seed Data
No seed data is needed for Cart and CartItem — carts are created dynamically when users add items. The Restaurant and MenuItem seed data from the previous issue is sufficient.

## Acceptance Criteria
- [ ] Migration runs without errors
- [ ] Cart model created with id, userId (unique), and createdAt fields
- [ ] CartItem model created with id, cartId, menuItemId, quantity, and createdAt fields
- [ ] Pre-built User model and test user unchanged
