---
name: create-design-doc
description: Creates a technical design document and Prisma schema from a BRD and
  GitHub Issues. Use when asked to create a design document, technical specification,
  architecture document, or database schema.
---

# Skill — Create Design Document

## What You Do
Read the BRD and user story Issues and produce two files:
1. `docs/design/design-doc.md` — full technical design
2. `src/prisma/schema.prisma` — complete data model

## Steps
1. Read `docs/requirements/BRD.md`
2. Read all Issues labelled `user-story`
3. Read existing `src/prisma/schema.prisma` — understand what already exists
4. Produce `docs/design/design-doc.md` in the format below
5. Produce complete `src/prisma/schema.prisma` including existing + new models
6. Raise a PR with both files

## Design Doc Format

```markdown
# [App Name] — Design Document
**Date:** [Today]
**Source:** BRD.md + GitHub Issues

## 1. Architecture Overview
Describe the system tiers and how they connect.
Include a Mermaid diagram.

## 2. Data Model
Show the complete Prisma schema.
Clearly mark which models are pre-existing and which are new.
Include a Mermaid ER diagram.

## 3. API Endpoints
| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|

## 4. Component Structure
Mermaid diagram of React component hierarchy.
Include data-testid values for all interactive elements.

## 5. Key Flows
Mermaid sequence diagram for the primary user journey.
```

## Prisma Schema Rules
- Always include ALL models — existing and new
- Mark pre-existing models with a comment: `// PRE-BUILT — do not modify`
- New models added by this feature clearly labelled: `// NEW`
- Every relation must have both sides defined
- Run `npx prisma validate` mentally — check for missing relations

## API Design Rules
- RESTful conventions — nouns not verbs
- Protected routes explicitly marked
- Response shapes documented for complex responses
- Error responses: `{ error: string }` with correct HTTP status

## Component Design Rules
- Every interactive element must have a `data-testid` attribute
- Document the data-testid value in the component tree
- This is required for Playwright tests to work

## Mermaid Diagrams to Always Include
1. Architecture overview — 3-tier diagram
2. ER diagram — all entities and relationships
3. Component tree — React hierarchy with data-testid values
4. Sequence diagram — primary user journey end to end

## Example (Add to Cart Feature)

**New models to add:**
```prisma
// NEW
model Cart {
  id        Int        @id @default(autoincrement())
  userId    Int        @unique
  user      User       @relation(fields: [userId], references: [id])
  items     CartItem[]
  createdAt DateTime   @default(now())
}

// NEW
model CartItem {
  id         Int      @id @default(autoincrement())
  cartId     Int
  menuItemId Int
  quantity   Int      @default(1)
  cart       Cart     @relation(fields: [cartId], references: [id])
  menuItem   MenuItem @relation(fields: [menuItemId], references: [id])
}
```

**Key API endpoints:**
- GET /api/restaurants — list restaurants
- GET /api/restaurants/:id/menu — get menu items
- GET /api/cart — get user cart with items
- POST /api/cart/items — add item
- PUT /api/cart/items/:id — update quantity
- DELETE /api/cart/items/:id — remove item

**data-testid values:**
- `cart-icon`, `cart-count`, `cart-drawer`
- `cart-item`, `remove-item-button`
- `add-to-cart-button`, `menu-item-card`
