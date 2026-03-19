# Projected Resume Sheet v9

This revision removes the on-screen visit counter and switches the site to background analytics.

## What changed
- removed the visible visit counter from the hologram HUD
- restored the cleaner scene layout
- added optional GoatCounter background analytics through `app.js`

## Files
- `index.html`
- `styles.css`
- `app.js`

## Publish
Push the files to the root of your GitHub Pages repository and wait for Pages to redeploy.

## Turn analytics on
Open `app.js` and set:

```js
const analyticsConfig = {
  provider: "goatcounter",
  goatcounterCode: "YOUR_GOATCOUNTER_CODE"
};
```

Example:

```js
const analyticsConfig = {
  provider: "goatcounter",
  goatcounterCode: "abdullah-resume"
};
```

That loads GoatCounter in the background and keeps the 3D scene free of counters or overlays.

## Edit content
Replace the `resumeData` object in `app.js` with your actual resume content.
