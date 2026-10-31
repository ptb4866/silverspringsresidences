import { test, expect } from '@playwright/test';

const family='/resources/family-guides';
const guideSlugs=['board-and-care-vs-assisted-living','board-and-care-cost-menifee','choose-board-and-care-california','what-is-an-rcfe','verify-rcfe-license-california','residential-care-move-in-checklist'];
const coreRoutes=['/resources/faq',family,'/why-us','/what-to-expect'];
const questions=['What is an RCFE?','What is a six-bed RCFE or board-and-care home?','What is the difference between board and care and assisted living?','How is an RCFE different from a nursing home?','What types of care does Silver Springs Residence provide?','Do you create personalized care plans?','Can Silver Springs Residence care for someone with dementia or memory loss?','Can someone with limited mobility or a wheelchair live at Silver Springs Residence?','Can you assist with medications?','Can a resident receive hospice care while living at Silver Springs Residence?','Do you offer private and shared rooms?','Are the rooms furnished?','What meals and snacks are provided?','What activities are available?','Can families visit?','How much does board and care cost at Silver Springs Residence?','What is included in the monthly rate?','How does the admission process work?','How can I verify that an RCFE is licensed in California?','What should I look for when choosing a board-and-care home?'];
test.beforeEach(async({page})=>{await page.route('**/*.supabase.co/**',r=>r.fulfill({status:200,contentType:'application/json',body:'{}'}));});

for(const width of [320,375,768,1024,1280,1440]){
 for(const [label,routes] of [['resource-pages',coreRoutes],['family-guides',guideSlugs.map(s=>family+'/'+s)]]){
  test(`${label} fit at ${width}px including enlarged text`,async({page},testInfo)=>{
   test.setTimeout(120000);await page.setViewportSize({width,height:900});const errors=[];page.on('pageerror',e=>errors.push(e.message));
   for(const route of routes){
    await page.goto(route);await expect(page.locator('main h1')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator('main h1')).toHaveCSS('font-weight','400');
    for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);}
    if(route==='/resources/faq')await page.locator('.resource-faq-trigger').evaluateAll(buttons=>buttons.filter(b=>b.getAttribute('aria-expanded')==='false').forEach(b=>b.click()));
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    const name=route.split('/').pop();await page.screenshot({path:testInfo.outputPath(name+'.png'),fullPage:true});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.evaluate(()=>document.documentElement.style.fontSize='150%');await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:testInfo.outputPath(name+'-enlarged.png'),fullPage:true});
    await page.evaluate(()=>document.documentElement.style.fontSize='');
   }
   expect(errors).toEqual([]);
  });
 }
}

test('Resources dropdown and direct footer groups navigate with current indicators',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 const nav=page.getByRole('navigation',{name:'Main navigation',exact:true});const button=nav.getByRole('button',{name:'Resources',exact:true});
 await expect(nav.getByRole('link',{name:'Resources',exact:true})).toHaveCount(0);await button.focus();await page.keyboard.press('Enter');await expect(page.getByRole('menuitem')).toHaveText(['FAQ','Family Guides','Blogs']);await page.keyboard.press('Escape');await expect(button).toBeFocused();
 await button.click();await page.getByRole('menuitem',{name:'FAQ',exact:true}).click();await expect(page).toHaveURL(/\/resources\/faq$/);await expect(button).toHaveAttribute('data-current','true');
 await button.click();await expect(page.getByRole('menuitem',{name:'FAQ',exact:true})).toHaveAttribute('aria-current','page');await page.keyboard.press('Escape');
 const footer=page.getByRole('navigation',{name:'Footer navigation'});await expect(footer.getByRole('group',{name:'Discover',exact:true}).getByRole('link')).toHaveText(['Blog','Why Us','What to Expect','About','Our Home']);
 for(const [label,route] of [['Blog','/blog'],['Why Us','/why-us'],['What to Expect','/what-to-expect'],['About','/about'],['Our Home','/contact-us/locations']]){await footer.getByRole('link',{name:label,exact:true}).click();await expect(page).toHaveURL(new RegExp(route+'$'));await expect(footer.getByRole('link',{name:label,exact:true})).toHaveAttribute('aria-current','page');}
 for(const label of ['Care','Dining','Activities','FAQ','Family Guides'])await expect(footer.getByRole('group',{name:'Services & Resources'}).getByRole('link',{name:label,exact:true})).toHaveCount(1);
});

test('mobile Resources grouping and selection preserve Escape and focus',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto('/');const menu=page.getByRole('button',{name:'Open navigation'});await menu.click();const group=page.getByRole('group',{name:'Resources',exact:true});await expect(group.getByRole('link')).toHaveText(['FAQ','Family Guides','Blogs']);await group.getByRole('link',{name:'Family Guides',exact:true}).click();await expect(page).toHaveURL(new RegExp(family+'$'));await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect(page.locator('main h1')).toHaveText('Family Guides');await menu.click();await expect(group.getByRole('link',{name:'Family Guides'})).toHaveAttribute('aria-current','page');await page.keyboard.press('Escape');await expect(menu).toBeFocused();
 await page.goto(family+'/what-is-an-rcfe');await expect(page.locator('main h1')).toHaveText('What Is an RCFE? A Simple Guide for California Families');await menu.click();await expect(group.getByRole('link',{name:'Family Guides'})).toHaveAttribute('aria-current','location');await page.keyboard.press('Escape');
});

test('Blogs remains a Resources destination with existing articles and active states',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 const resources=page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('button',{name:'Resources',exact:true});
 await resources.click();const blogs=page.getByRole('menuitem',{name:'Blogs',exact:true});await expect(blogs).toHaveAttribute('href','/blog');await blogs.click();await expect(page).toHaveURL(/\/blog$/);await expect(resources).toHaveAttribute('data-current','true');
 await resources.click();await expect(page.getByRole('menuitem',{name:'Blogs',exact:true})).toHaveAttribute('aria-current','page');await page.keyboard.press('Escape');
 await page.goto('/blog/understanding-senior-care-levels');await expect(page.locator('main h1')).toHaveText('Understanding the Different Levels of Senior Care');await resources.click();await expect(page.getByRole('menuitem',{name:'Blogs',exact:true})).toHaveAttribute('aria-current','location');await page.keyboard.press('Escape');
 await page.setViewportSize({width:375,height:812});const menu=page.getByRole('button',{name:'Open navigation'});await menu.click();const group=page.getByRole('group',{name:'Resources',exact:true});await expect(group.getByRole('link',{name:'Blogs',exact:true})).toHaveAttribute('aria-current','location');await group.getByRole('link',{name:'Blogs',exact:true}).click();await expect(page).toHaveURL(/\/blog$/);await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect(page.locator('main h1')).toHaveText('Our Blog');await menu.click();await expect(group.getByRole('link',{name:'Blogs',exact:true})).toHaveAttribute('aria-current','page');await page.keyboard.press('Escape');await expect(menu).toBeFocused();
});

test('all twenty source FAQs, five categories and multiple-open keyboard behavior',async({page})=>{
 await page.goto('/resources/faq');await expect(page.locator('.resource-faq-trigger')).toHaveText(questions);await expect(page.locator('.resource-faq-category')).toHaveCount(5);await expect(page.getByRole('navigation',{name:'FAQ categories'}).getByRole('link')).toHaveCount(5);
 const first=page.getByRole('button',{name:questions[0],exact:true}),second=page.getByRole('button',{name:questions[1],exact:true});await expect(first).toHaveAttribute('aria-expanded','true');await second.focus();await page.keyboard.press('Enter');await expect(first).toHaveAttribute('aria-expanded','true');await expect(second).toHaveAttribute('aria-expanded','true');await page.keyboard.press('ArrowUp');await expect(first).toBeFocused();
 for(const trigger of await page.locator('.resource-faq-trigger').all())if(await trigger.getAttribute('aria-expanded')==='false')await trigger.click();
 await expect(page.locator('#faq-7')).toContainText('when their individual needs can be safely met');await expect(page.locator('#faq-10')).toContainText('applicable regulatory requirements');await expect(page.locator('#faq-18 ol li')).toHaveCount(8);await expect(page.locator('#faq-14')).toContainText('Gardening');
 await expect(page.locator('#faq-19 a')).toHaveAttribute('href',/www\.cdss\.ca\.gov/);
 await expect(page.locator('main')).not.toContainText(/INSERT TOPIC|SEO page title:|Your task is|SEARCH INTENT|Recommended 6 Family Guides/);
});

test('FAQ menu, pricing and admissions links work without submitting anything',async({page})=>{
 let writes=0;await page.route('**/*.supabase.co/**',r=>{if(r.request().method()==='POST')writes++;return r.fulfill({status:200,body:'{}'});});
 await page.goto('/resources/faq');await page.getByRole('button',{name:questions[12],exact:true}).click();const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download Our Sample Menu',exact:true}).click()]);expect(await download.failure()).toBeNull();
 await page.getByRole('button',{name:questions[15],exact:true}).click();await page.getByRole('link',{name:'Request Current Pricing',exact:true}).click();await expect(page).toHaveURL(/contact-us#contact-form$/);await expect(page.getByLabel('Message',{exact:true})).toHaveValue('');expect(writes).toBe(0);
 await page.goto('/resources/faq');await page.getByRole('button',{name:questions[17],exact:true}).click();await page.locator('#faq-18').getByRole('link',{name:'Learn What to Expect'}).click();await expect(page).toHaveURL(/\/what-to-expect$/);
});

test('six complete guides provide sources, related links and metadata restoration',async({page})=>{
 test.setTimeout(90000);await page.goto('/blog');const originalTitle=await page.title();const originalDescription=await page.locator('meta[name="description"]').getAttribute('content');
 await page.goto(family);await expect(page.locator('.resource-guide-card')).toHaveCount(6);const cards=await page.locator('.resource-guide-card h3 a').all();expect(await Promise.all(cards.map(a=>a.getAttribute('href')))).toEqual(guideSlugs.map(s=>family+'/'+s));
 for(const slug of guideSlugs){await page.goto(family+'/'+slug);await expect(page.locator('article')).toBeVisible();expect(await page.locator('.resource-guide-section').count()).toBeGreaterThanOrEqual(7);await expect(page.locator('.resource-related-question')).toHaveCount(3);expect(await page.locator('.resource-sources li a').count()).toBeGreaterThanOrEqual(2);await expect(page.locator('.resource-reviewed time')).toHaveAttribute('datetime','2026-10-30');await expect(page).toHaveTitle(/Silver Springs Residence/);await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  for(const a of await page.locator('.resource-sources a').all()){const url=new URL(await a.getAttribute('href'));expect(['www.cdss.ca.gov','aging.ca.gov','www.medicare.gov','www.dhcs.ca.gov','rcaging.org']).toContain(url.hostname);}
  await expect(page.locator('main')).not.toContainText(/Dr\. Sarah|INSERT TOPIC|PRIMARY SEARCH QUERY|highest-rated|guaranteed admission/);
 }
 await page.getByRole('navigation',{name:'Footer navigation'}).getByRole('link',{name:'Blog',exact:true}).click();await expect(page).toHaveTitle(originalTitle);await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',originalDescription);
 await page.goto(family+'/board-and-care-cost-menifee');await expect(page.locator('main')).toContainText('from $4,700/month, based on level of care');
});

test('resource redirects and printable move-in checklist work',async({page})=>{
 await page.goto('/resources');await expect(page).toHaveURL(new RegExp(family+'$'));await page.goto(family+'/unknown-guide');await expect(page).toHaveURL(new RegExp(family+'$'));
 await page.goto(family+'/residential-care-move-in-checklist');await page.evaluate(()=>{window.print=()=>{window.__printed=true;};});await page.getByRole('button',{name:'Print This Checklist'}).click();expect(await page.evaluate(()=>window.__printed)).toBe(true);
 await page.emulateMedia({media:'print'});await expect(page.locator('.site-header')).toBeHidden();await expect(page.locator('.site-footer')).toBeHidden();await expect(page.locator('article')).toBeVisible();await expect(page.getByRole('button',{name:'Print This Checklist'})).toBeHidden();
});

test('tour actions restore focus and availability messages stay editable',async({page})=>{
 test.setTimeout(90000);
 for(const route of ['/resources/faq',family,'/why-us','/what-to-expect',family+'/choose-board-and-care-california']){
  await page.goto(route);const button=page.locator('main').getByRole('button',{name:'Schedule a Private Tour',exact:true});await button.focus();await page.keyboard.press('Enter');await expect(page.getByRole('dialog',{name:'Schedule Your Tour'})).toBeVisible();await page.keyboard.press('Escape');await expect(button).toBeFocused();
 }
 await expect(page.locator('main')).toContainText('Schedule a Private Tour');await page.goto('/what-to-expect');await expect(page.locator('.resource-steps > li')).toHaveCount(8);
 await page.getByRole('link',{name:'Ask About Current Room Availability',exact:true}).click();await expect(page.getByLabel('Message',{exact:true})).toHaveValue(/current private or shared room availability/);await page.getByLabel('Message',{exact:true}).fill('Please discuss options with our family.');await expect(page.getByLabel('Message',{exact:true})).toHaveValue('Please discuss options with our family.');
});
