---
name: create-brd
description: Creates a Business Requirements Document from a requirement Issue or text.
  Use this when asked to create a BRD, analyse requirements, or produce a business
  requirements document from an Issue or requirement text.
---

# Skill — Create BRD

## What You Do
Read the requirement and produce a complete Business Requirements Document.
Do not ask clarifying questions — make reasonable assumptions and document them.

## Steps
1. Read the requirement text or GitHub Issue provided
2. Identify functional requirements — what the system must do
3. Identify non-functional requirements — if not stated, apply sensible defaults
4. Identify user roles — who uses the system
5. Define scope — what is in and what is out
6. Document assumptions — where requirement was unclear
7. Produce the BRD in the format below
8. Save as `docs/requirements/BRD.md`

## BRD Format

```markdown
# Business Requirements Document
**Project:** [App Name]
**Date:** [Today]
**Source:** [Issue number or requirement text reference]

## 1. Summary
One paragraph describing what the application does.

## 2. User Roles
| Role | Description |
|------|-------------|
| [Role] | [What they do] |

## 3. In Scope
- [Feature 1]
- [Feature 2]

## 4. Out of Scope
- [Explicitly excluded feature]

## 5. Functional Requirements
| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-001 | [Requirement] | [2 testable criteria] |

## 6. Non-Functional Requirements
| ID | Category | Requirement |
|----|----------|-------------|
| NFR-001 | Security | JWT authentication on all protected routes |
| NFR-002 | Performance | Page load under 3 seconds |
| NFR-003 | Usability | Responsive — works on desktop and mobile |

## 7. Assumptions
- [Assumption 1 — what was unclear and what was assumed]
- [Assumption 2]
```

## Functional Requirements to Always Check
For any application, check whether the requirement implies:
- User authentication — if users are mentioned, auth is likely needed
- Core entity management — what are the main things the app manages
- CRUD operations — create, read, update, delete on those entities
- User roles and permissions — who can do what

## Non-Functional Requirement Defaults
Apply these if the requirement does not state otherwise:
- Security: JWT authentication for protected routes
- Performance: Page load under 3 seconds
- Usability: Responsive design for desktop and mobile

## Example (Food Ordering App)

Requirement:
> "We want to build an online food ordering platform. Customers browse
> restaurants, view menus and add items to a cart."

Produces:

**User Roles:** Customer, Restaurant Admin
**In Scope:** Browse restaurants, view menus, cart management
**Out of Scope:** Payment processing (not mentioned — assumed out of scope)
**Assumptions:** Auth required as customers need persistent carts;
payment out of scope as not mentioned in requirement
