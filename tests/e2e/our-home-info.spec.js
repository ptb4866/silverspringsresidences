import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/*.supabase.co/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`home facts content, adjacency and responsive layout at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('/contact-us/locations');
    const strip = page.getByRole('region', { name: 'Our home at a glance' });
    await expect(strip).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const items = strip.getByRole('listitem');
    await expect(items).toHaveCount(4);
    const facts = [
      ['6 residents \u00b7 1:3 care ratio', 'Personalized support around the clock', 'users-round'],
      ['From $4,700/month', 'Based on level of care', 'tag'],
      ['32336 Parker Street', 'Menifee, CA 92584', 'house'],
      ['Licensed RCFE', 'California-licensed residential care', 'shield-check'],
    ];
    for (let i = 0; i < facts.length; i++) {
      await expect(items.nth(i).getByRole('heading')).toHaveText(facts[i][0]);
      await expect(items.nth(i).locator('p')).toHaveText(facts[i][1]);
      const icon = items.nth(i).locator('.our-home-info-icon');
      await expect(icon).toHaveAttribute('aria-hidden', 'true');
      await expect(icon.locator('svg')).toHaveCount(1);
      await expect(icon.locator('svg')).toHaveClass(new RegExp(`lucide-${facts[i][2]}`));
      await expect(icon.locator('svg')).toHaveAttribute('width', '20');
      await expect(icon).toHaveCSS('border-radius', '50%');
      expect(await icon.evaluate(e => [e.offsetWidth, e.offsetHeight])).toEqual([40, 40]);
    }
    expect(await strip.evaluate(e => ({
      gap: e.getBoundingClientRect().top - e.previousElementSibling.getBoundingClientRect().bottom,
      previousHasHero: !!e.previousElementSibling.querySelector('h1'),
      nextIsBenefits: e.nextElementSibling.classList.contains('our-home-why'),
    }))).toEqual({ gap: 0, previousHasHero: true, nextIsBenefits: true });
    const columns = width >= 1024 ? 4 : width >= 640 ? 2 : 1;
    expect(await strip.locator('ul').evaluate(e => getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(columns);
    await expect(strip).not.toContainText(/awake|all-inclusive|hidden fees|inspection/i);
    await expect(strip).toHaveCSS('border-top-width', '0px');
    // Measured before this refinement at the same widths and bundled fonts.
    const previousHeights = {320:585,375:507,768:281.5,1024:251,1440:183};
    expect(await strip.evaluate(e => e.getBoundingClientRect().height)).toBeLessThan(previousHeights[width]);
    await strip.scrollIntoViewIfNeeded();
    await strip.screenshot({ path: testInfo.outputPath('facts.png'), style: '.site-header, .skip-link { visibility: hidden !important; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => document.documentElement.style.fontSize = '150%');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const item of await items.all()) expect(await item.evaluate(e => e.scrollWidth <= e.clientWidth)).toBe(true);
    await strip.screenshot({ path: testInfo.outputPath('facts-enlarged.png'), style: '.site-header, .skip-link { visibility: hidden !important; }' });
    expect(errors).toEqual([]);
  });
}

test('About licensing is current and retains service scope and ten commitments', async ({ page }) => {
  await page.goto('/about');
  const section = page.getByRole('region', { name: 'Licensing & Credentials' });
  await expect(section).toContainText('is a California-licensed Residential Care Facility for the Elderly in Menifee.');
  await expect(section).toContainText('Contact our team for licensing details.');
  await expect(section).toContainText('within an approved scope of services');
  await expect(section).toContainText('We will never promise services that we are not prepared, staffed, or authorized to provide.');
  await expect(section.getByRole('listitem')).toHaveCount(10);
  await expect(section).not.toContainText(/once issued|completing the California licensing|Our preparations|inspection completed/i);
});
