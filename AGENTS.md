# Silver Springs Residency

This repository is a React 19/Vite SPA, not a Next.js server application. `src/compat` adapts legacy Next-style components to React Router.

## Architecture

- `src/App.jsx` assembles the shared shell and routes. Inner pages and the tour dialog are loaded on demand; the homepage is eager. Route scrolling runs inside the route Suspense boundary.
- `components/layout/EditorialHeader.jsx`, `EditorialFooter.jsx`, and `Wordmark.jsx` provide the shared identity and navigation. Menus and tour dialogs use Radix for keyboard/focus behavior.
- `components/home/EditorialHome.jsx` and `CinematicHero.jsx` render the homepage. Video stays off for reduced-motion/data-saving preferences and falls back to locally stored poster images after playback errors.
- `styles/editorial.css`, `app/globals.css`, and Tailwind define shared typography and design tokens. Manrope and Libre Baskerville are bundled through Fontsource. Keep headings serif and body/form text sans-serif.
- Contact and tour hooks write to the existing hosted Supabase backend. A failed database write is an error; a failed notification after a saved write must not prompt duplicate submissions. Tour dates use the visitor's local calendar date.
- Leaflet is bundled locally; map tiles come from OpenStreetMap. The map must clean up correctly in React Strict Mode.

## Content and assets

Keep business information factual. Braverde House is the only currently available residence; do not advertise Willow or introduce unverified addresses. Existing property illustrations are not verified photographs. Sources and licenses are documented in `public/media/SOURCES.md`.

## Verification

Frontend or backend behavior changes require corresponding Playwright coverage. Run `npm run test:e2e` and `npm run build`. The suite must intercept Supabase calls and never send real inquiries, tour requests, or newsletter subscriptions. Check phone, tablet, and desktop overflow and keyboard accessibility.

Keep credentials out of logs and do not add privileged keys to client code. Build output is generated with `npm run build`; do not hand-edit it.
