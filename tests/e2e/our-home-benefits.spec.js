import { test, expect } from "@playwright/test";
const expected = {
  "why": [
    "Families looking for assisted living in Menifee often want something more personal than a large senior living community.",
    "At Silver Springs Residence, our six-resident home is designed around familiarity, personalized attention, comfort, and peace of mind."
  ],
  "features": [
    {
      "title": "Personalized Care in a Six-Resident Home",
      "blocks": [
        "With only six residents, caregivers have the opportunity to truly get to know each person — their routines, preferences, personality, abilities, and changing needs.",
        "Care is based on the individual, not a one-size-fits-all schedule."
      ]
    },
    {
      "title": "More Personal Attention",
      "blocks": [
        "Our staffing model is designed around a 1 caregiver to 3 residents ratio, allowing for more personal attention and greater familiarity with each resident’s daily needs."
      ]
    },
    {
      "title": "A Home That Feels Familiar",
      "blocks": [
        "Silver Springs is a residential home — not a large commercial facility.",
        "Residents enjoy familiar surroundings, comfortable shared spaces, furnished bedrooms, and a quieter household environment that can feel less overwhelming and more like home."
      ]
    },
    {
      "title": "Home-Cooked Meals",
      "blocks": [
        "Meals are prepared in the home and shared in a familiar dining environment.",
        "We focus on nutritious, enjoyable meals while accommodating resident preferences and physician-prescribed dietary needs whenever safely possible."
      ]
    },
    {
      "title": "Consistent Caregivers. Familiar Faces.",
      "blocks": [
        "In a smaller home, residents are cared for by a more familiar group of caregivers.",
        "That consistency helps caregivers notice changes in routines, appetite, mobility, mood, and other needs while helping residents feel more comfortable with the people assisting them."
      ]
    },
    {
      "title": "Support That Can Adapt as Needs Change",
      "blocks": [
        "Residents’ needs may change over time.",
        "Silver Springs can provide increasing levels of personal assistance when those needs remain appropriate for our license, staffing, and care capabilities.",
        "We also coordinate with families, physicians, hospice, home health, therapy providers, and other professionals when additional support is needed."
      ]
    },
    {
      "title": "Safety & Accessibility Built Into Everyday Living",
      "blocks": [
        "Our single-story home is designed to support residents with mobility and personal-care needs.",
        "Features include accessible living areas, wheelchair-friendly pathways, ADA-compliant bathroom features, supportive grab bars, non-slip bathing areas, resident call systems, and other safety-focused features."
      ]
    },
    {
      "title": "Private & Shared Room Options",
      "blocks": [
        "Residents can choose from furnished private or shared accommodations based on availability and preference.",
        "Each room is designed to feel comfortable and personal, and residents are welcome to bring appropriate photographs and familiar belongings to make the space their own."
      ]
    },
    {
      "title": "A Family-Like Community",
      "blocks": [
        "With only six residents, daily life naturally feels more personal.",
        "Residents can share meals, conversations, activities, outdoor time, and quiet moments together while still having space for privacy and individual routines.",
        "Family members are also encouraged to remain involved in their loved one’s life and care."
      ]
    }
  ]
};
test.beforeEach(async ({page}) => {
  await page.route("**/*.supabase.co/**", route => route.fulfill({status:200,contentType:"application/json",body:"{}"}));
});
for (const width of [320,375,768,1024,1440]) {
  test(`benefits checklist preserves content and fits at ${width}px`, async ({page},testInfo) => {
    await page.setViewportSize({width,height:900});
    await page.goto('/contact-us/locations');
    await page.evaluate(()=>document.fonts.ready);
    const section=page.locator('section[aria-labelledby="home-why"]');
    await expect(section.getByRole('heading',{level:2})).toHaveText('Why Families Choose Silver Springs Residence');
    await expect(section.locator('.our-home-why-intro > p')).toHaveText(expected.why);
    const list=section.locator('ul.our-home-benefits');
    const items=list.locator(':scope > li');await expect(items).toHaveCount(9);
    await expect(section.locator('.our-home-benefit-check')).toHaveCount(9);
    for(let i=0;i<expected.features.length;i++) {
      const item=items.nth(i);await expect(item.getByRole('heading',{level:3})).toHaveText(expected.features[i].title);
      await expect(item.locator('.our-home-benefit-copy > p')).toHaveText(expected.features[i].blocks);
      const check=item.locator('.our-home-benefit-check');await expect(check).toHaveAttribute('aria-hidden','true');
      await expect(check).toHaveCSS('width','52px');await expect(check).toHaveCSS('height','52px');await expect(check).toHaveCSS('border-radius','50%');await expect(check).toHaveCSS('background-color','rgb(216, 227, 218)');
      await expect(check.locator('svg')).toHaveCSS('width','22px');await expect(check.locator('svg')).toHaveCSS('height','22px');
    }
    const positions=await items.evaluateAll(nodes=>nodes.slice(0,2).map(e=>e.getBoundingClientRect().toJSON()));
    if(width>=768){expect(positions[0].top).toBeCloseTo(positions[1].top,0);expect(positions[1].left).toBeGreaterThan(positions[0].right);}
    else expect(positions[1].top).toBeGreaterThanOrEqual(positions[0].bottom);
    const alignment=await section.evaluate(e=>({section:e.getBoundingClientRect().left,heading:e.querySelector('h2').getBoundingClientRect().left,list:e.querySelector('ul').getBoundingClientRect().left}));
    expect(alignment.heading).toBeCloseTo(alignment.list,0);expect(alignment.heading).toBeCloseTo(alignment.section,0);
    await section.screenshot({path:testInfo.outputPath('benefits.png')});
    await page.evaluate(()=>document.documentElement.style.fontSize='150%');
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await expect(section.locator('.our-home-benefit-check').first()).toHaveCSS('width','52px');
    await section.screenshot({path:testInfo.outputPath('benefits-enlarged.png')});
  });
}
test('homepage checkmarks and safety grid keep their existing presentation',async({page})=>{
  await page.goto('/');await expect(page.locator('.benefit-check').first()).toHaveCSS('width','24px');await expect(page.locator('.benefit-check').first()).toHaveCSS('height','24px');
  await page.goto('/contact-us/locations');const safety=page.locator('section[aria-labelledby="home-safety"]');
  await expect(safety.locator('.our-home-feature')).toHaveCount(5);await expect(safety.locator('.our-home-benefit-check')).toHaveCount(0);
});
