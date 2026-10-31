import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

test.beforeEach(async ({page}) => {
  await page.route('**/*.supabase.co/**', route => route.fulfill({status:200,contentType:'application/json',body:'{}'}));
});
const pages = [['/care','Personalized Care That Starts With Knowing the Person'],['/dining','Dining That Feels Familiar'],['/activities','Meaningful Days at a Comfortable Pace']];
for (const width of [320,375,768,1024,1280,1440]) {
  test(`services pages and enlarged text fit at ${width}px`, async ({page},testInfo) => {
    await page.setViewportSize({width,height:900});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const [route,title] of pages){
      await page.goto(route);await expect(page.locator('main h1')).toHaveText(title);await page.evaluate(()=>document.fonts.ready);
      await expect(page.locator('main')).not.toContainText(/Layout recommendation|Best visual layout|This will convert|once you are operating/);
      for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);}
      const headingStyle=await page.locator('main h1').evaluate(e=>({font:getComputedStyle(e).fontFamily,weight:getComputedStyle(e).fontWeight}));expect(headingStyle.font).toContain('Libre Baskerville');expect(headingStyle.weight).toBe('400');
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:testInfo.outputPath(route.slice(1)+'.png'),fullPage:true});
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await page.evaluate(()=>document.documentElement.style.fontSize='150%');
      await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await page.screenshot({path:testInfo.outputPath(route.slice(1)+'-enlarged.png'),fullPage:true});
      const visibleNav=page.getByRole('navigation',{name:'Main navigation',exact:true});
      if(await visibleNav.isVisible()){
        expect(await visibleNav.evaluate(e=>e.getBoundingClientRect().right<=innerWidth)).toBe(true);
      }else await expect(page.getByRole('button',{name:'Open navigation',exact:true})).toBeVisible();
      await page.evaluate(()=>document.documentElement.style.fontSize='');
    }
    expect(errors).toEqual([]);
  });
}

test('desktop Services menu and footer destinations',async({page})=>{
  await page.setViewportSize({width:1440,height:900});await page.goto('/');
  const nav=page.getByRole('navigation',{name:'Main navigation',exact:true});
  await expect(nav.locator(':scope > a, :scope > button')).toHaveText(['About','Services','Our Home','Resources','Contact Us','Schedule a Tour']);
  const services=nav.getByRole('button',{name:'Services',exact:true});await services.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('menuitem')).toHaveText(['Care','Dining','Activities']);
  await page.keyboard.press('Escape');await expect(services).toBeFocused();
  for(const [label,route] of [['Care','/care'],['Dining','/dining'],['Activities','/activities']]){
    await services.click();await page.getByRole('menuitem',{name:label,exact:true}).click();await expect(page).toHaveURL(new RegExp(route+'$'));await expect(services).toHaveAttribute('data-current','true');
    await services.click();await expect(page.getByRole('menuitem',{name:label,exact:true})).toHaveAttribute('aria-current','page');await page.keyboard.press('Escape');
  }
  await expect(nav.getByRole('link',{name:'Photo Gallery',exact:true})).toHaveCount(0);
  const footer=page.getByRole('navigation',{name:'Footer navigation'});
  for(const [route] of pages)await expect(footer.locator(`a[href="${route}"]`)).toHaveCount(1);
  await expect(page.locator('a[href="/floor-plans"],a[href="/services-and-amenities"],a[href="/assisted-living"]')).toHaveCount(0);
});

test('mobile Services grouping, selection, Escape and enlarged navigation fallback',async({page})=>{
  await page.setViewportSize({width:375,height:812});await page.goto('/');
  const menu=page.getByRole('button',{name:'Open navigation'});await menu.click();
  const nav=page.getByRole('navigation',{name:'Mobile navigation',exact:true});
  const group=nav.getByRole('group',{name:'Services'});await expect(group.getByRole('link')).toHaveText(['Care','Dining','Activities']);
  await group.getByRole('link',{name:'Dining',exact:true}).click();await expect(page).toHaveURL(/\/dining$/);await expect(page.getByRole('dialog')).toHaveCount(0);
  await menu.click();await expect(group.getByRole('link',{name:'Dining'})).toHaveAttribute('aria-current','page');await page.keyboard.press('Escape');await expect(menu).toBeFocused();
  await page.setViewportSize({width:1440,height:900});await page.evaluate(()=>document.documentElement.style.fontSize='150%');
  await expect(menu).toBeVisible();await menu.click();await nav.getByRole('link',{name:'Contact Us',exact:true}).click();await expect(page).toHaveURL(/\/contact-us$/);
});

test('care qualifications, gardening, actions and tour focus remain accurate',async({page})=>{
  for(const [route] of pages){
    await page.goto(route);
    const tour=page.locator('main').getByRole('button',{name:'Schedule a Private Tour',exact:true});await tour.focus();await page.keyboard.press('Enter');await expect(page.getByRole('dialog',{name:'Schedule Your Tour'})).toBeVisible();await page.keyboard.press('Escape');await expect(tour).toBeFocused();
  }
  await expect(page.locator('main')).toContainText('Gardening');await expect(page.locator('main')).toContainText('Participation is encouraged, but never forced.');
  await page.locator('main').getByRole('link',{name:'Explore Our Home',exact:true}).click();await expect(page).toHaveURL(/contact-us\/locations$/);
  await page.goto('/care');await expect(page.locator('main')).toContainText('when appropriate and permitted');await expect(page.locator('main')).toContainText('Memory-related needs are reviewed individually before admission.');await expect(page.locator('main')).toContainText('If a resident’s needs exceed what we can safely or legally provide, we will communicate that clearly.');
  await page.getByRole('link',{name:'Discuss Care Needs',exact:true}).click();await expect(page).toHaveURL(/contact-us#contact-form$/);await expect(page.getByLabel('Message',{exact:true})).toHaveValue('');
});

test('legacy URLs redirect to the correct replacement, including hash links',async({page})=>{
  for(const [old,destination] of [['/assisted-living','/care'],['/services-and-amenities','/care'],['/services-and-amenities#dining','/dining'],['/services-and-amenities#daily-activities','/activities'],['/floor-plans','/contact-us/locations#home-rooms']]){
    await page.goto(old);await expect(page).toHaveURL(new RegExp(destination+'$'));await expect(page.locator('main h1')).toBeVisible();
    if(old==='/floor-plans')await expect.poll(()=>page.locator('#home-rooms').evaluate(e=>e.getBoundingClientRect().top<innerHeight&&e.getBoundingClientRect().bottom>0)).toBe(true);
  }
});

test('sample menu downloads a real PDF and clearly identifies its example status',async({page})=>{
  await page.goto('/dining');await expect(page.locator('.service-menu-note')).toHaveText('Illustrative sample menu—not a current meal schedule. Meals may vary based on resident preferences, assessed needs, dietary instructions, and availability.');
  const link=page.getByRole('link',{name:'Download Sample Menu',exact:true});await expect(link).toHaveAttribute('href','/media/sample-menu.pdf');
  const [download]=await Promise.all([page.waitForEvent('download'),link.click()]);expect(download.suggestedFilename()).toBe('Silver-Springs-Sample-Menu.pdf');expect(await download.failure()).toBe(null);
  const bytes=await fs.readFile(await download.path());expect(bytes.subarray(0,4).toString()).toBe('%PDF');expect(bytes.length).toBeGreaterThan(10000);
});
