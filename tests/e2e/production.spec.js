import { test, expect } from "@playwright/test";

test("production homepage and direct route loads serve the redesign", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.route("**/*.supabase.co/**", route => route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Where\s*Care\s*Feels\s*Like\s*Home/);
  await expect(page.locator(".hero-poster img")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: testInfo.outputPath("homepage-preview.png") });
  await expect(page.getByRole("button", { name: "Open Tanstack query devtools" })).toHaveCount(0);
  for (const [route,title] of [["/care","Personalized Care That Starts With Knowing the Person"],["/dining","Dining That Feels Familiar"],["/activities","Meaningful Days at a Comfortable Pace"]]) {
    await page.goto(route);
    await expect(page.locator("main h1")).toHaveText(title);
  }
  const menu = await page.request.get('/media/sample-menu.pdf');
  expect(menu.ok()).toBe(true);
  expect((await menu.body()).subarray(0,4).toString()).toBe('%PDF');
  await page.goto("/photo-gallery");
  await expect(page).toHaveURL(/contact-us\/locations#home-gallery$/);
  await expect(page.locator("main h1")).toHaveText("Our Home");
  await page.goto("/contact-us");
  await expect(page.locator(".contact-map")).toHaveAttribute("src", /32336%20Parker/);
  await expect(page.getByRole("button", { name: "Send Message", exact: true })).toHaveCSS("background-color", "rgb(131, 117, 84)");
  await page.goto("/contact-us/locations");
  await expect(page.locator("main h1")).toHaveText("Our Home");
  await expect(page.locator("main")).not.toContainText("Willow");
  await page.goto("/about");
  await expect(page.locator("main h1")).toHaveText("About Silver Springs Residence");
  await expect(page.locator(".about-preparations li")).toHaveCount(10);
  for (const [route,title] of [["/resources/faq","Frequently Asked Questions About Residential Care in Menifee"],["/resources/family-guides","Family Guides"],["/resources/family-guides/what-is-an-rcfe","What Is an RCFE? A Simple Guide for California Families"],["/why-us","Care That Feels Personal"],["/what-to-expect","What to Expect"]]) {
    await page.goto(route);
    await expect(page.locator("main h1")).toHaveText(title);
  }
  expect(errors).toEqual([]);
});
