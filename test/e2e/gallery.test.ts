import { test, expect } from '@playwright/test';

test.describe('gallery page', () => {
  test('renders at least one image', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForSelector('img');
    const images = await page.locator('img').count();
    expect(images).toBeGreaterThan(0);
  });

  test('displays multiple user sections with galleries', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForSelector('img');
    await page.waitForTimeout(2000);

    const sections = await page.getByTestId('galery-user-section');
    const sectionCount = await sections.count();

    expect(sectionCount).toBeGreaterThan(1);

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);
      const galleryContainer = await section.locator('.gallery');
      await expect(galleryContainer).toBeVisible();
    }
  });

  test('displays user names correctly', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForSelector('img');
    await page.waitForTimeout(2000);

    const pageContent = await page.content();
    const hasUserNames =
      pageContent.includes('Leanne Graham') ||
      pageContent.includes('Ervin Howell');
    expect(hasUserNames).toBe(true);
  });

  test('displays statistics for each user', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForSelector('img');
    await page.waitForTimeout(2000);

    const sections = page.getByTestId('galery-user-section');
    const sectionCount = await sections.count();

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);
      await expect(section.getByText(/Albums:\s*\d+/)).toBeVisible();
      await expect(section.getByText(/Posts:\s*\d+/)).toBeVisible();
      await expect(section.getByText(/Comments:\s*\d+/)).toBeVisible();
    }
  });

  test.describe('when api request to get data fails', () => {
    test.skip('proper error message', async ({ page }) => {
      // Not implemented
    });
  });
});
