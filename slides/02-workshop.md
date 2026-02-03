---
marp: true
title: Workshop (Build a Small Flask System)
paginate: true
---

# Workshop
## Build a small Flask web system (generic)

- This workshop is **separate** from fundamentals
- You can apply the same steps to any domain (ticket, events, borrowing, etc.)

---

## Workshop goal
Build a small system that includes:

- Pages: list / detail / form
- Validation + flash messages
- JSON schema (11A) → DB mapping (11B)
- CRUD with DB
- Basic login + protected pages
- Clean structure with Blueprints + templates

---

## Step 1 — Project structure (team-friendly)
Create folders:

- `app/`
- `app/web/`, `app/auth/`, `app/admin/` (Blueprints)
- `app/templates/` with `base.html` + feature folders
- `app/static/` (optional)

Deliverable:
- repository structure committed to Git

---

## Step 2 — Route map (before coding)
Write a simple route map:

- List page (GET)
- Detail page (GET with `<int:id>`)
- Create page (GET + POST)
- Update page (GET + POST)
- Delete action (POST)
- Login/Register (GET + POST)

Deliverable:
- a 1-page route map in README or a slide

---

## Step 3 — UI skeleton with Jinja2
Implement templates:

- `base.html` (layout)
- `partials/navbar.html`
- `partials/flash.html`
- feature templates: list/detail/form

Deliverable:
- routes render pages without DB first (use mock data)

---

## Step 4 — 11A JSON schema (data contract)
Define the JSON schema for your main entity:

- required fields
- types
- example 1 record

Deliverable:
- `docs/schema.json` or a schema section in README

---

## Step 5 — 11B DB mapping + models
Map JSON fields to DB models:

- Create models (SQLAlchemy)
- Decide PK/FK
- Run migrations or create tables (simple setup is OK)

Deliverable:
- `models.py` with at least 1–2 models

---

## Step 6 — CRUD with DB
Implement:

- Create (POST)
- Read list/detail (GET)
- Update (POST)
- Delete (POST)

Deliverable:
- DB-backed CRUD working end-to-end

---

## Step 7 — Login + protect routes
Add authentication:

- Login/Register
- Protect member/admin pages
- (Optional) role check for admin routes

Deliverable:
- at least one protected page

---

## Step 8 — Demo script (5 minutes)
Prepare a demo flow:

- login
- create a record
- view list/detail
- update
- delete
- show flash messages + error handling

Deliverable:
- a short demo checklist
