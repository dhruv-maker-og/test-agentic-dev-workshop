# [DATABASE] Restaurant & Menu Item Models

## User Story
As a system I need Restaurant and MenuItem models with seed data so that the API can serve restaurant and menu information to customers.

## Assignment Order
Step 1 of 7 — assign after: nothing (assign this first)
Tier: DATABASE — primary slice

## Context
Pre-built models from copilot-instructions.md:
- User model in `src/backend/prisma/schema.prisma` — do not modify
- Test user seed data in `src/backend/prisma/seed.ts` — do not modify existing seed logic

This issue adds only the Restaurant and MenuItem models required for the restaurant browsing slice.

## Models to Add

**Restaurant**
- id: Int — auto-incrementing primary key
- name: String — restaurant display name
- description: String — short description of the restaurant
- createdAt: DateTime — defaults to now

**MenuItem**
- id: Int — auto-incrementing primary key
- name: String — menu item display name
- description: String — short description of the item
- price: Float — item price
- restaurantId: Int — foreign key to Restaurant
- createdAt: DateTime — defaults to now

## Relationships
- Restaurant has many MenuItems
- MenuItem belongs to one Restaurant

## Seed Data
Add realistic sample data to `src/backend/prisma/seed.ts` so the app is usable immediately after migration — never leave domain tables empty.

**Restaurant** — add 2 sample records:
- Pizza Palace — "Authentic Italian pizzas made with fresh ingredients"
- Burger Barn — "Gourmet burgers and crispy fries"

**MenuItem** — add 6 sample records (3 per restaurant):

Pizza Palace:
- Margherita Pizza — "Classic tomato sauce and mozzarella" — $12.99
- Pepperoni Pizza — "Loaded with spicy pepperoni slices" — $14.99
- Garlic Bread — "Toasted bread with garlic butter" — $5.99

Burger Barn:
- Classic Burger — "Beef patty with lettuce, tomato, and cheese" — $10.99
- Bacon Burger — "Beef patty topped with crispy bacon" — $13.99
- Fries — "Golden crispy french fries" — $4.99

Seed data is required for:
- Frontend to show real restaurant and menu content after login (not a blank page)
- Playwright tests to find and interact with real records

## Acceptance Criteria
- [ ] Migration runs without errors
- [ ] Restaurant model created with id, name, description, and createdAt fields
- [ ] MenuItem model created with id, name, description, price, restaurantId, and createdAt fields
- [ ] Seed data populates 2 restaurants and 6 menu items (3 per restaurant)
- [ ] Pre-built User model and test user seed data unchanged
