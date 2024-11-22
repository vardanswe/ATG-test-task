import { test, expect } from '@playwright/test';

test.describe('App Component', () => {
    test('should display the header and lazy-loaded components', async ({ page }) => {
        // Navigate to the app
        await page.goto('http://localhost:3000');

        // Check for the header
        const header = page.locator('header');
        await expect(header).toBeVisible();
        await expect(header).toHaveText('Horse Betting');

        // Wait for lazy-loaded components to render
        const betTypeSelector = page.locator('select#betType');
        const raceList = page.locator('.race-list');

        await expect(betTypeSelector).toBeVisible();
        await expect(raceList).toBeVisible();
        await betTypeSelector.selectOption('V75');
        const selectedOption = await betTypeSelector.inputValue();
        expect(selectedOption).toBe('V75');
    });
});
