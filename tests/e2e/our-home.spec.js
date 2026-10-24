import { test, expect } from "@playwright/test";
const home='/contact-us/locations';
const availability='/contact-us?inquiry=room-availability#contact-form';
test.beforeEach(async({page})=>{await page.route('**/*.supabase.co/**',r=>r.fulfill({status:200,contentType:'application/json',body:'{}'}));});
for(const width of [320,375,768,1024,1280,1440]) {
 test(`Our Home fits at ${width}px with enlarged text and loaded images`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:900});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(home);
  await expect(page.locator('main h1')).toHaveText('Our Home');await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('main')).toContainText('Private-room residents have convenient access to shared accessible bathrooms.');
  await expect(page.locator('main')).toContainText('dedicated bathroom serving the room');
  await expect(page.locator('main')).not.toContainText('Gardening');await expect(page.locator('main')).not.toContainText('Photo Placement:');await expect(page.locator('main')).not.toContainText('Virtual Tour');
  for(const image of await page.locator('main img').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);}
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:testInfo.outputPath('our-home.png'),fullPage:true});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.evaluate(()=>document.documentElement.style.fontSize='150%');await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:testInfo.outputPath('enlarged.png'),fullPage:true});expect(errors).toEqual([]);
 });
}
test('Our Home navigation, all tour buttons, gallery, and directions work',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Our Home',exact:true}).click();await expect(page).toHaveURL(new RegExp(home+'$'));
 await expect(page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Our Home',exact:true})).toHaveAttribute('aria-current','page');
 for(const tour of await page.locator('main').getByRole('button',{name:'Schedule a Private Tour',exact:true}).all()) {await tour.focus();await page.keyboard.press('Enter');await expect(page.getByRole('dialog',{name:'Schedule Your Tour'})).toBeVisible();await page.keyboard.press('Escape');await expect(tour).toBeFocused();}
 const photo=page.getByRole('button',{name:'Enlarge Residential exterior illustration',exact:true});await photo.focus();await page.keyboard.press('Enter');await expect(page.getByRole('dialog',{name:'Residential exterior illustration'})).toBeVisible();await page.keyboard.press('Escape');await expect(photo).toBeFocused();
 const directions=page.locator('main').getByRole('link',{name:'Get Directions',exact:true});await expect(directions).toHaveAttribute('rel','noopener noreferrer');expect(new URL(await directions.getAttribute('href')).searchParams.get('destination')).toBe('32336 Parker Street, Menifee, CA 92584');
 await expect(page.locator('main a[href="tel:+19512460895"]')).toContainText('(951) 246 0895');
 await page.getByRole('link',{name:'View Full Gallery',exact:true}).click();await expect(page).toHaveURL(/\/photo-gallery$/);
});
test('activities and dining navigate to the relevant service cards',async({page})=>{
 for(const [name,id,title] of [['Explore Our Activities','daily-activities','Daily Activities'],['Learn About Dining','dining','Nutritious Meals & Snacks']]) {
  await page.goto(home);await page.getByRole('link',{name,exact:true}).click();await expect(page).toHaveURL(new RegExp('/services-and-amenities#'+id+'$'));await expect(page.locator('#'+id)).toContainText(title);
  await expect.poll(()=>page.locator('#'+id).evaluate(e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;})).toBe(true);
 }
});
test('availability buttons prefill only the supported inquiry and preserve edits',async({page})=>{
 await page.goto(home);const links=page.locator('main a[href="'+availability+'"]');await expect(links).toHaveCount(3);
 for(const link of await links.all())await expect(link).toHaveAttribute('href',availability);
 await links.first().click();const message=page.getByLabel('Message',{exact:true});await expect(message).toHaveValue(/current private or shared room availability/);
 await message.fill('Please tell me about a private room for my family.');
 await page.locator('header').getByRole('link',{name:'Contact Us',exact:true}).click();await page.goBack();await expect(message).toHaveValue('Please tell me about a private room for my family.');
 await page.goto('/contact-us?inquiry=unsupported');await expect(message).toHaveValue('');
});
for(const outcome of ['success','database failure','notification failure']) {
 test(`availability inquiry handles ${outcome} with mocked submissions`,async({page})=>{
  let writes=0;let submittedMessage;
  await page.route('**/*.supabase.co/**',route=>{const db=route.request().url().includes('/rest/v1/');if(db&&route.request().method()==='POST'){writes++;submittedMessage=route.request().postDataJSON();}
   const failed=(outcome==='database failure'&&db)||(outcome==='notification failure'&&!db);return route.fulfill({status:failed?500:200,contentType:'application/json',body:JSON.stringify(failed?{message:'Service unavailable',code:'TEST_ERROR'}:{id:'test-inquiry',success:true})});});
  await page.goto(availability);await expect(page.getByLabel('Message',{exact:true})).toHaveValue(/room availability/);expect(writes).toBe(0);
  await page.getByRole('button',{name:'Send Message',exact:true}).click();await expect(page.getByText('Name is required',{exact:true})).toBeVisible();expect(writes).toBe(0);
  await page.getByLabel('Full Name').fill('Test Visitor');await page.getByLabel('Email',{exact:true}).fill('visitor@example.com');await page.getByLabel('Phone Number',{exact:true}).fill('9515550100');await page.getByLabel('Message',{exact:true}).fill('Please tell me about current room availability.');await page.getByRole('button',{name:'Send Message',exact:true}).click();
  await expect(page.getByText(outcome==='database failure'?'Failed to save message: Service unavailable':'Message Sent',{exact:true})).toBeVisible();expect(writes).toBe(1);expect(JSON.stringify(submittedMessage)).toContain('Please tell me about current room availability.');
  if(outcome==='database failure')await expect(page.getByLabel('Message',{exact:true})).toHaveValue('Please tell me about current room availability.');
 });
}
test('room descriptions agree across related pages and About is retained',async({page})=>{
 for(const route of ['/floor-plans','/services-and-amenities','/assisted-living']){await page.goto(route);await expect(page.locator('main h1')).toBeVisible();await expect(page.locator('main')).not.toContainText('en-suite');await expect(page.locator('main')).not.toContainText('6 private bedrooms');}
 await page.goto('/about');await expect(page.locator('main h1')).toHaveText('About Silver Springs Residence');
});
