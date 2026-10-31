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

## Adjusting the care heading

In `styles/editorial.css`, the `.home-page #care-heading` rule sets `--care-heading-size: clamp(1.6rem, 2.1vw, 1.875rem)`. The three values are the minimum size, fluid viewport size, and maximum size. Lower them for smaller text or raise them for larger text. This changes only the “Thoughtful Support” heading; recheck its first-line fit at 768px and 1024px after enlarging it. The line can wrap when text is enlarged for accessibility.


## Services pages and sample menu

Care, Dining, and Activities live at `/care`, `/dining`, and `/activities`. The standalone Photo Gallery page and navigation links have been removed; its old URL redirects to the illustration preview on Our Home. Retired page URLs redirect to the new content; Floor Plans redirects to Our Home's rooms section.

The Dining page downloads `public/media/sample-menu.pdf`. This is an illustrative example, not a current meal schedule. Replace that file with the final owner-supplied PDF without changing the download URL. Keep its content factual and review the download after replacement.


## FAQ and Family Guides

The Resources menu contains FAQ (`/resources/faq`), Family Guides (`/resources/family-guides`), and Blogs (`/blog`). Six researched guides use `/resources/family-guides/:slug`; unknown guide slugs return to the index. `/resources` redirects to the index. The footer links directly to Blog, Why Us, What to Expect, About, and Our Home; existing blog content and URLs remain unchanged.

FAQ source content is in `components/resources/faq-data.json`. Guide content, official source URLs and review dates are in `components/resources/guide-data.js`; recheck source guidance and revise the review date when updating claims. Keep care qualifications and the approved starting-price qualifier. The move-in checklist supports printing from the page; it is a planning tool, not a substitute for individual admission instructions.

New pages set browser titles and descriptions while mounted and restore the prior metadata when navigating away. This remains a client-rendered React/Vite site.
