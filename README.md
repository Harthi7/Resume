# 3D Hologram Resume Site

This is a browser-based 3D resume concept built with plain HTML, CSS, JavaScript, and Three.js.

## What it is

- A rotating 3D device that projects resume panels as holograms
- Mouse / trackpad orbit controls so the user can inspect it from different angles
- Clickable 3D panels for Profile, Experience, Projects, Skills, Impact, and Contact
- HUD overlay for readable details while preserving the 3D scene
- Static deployment friendly: works on GitHub Pages with no build step

## Files

- `index.html` — app shell and HUD
- `styles.css` — layout and visual styling
- `app.js` — 3D scene, animation, controls, and content data

## How to edit content

Open `app.js` and replace the values inside:

- `resumeData.profile`
- `resumeData.sections`

Keep the same structure unless you also want to change rendering behavior.

## Local run

For best results, serve it from a local server instead of double-clicking the file.

Examples:

### Python

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## GitHub Pages

Upload these files to the root of your repo and publish from:

- Branch: `main`
- Folder: `/(root)`

## Important tradeoff

This is visually stronger than a normal resume site, but it is also heavier and less direct. Use it as a portfolio layer, not as your only hiring asset. Keep a standard PDF resume and a simpler recruiter-friendly page as well.
