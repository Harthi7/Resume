# Holographic Resume Website

A static, interactive resume site built with plain HTML, CSS, and JavaScript.

## Files

- `index.html` — page structure
- `styles.css` — holographic design, layout, responsiveness
- `script.js` — resume data, animations, project modal, command palette, filters

## How to use

1. Open `script.js`
2. Edit the `resumeData` object at the top:
   - `profile`
   - `stats`
   - `experience`
   - `skills`
   - `projects`
3. Set `resumeLink` to your real PDF resume URL or file path.
4. Open `index.html` in a browser.

## How to deploy

You can deploy this on:

- GitHub Pages
- Netlify
- Vercel (static)
- Cloudflare Pages

No build step is required.

## Practical advice

This design is visually strong, but resumes fail when style hides substance. Replace the demo copy with concrete results:

- what you built
- what changed because of it
- what scale or constraint mattered
- what stack you used

## Suggested next upgrade

If you want this to become a serious portfolio rather than just a nice landing page, the next layer should be:

- case study pages per project
- downloadable PDF resume
- real metrics
- dark/light or recruiter mode toggle
- analytics
- contact form backed by a serverless function
