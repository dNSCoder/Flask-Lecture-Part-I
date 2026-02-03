# Flask Slides (Marp-ready)

This repo contains **Marp-ready Markdown** slide decks for teaching **Flask fundamentals** (Project Year 1 friendly).

## Folder structure
- `slides/00-outline.md` — course/lesson outline deck
- `slides/01-flask-basics.md` — Flask fundamentals (routing, request/response, Jinja2, url_for, blueprints, JSON→DB mapping, CRUD, auth basics)
- `slides/02-workshop.md` — workshop deck (kept separate from the fundamentals deck)
- `slides/assets/images/` — place images here

## How to view/export (recommended: VS Code)
1. Install **VS Code**
2. Install the extension: **Marp for VS Code**
3. Open a slide file under `slides/`
4. Use **Marp: Export** to export as PDF/HTML

## How to export via CLI (optional)
If you prefer command line, install Marp CLI:

```bash
npm i -g @marp-team/marp-cli
```

Export examples:

```bash
# HTML
marp slides/01-flask-basics.md -o dist/01-flask-basics.html

# PDF
marp slides/01-flask-basics.md --pdf -o dist/01-flask-basics.pdf
```

## Git quick start
```bash
git init
git add .
git commit -m "Add Marp slide decks for Flask fundamentals"
```
