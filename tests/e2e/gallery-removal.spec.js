import { test, expect } from '@playwright/test';
test.beforeEach(async ({page}) => { await page.route('**/*.supabase.co/**',r=>r.fulfill({status:200,contentType:'application/json',body:'{}'})); });
for (const width of [375,768,1440]) {
 test(`gallery page and navigation removed at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto('/');
  await expect(page.locator('a[href="/photo-gallery"]')).toHaveCount(0);
  const menu=page.getByRole('button',{name:'Open navigation'});
  if(await menu.isVisible()){await menu.click();await expect(page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Photo Gallery',exact:true})).toHaveCount(0);await page.keyboard.press('Escape');}
  await page.goto('/photo-gallery');await expect(page).toHaveURL(/\/contact-us\/locations#home-gallery$/);await expect(page.locator('main h1')).toHaveText('Our Home');
  await expect(page.getByRole('link',{name:'View Full Gallery',exact:true})).toHaveCount(0);
  const preview=page.getByRole('region',{name:'Take a Look Around Silver Springs Residence'});await expect(preview.locator('img')).toHaveCount(3);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 });
}
