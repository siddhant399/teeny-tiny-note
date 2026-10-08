# Tiny Sorry Note

A soft, static apology page with small animations and a different gentle note on each visit. It has no backend, tracking, notifications, or messages sent outside the page.

## Personalize it

Open `app.js` and edit the `copy` object near the top:

- `recipient`
- `intro`
- `detail`
- `signature`
- `returnNotes`

Keep the apology specific and honest. The site deliberately gives the recipient space instead of pressuring them to respond.

## Preview locally

Open `index.html` in a browser, or serve this folder with any basic static-file server.

## Publish it

This folder is ready for static hosting. A few easy options:

1. **Netlify Drop:** sign in to Netlify, then drag this folder into the deploy area.
2. **Cloudflare Pages:** create a Pages project from a Git repository; use no build command and set the output folder to the repository root.
3. **GitHub Pages:** put these files in a repository and enable Pages from the branch that contains `index.html`.

Once it is live, share the public URL only with the person you intend to reach.
