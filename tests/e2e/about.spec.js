import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.route("**/*.supabase.co/**", route => route.fulfill({ status:200, contentType:"application/json", body:"{}" }));
});

const headings = ["How Silver Springs Residence Began", "Our Approach to Residential Care", "What Makes Silver Springs Residence Different", "Our Mission", "Our Core Values", "Licensing & Credentials", "Our Commitment to Families", "Discover Silver Springs Residence"];

for (const width of [320,375,768,1024,1440]) {
  test(`About content and imagery fit at ${width}px including enlarged text`, async ({page}, testInfo) => {
    await page.setViewportSize({width,height:900});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto('/about');
    await expect(page.locator('main h1')).toHaveText('About Silver Springs Residence');
    await page.evaluate(()=>document.fonts.ready);
    for(const title of headings) await expect(page.getByRole('heading',{name:title,exact:true})).toBeVisible();
    await expect(page.locator('.about-page ul')).toHaveCount(1);
    await expect(page.locator('.about-preparations li')).toHaveCount(10);
    await expect(page.locator('.about-page')).toContainText('is a California-licensed Residential Care Facility for the Elderly');
    await expect(page.locator('.about-page')).toContainText('Contact our team for licensing details.');
    for(const img of await page.locator('.about-page img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);
    }
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:testInfo.outputPath('about.png'),fullPage:true});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.evaluate(()=>document.documentElement.style.fontSize='150%');
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:testInfo.outputPath('about-enlarged.png'),fullPage:true});
    expect(errors).toEqual([]);
  });
}

test('About navigation order, current-page indicators, and closing links work',async({page})=>{
  await page.setViewportSize({width:1440,height:900});await page.goto('/');
  const nav=page.getByRole('navigation',{name:'Main navigation',exact:true});
  await expect(nav.locator(':scope > :first-child')).toHaveText('About');
  await expect(nav.locator(':scope > :nth-child(2)')).toContainText('Living Here');
  await nav.getByRole('link',{name:'About',exact:true}).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(nav.getByRole('link',{name:'About',exact:true})).toHaveAttribute('aria-current','page');
  await expect(page.getByRole('navigation',{name:'Footer navigation'}).getByRole('link',{name:'About',exact:true})).toHaveAttribute('aria-current','page');
  const visit=page.getByRole('button',{name:'Schedule a Private Tour',exact:true});
  await visit.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog',{name:'Schedule Your Tour'})).toBeVisible();
  await page.keyboard.press('Escape');await expect(visit).toBeFocused();
  await page.getByRole('link',{name:'Explore Our Home',exact:true}).click();
  await expect(page).toHaveURL(/contact-us\/locations$/);
});

test('mobile About navigation is first and closes on selection',async({page})=>{
  await page.setViewportSize({width:375,height:812});await page.goto('/');
  const menu=page.getByRole('button',{name:'Open navigation'});await menu.click();
  const nav=page.getByRole('navigation',{name:'Mobile navigation',exact:true});
  await expect(nav.getByRole('link').first()).toHaveText('About');
  await nav.getByRole('link',{name:'About',exact:true}).click();
  await expect(page).toHaveURL(/\/about$/);await expect(page.getByRole('dialog')).toHaveCount(0);
  await menu.click();await expect(nav.getByRole('link',{name:'About',exact:true})).toHaveAttribute('aria-current','page');
  await page.keyboard.press('Escape');await expect(menu).toBeFocused();
});
