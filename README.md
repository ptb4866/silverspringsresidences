# Silver Springs Residency

React 19, Vite, and Tailwind application for Silver Springs assisted living in Menifee, California.

## Run locally

Use Node.js 20.19+ or a current Node.js LTS release, with npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally http://localhost:5173. To use the same address as the browser tests:

```sh
npm run dev -- --host 127.0.0.1 --port 5173
```

No local database or Docker service is needed to render the website. Video, images, fonts, and the Leaflet library are served locally. Map tiles require an internet connection.

## Production build

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Preview at http://127.0.0.1:4173. Deploy the generated `dist` directory to a static host. Configure all application routes to fall back to `index.html` so direct links such as `/assisted-living` work.

## Browser tests

```sh
npm run test:e2e
```

The suite uses locally installed Google Chrome by default. To use Microsoft Edge in PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:e2e
```

Alternatively, install Playwright Chromium with `npx playwright install chromium`, then set `PLAYWRIGHT_CHANNEL=chromium`. Playwright starts Vite automatically if it is not already running. Results and layout screenshots are stored in `test-results`; the HTML report is in `playwright-report`.

Tests intercept every Supabase call. They cover responsive routes, enlarged text, menu/dialog keyboard behavior, video playback/fallbacks, validation, and successful/failed form requests without sending real inquiries or newsletter subscriptions.

After `npm run build`, run `npm run test:preview` to verify the built homepage and direct inner-page loads against Vite's production preview. That command starts the preview server automatically if needed.

## Connected services

Contact messages and tour requests use the existing hosted Supabase project configured in `lib/supabase.js`. The browser uses its public anonymous key. Do not put privileged Supabase or Resend keys into browser code.

The backend requires the existing `contact_messages`, `tour_requests`, and `newsletter_subscribers` tables and the `send-contact-notification`, `send-tour-notification`, and `add-to-resend-contacts` Edge Functions. A saved request remains successful if a separate email notification fails, preventing duplicate submissions. Tour dates represent the local calendar day, and the team confirms requested visits.

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for the existing newsletter setup. Email delivery requires server-side Resend configuration and deployed notification functions. The repository only includes the newsletter Edge Function source; deploying missing notification functions requires backend account access and their source code. No migrations or production writes are performed by the redesign tests.

Braverde House is the sole residence currently available. Contact maps use an address-based Google Maps embed; the separate directions page uses Leaflet with OpenStreetMap tiles. Both require an internet connection.

## Design and assets

The homepage uses a mobile-first layout, a green/ivory/gold palette, Libre Baskerville headings, and Manrope body text. Shared typography, navigation, buttons, and footer apply throughout the site. Reduced-motion and data-saving preferences disable the hero video; blocked or failed playback retains the poster.

Media sources, transformations, and licenses are documented in [public/media/SOURCES.md](public/media/SOURCES.md). Existing residence illustrations are not verified property photos; the homepage labels their source and encourages visitors to request current images.

Optional development query tools can be enabled by setting `VITE_ENABLE_QUERY_DEVTOOLS=true` locally. They are excluded from production.
