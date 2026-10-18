import { test, expect } from "@playwright/test";

// Every Supabase request is intercepted: this suite never sends real inquiries.
test.beforeEach(async ({ page }) => {
  await page.route("**/*.supabase.co/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ id: "test-request", success: true }),
    }),
  );
});

const routes = [
  "/",
  "/assisted-living",
  "/services-and-amenities",
  "/photo-gallery",
  "/floor-plans",
  "/contact-us",
  "/contact-us/locations",
  "/contact-us/map-directions",
  "/blog",
  "/blog/understanding-senior-care-levels",
  "/schedule-a-tour",
];

for (const width of [375, 768, 1440]) {
  for (const route of routes) {
    test(`${route} renders without overflow or runtime errors at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(route);
      if (route === "/schedule-a-tour") {
        await expect(
          page.getByRole("dialog", { name: "Schedule Your Tour" }),
        ).toBeVisible();
        await page.getByRole("button", { name: "Close tour dialog" }).click();
      }
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("main h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("main img:not(.leaflet-tile):not(.leaflet-marker-icon):not(.leaflet-marker-shadow)").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() => image.evaluate((e) => e.complete && e.naturalWidth > 0))
          .toBe(true);
      }
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      const overflow = await page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
          .slice(0, 8)
          .map((e) => ({
            tag: e.tagName,
            class: e.className,
            text: e.textContent.slice(0, 60),
            width: e.getBoundingClientRect().width,
          })),
      );
      await page.screenshot({
        path: testInfo.outputPath("page.png"),
        fullPage: true,
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        JSON.stringify(overflow),
      ).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

test("320px homepage loads all images, uses local fonts, and remains readable at 150% text size", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((e) => e.complete && e.naturalWidth > 0))
      .toBe(true);
  }
  const fonts = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector("h1")).fontFamily,
  }));
  expect(fonts.body).toContain("Manrope");
  expect(fonts.heading).toContain("Libre Baskerville");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "150%";
    window.scrollTo(0, 0);
  });
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  const heroFits = await page.locator(".home-hero").evaluate(e => e.querySelector(".hero-actions").getBoundingClientRect().bottom < e.getBoundingClientRect().bottom);
  expect(heroFits).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("320-text-enlarged.png"),
    fullPage: true,
  });
});

test("mobile navigation closes on selection and Escape, and tour dialog restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Photo Gallery", exact: true })
    .click();
  await expect(page).toHaveURL(/photo-gallery/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await page.goto("/");
  const tour = page
    .locator("main")
    .getByRole("button", { name: "Schedule a Tour", exact: true });
  await tour.click();
  await expect(
    page.getByRole("dialog", { name: "Schedule Your Tour" }),
  ).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(
      () => !!document.activeElement.closest('[role="dialog"]'),
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(tour).toBeFocused();
});

test("desktop menu and homepage links reach their destinations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Living Here" }).click();
  await page.getByRole("menuitem", { name: "Floor Plans" }).click();
  await expect(page).toHaveURL(/floor-plans/);
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore Our Homes", exact: true })
    .click();
  await expect(page).toHaveURL(/#our-homes/);
  await page.locator(".residence-content").getByRole("button", { name: "Schedule A Tour" }).click();
  await expect(page.getByRole("dialog", { name: "Schedule Your Tour" })).toBeVisible();
});

test("hero video plays locally and supports pause and resume", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const pause = page.getByRole("button", { name: "Pause background video" });
  await expect(pause).toBeVisible({ timeout: 20000 });
  await expect
    .poll(() =>
      page
        .locator("video")
        .evaluate(
          (e) =>
            e.readyState >= 2 &&
            !e.paused &&
            e.muted &&
            e.loop &&
            e.playsInline,
        ),
    )
    .toBe(true);
  await pause.click();
  await expect(
    page.getByRole("button", { name: "Play background video" }),
  ).toBeVisible();
  expect(await page.locator("video").evaluate((e) => e.paused)).toBe(true);
  await page.getByRole("button", { name: "Play background video" }).click();
  await expect(pause).toBeVisible();
});

for (const fallback of [
  "reduced motion",
  "save data",
  "media failure",
  "autoplay blocked",
]) {
  test(`hero keeps its poster for ${fallback}`, async ({ page }) => {
    if (fallback !== "reduced motion")
      await page.emulateMedia({ reducedMotion: "no-preference" });
    if (fallback === "save data")
      await page.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: { saveData: true },
        }),
      );
    if (fallback === "media failure")
      await page.route("**/creative-lifestyle.mp4", (route) => route.abort());
    if (fallback === "autoplay blocked")
      await page.addInitScript(() => {
        HTMLMediaElement.prototype.play = () =>
          Promise.reject(new DOMException("Blocked", "NotAllowedError"));
      });
    await page.goto("/");
    await expect
      .poll(() =>
        page
          .locator(".hero-poster img")
          .evaluate((e) => e.complete && e.naturalWidth > 0),
      )
      .toBe(true);
    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.locator("main h1")).toContainText(/Where\s*Care\s*Feels\s*Like\s*Home/);
  });
}

test("gallery images open from the keyboard and close with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/photo-gallery");
  const photo = page.getByRole("button", { name: /Enlarge Exterior view/ });
  await photo.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Photo gallery image" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(photo).toBeFocused();
});

test("testimonial selection keeps inner pages within the mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/services-and-amenities");
  await page.getByRole("button", { name: "Go to testimonial 2" }).click();
  await expect(page.getByRole("button", { name: "Go to testimonial 2" })).toHaveAttribute("aria-pressed", "true");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("tour calendar fits a 320px phone", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 812 });
  const dialog = await fillTour(page);
  await dialog.getByRole("button", { name: "Previous", exact: true }).click();
  await dialog.getByLabel(/Preferred Date/).click();
  const calendar = page.locator('[data-slot="calendar"]');
  await expect(calendar).toBeVisible();
  const box = await calendar.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(320);
  await page.screenshot({ path: testInfo.outputPath("320-calendar.png") });
});

async function fillContact(page) {
  await page.goto("/contact-us");
  await page.getByLabel("Full Name").fill("Test Visitor");
  await page.getByLabel("Email").fill("visitor@example.com");
  await page.getByLabel("Phone").fill("9515550100");
  await page
    .getByLabel("Message", { exact: true })
    .fill("A test inquiry, intercepted by Playwright.");
}

test("contact form validates required fields", async ({ page }) => {
  await page.goto("/contact-us");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Name is required")).toBeVisible();
  await expect(page.getByText("Please enter a valid email")).toBeVisible();
});

for (const outcome of ["success", "database failure", "notification failure"]) {
  test(`contact form handles ${outcome}`, async ({ page }) => {
    let submissions = 0;
    await page.route("**/*.supabase.co/**", (route) => {
      const database = route.request().url().includes("/rest/v1/");
      if (database && route.request().method() === "POST") submissions++;
      const failure =
        (outcome === "database failure" && database) ||
        (outcome === "notification failure" && !database);
      return route.fulfill({
        status: failure ? 500 : 200,
        contentType: "application/json",
        body: JSON.stringify(
          failure
            ? { message: "Service unavailable", code: "TEST_ERROR" }
            : { id: "test-contact", success: true },
        ),
      });
    });
    await fillContact(page);
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(
      page.getByText(
        outcome === "database failure"
          ? "Failed to save message: Service unavailable"
          : "Message Sent",
        { exact: true },
      ),
    ).toBeVisible();
    expect(submissions).toBe(1);
    if (outcome === "database failure")
      await expect(page.getByLabel("Full Name")).toHaveValue("Test Visitor");
  });
}

async function fillTour(page) {
  await page.goto("/");
  await page
    .locator("main")
    .getByRole("button", { name: "Schedule a Tour", exact: true })
    .click();
  const dialog = page.getByRole("dialog", { name: "Schedule Your Tour" });
  await expect(
    dialog.getByRole("button", { name: "Next Step" }),
  ).toBeDisabled();
  await dialog.getByLabel("First Name").fill("Test");
  await dialog.getByLabel("Last Name").fill("Visitor");
  await dialog.getByLabel("Email").fill("visitor@example.com");
  await dialog.getByLabel("Phone").fill("9515550100");
  await dialog.getByRole("combobox").click();
  await page.getByRole("option", { name: "Other", exact: true }).click();
  await dialog.getByRole("button", { name: "Next Step" }).click();
  await dialog.getByRole("combobox").nth(0).click();
  await page
    .getByRole("option", { name: "Braverde House", exact: true })
    .click();
  await dialog.getByLabel(/Preferred Date/).click();
  await page
    .locator('[data-slot="calendar"] button[data-day]:not([disabled])')
    .first()
    .click();
  await dialog.getByRole("combobox").nth(1).click();
  await page.getByRole("option", { name: "9:00 AM", exact: true }).click();
  await dialog.getByRole("combobox").nth(2).click();
  await page.getByRole("option", { name: "Just me", exact: true }).click();
  await dialog.getByRole("button", { name: "Next Step" }).click();
  return dialog;
}

for (const outcome of ["success", "database failure", "notification failure"]) {
  test(`tour request handles ${outcome} without real submissions`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    let submissions = 0;
    await page.route("**/*.supabase.co/**", (route) => {
      const database = route.request().url().includes("/rest/v1/");
      if (database && route.request().method() === "POST") {
        submissions++;
        const data = route.request().postDataJSON()[0];
        expect(data.location).toBe("braverde");
        expect(data.tour_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(data.marketing_consent).toBe(false);
      }
      const failure =
        (outcome === "database failure" && database) ||
        (outcome === "notification failure" && !database);
      return route.fulfill({
        status: failure ? 500 : 200,
        contentType: "application/json",
        body: JSON.stringify(
          failure
            ? { message: "Service unavailable", code: "TEST_ERROR" }
            : { id: "test-tour", success: true },
        ),
      });
    });
    const dialog = await fillTour(page);
    await dialog.getByRole("button", { name: "Schedule My Tour" }).click();
    await expect(
      page.getByText(
        outcome === "database failure"
          ? "Failed to schedule tour: Service unavailable"
          : "Tour Request Received",
        { exact: true },
      ),
    ).toBeVisible();
    expect(submissions).toBe(1);
    if (outcome === "database failure") await expect(dialog).toBeVisible();
    else await expect(dialog).toHaveCount(0);
  });
}
