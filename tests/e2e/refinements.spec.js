import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*.supabase.co/**", route => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) }));
});

test("contact shows caregiving imagery and an address map without a map tour action", async ({ page }) => {
  await page.route("https://maps.google.com/**", route => route.fulfill({ contentType: "text/html", body: "<html><body>Map provider fixture</body></html>" }));
  await page.goto("/contact-us");
  await expect(page.locator(".contact-hero img")).toHaveAttribute("src", "/media/contact-care.webp");
  const map = page.getByTitle("Braverde House location", { exact: false });
  await expect(map).toBeVisible();
  const url = new URL(await map.getAttribute("src"));
  expect(url.searchParams.get("q")).toBe("32336 Parker Street, Menifee, CA 92584");
  expect(url.searchParams.get("output")).toBe("embed");
  await expect(map).toHaveAttribute("loading", "lazy");
  await expect(page.locator("#locations").getByRole("link", { name: "Get Directions" })).toHaveAttribute("href", /destination=32336%20Parker/);
  await expect(page.locator("#locations").getByRole("link", { name: "Schedule a Tour" })).toHaveCount(0);
  await expect(page.getByText("Map Embed Would Go Here")).toHaveCount(0);
});

test("only Braverde is advertised and its directions remain beneath the card", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".residence-card")).toHaveCount(1);
  await expect(page.locator("main")).not.toContainText("Willow");
  await expect(page.locator("main")).not.toContainText("Two single-family");
  await page.goto("/contact-us/locations");
  await expect(page.locator("main h1")).toHaveText("Braverde House");
  await expect(page.locator("main")).not.toContainText("Getting Here");
  await expect(page.locator("main")).not.toContainText("Our Locations");
  await expect(page.locator("main").getByRole("button", { name: /Schedule/ })).toHaveCount(0);
  const directions = page.locator("main").getByRole("link", { name: "Get Directions" });
  await expect(directions).toHaveAttribute("target", "_blank");
  await expect(directions).toHaveAttribute("rel", "noopener noreferrer");
  const url = new URL(await directions.getAttribute("href"));
  expect(url.searchParams.get("destination")).toBe("32336 Parker Street, Menifee, CA 92584");
});

test("business telephone and amenities are current", async ({ page }) => {
  for (const route of ["/", "/contact-us", "/contact-us/locations", "/contact-us/map-directions", "/services-and-amenities"]) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    if (route === "/contact-us/map-directions") await expect(page.getByText("Select Location", { exact: true })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("246-0108");
    const phones = page.locator('a[href^="tel:"]');
    for (const phone of await phones.all()) await expect(phone).toHaveAttribute("href", "tel:+19512460895");
  }
  await expect(page.locator("main")).not.toContainText("Gardening opportunities");
});

test("shared gold buttons and typography carry through contact, resources, and tour", async ({ page }) => {
  for (const route of ["/contact-us", "/blog", "/blog/understanding-senior-care-levels"]) {
    await page.goto(route);
    const typography = await page.locator("main h1").evaluate(e => ({ font: getComputedStyle(e).fontFamily, weight: getComputedStyle(e).fontWeight }));
    expect(typography.font).toContain("Libre Baskerville");
    expect(typography.weight).toBe("400");
  }
  await page.goto("/contact-us");
  const button = page.getByRole("button", { name: "Send Message", exact: true });
  await expect(button).toHaveCSS("background-color", "rgb(131, 117, 84)");
  await expect(button).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(button).toHaveCSS("font-weight", "600");
  await expect(button).toHaveCSS("font-size", "14px");
  await button.hover();
  await expect(button).toHaveCSS("background-color", "rgb(111, 98, 70)");
  await page.goto("/schedule-a-tour");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator('[role="dialog"] .bg-brand-secondary').first()).toHaveCSS("background-color", "rgb(131, 117, 84)");
});

test("creative hero uses a short local video", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("video source")).toHaveAttribute("src", "/media/creative-lifestyle.mp4");
  await expect.poll(() => page.locator("video").evaluate(e => Number.isFinite(e.duration) && e.duration >= 10 && e.duration <= 13)).toBe(true);
});

test("contact remains readable with enlarged text on a narrow phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/contact-us");
  await page.evaluate(() => document.documentElement.style.fontSize = "150%");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const directions = page.locator("#locations").getByRole("link", { name: "Get Directions" });
  await directions.focus();
  await expect(directions).toBeFocused();
  await expect(directions).toHaveCSS("outline-style", "solid");
});
