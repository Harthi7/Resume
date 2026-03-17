# Holographic Resume · CSS 3D Version

This version is dependency-free and is designed to avoid the problem where the center scene fails to render because of external 3D libraries or WebGL issues.

## What this fixes

- visible central projector device
- visible hologram beam
- floating resume cards around the device
- mouse drag to inspect from different angles
- mouse wheel zoom
- click a card or press 1-6 to focus a module

## Files

- `index.html`
- `styles.css`
- `app.js`

## Publish to GitHub Pages

Replace the old files in your repo root with these three files, commit to `main`, then wait a minute or two for GitHub Pages to update.

## Content to change

Edit `resumeData` in `app.js`:

- `profile.name`
- `profile.title`
- `profile.summary`
- `profile.metrics`
- each item in `sections`

## Note

This is still a browser simulation, not physical hologram hardware. But it does render a projector + floating modules scene that can be inspected from multiple angles without relying on external 3D packages.
