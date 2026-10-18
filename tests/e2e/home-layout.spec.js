import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.route("**/*.supabase.co/**", route => route.fulfill({status:200,contentType:"application/json",body:"{}"}));
});
test("shared residence branding and favicon assets load", async ({page, request}) => {
  await page.goto("/");
  await expect(page.getByRole("link", {name:"Silver Springs Residence — home",exact:true})).toHaveCount(2);
  await expect(page.locator(".wordmark-subtitle")).toHaveText(["Residence","Residence"]);
  for(const path of ["/favicon.svg","/favicon-32.png","/apple-touch-icon.png","/favicon.ico"]) {
    const response=await request.get(path);expect(response.ok()).toBe(true);
    expect((await response.body()).length).toBeGreaterThan(100);
  }
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute("href","/favicon.svg");
});
for(const width of [320,375,768,1024,1440]) {
  test(`residence collage and heading fit at ${width}px`, async ({page},testInfo)=>{
    await page.setViewportSize({width,height:900});await page.goto("/");
    await page.evaluate(()=>document.fonts.ready);
    const feature=page.locator(".residence-card");await feature.scrollIntoViewIfNeeded();
    await expect(feature.locator("img")).toHaveCount(2);
    for(const image of await feature.locator("img").all()) await expect.poll(()=>image.evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);
    await expect(feature.locator("ul > li")).toHaveCount(6);
    const boxes=await feature.evaluate(e=>({images:e.querySelector('.residence-collage').getBoundingClientRect().toJSON(),text:e.querySelector('.residence-content').getBoundingClientRect().toJSON()}));
    if(width>=768)expect(boxes.images.right).toBeLessThanOrEqual(boxes.text.left);
    else expect(boxes.images.bottom).toBeLessThanOrEqual(boxes.text.top);
    if(width>=768) {
      const lines=await page.locator('.care-heading-first').evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);return r.getClientRects().length});
      expect(lines).toBe(1);
    }
    await feature.screenshot({path:testInfo.outputPath('residence.png')});
    await page.evaluate(()=>document.documentElement.style.fontSize='150%');
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(width===1024) await expect(page.getByRole('button',{name:'Open navigation'})).toBeVisible();
    await page.screenshot({path:testInfo.outputPath('enlarged.png'),fullPage:true});
  });
}
test("residence tour action opens from keyboard and restores focus",async({page})=>{
  await page.goto('/');
  const action=page.locator('.residence-content').getByRole('button',{name:'Schedule A Tour'});
  await action.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog',{name:'Schedule Your Tour'})).toBeVisible();
  await page.keyboard.press('Escape');await expect(action).toBeFocused();
});
