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
  await page.goto("/assisted-living");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Assisted Living");
  await page.goto("/photo-gallery");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Photo Gallery");
  await page.goto("/contact-us");
  await expect(page.locator(".contact-map")).toHaveAttribute("src", /32336%20Parker/);
  await expect(page.getByRole("button", { name: "Send Message", exact: true })).toHaveCSS("background-color", "rgb(131, 117, 84)");
  await page.goto("/contact-us/locations");
  await expect(page.locator("main h1")).toHaveText("Braverde House");
  await expect(page.locator("main")).not.toContainText("Willow");
  expect(errors).toEqual([]);
});
