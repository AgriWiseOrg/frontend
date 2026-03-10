import { test, expect } from '@playwright/test';

test.describe('Weather Dashboard Flow', () => {
  test('Successfully loads and displays weather data', async ({ page }) => {
    await page.context().setGeolocation({ longitude: 77.2090, latitude: 28.6139 });
    await page.context().grantPermissions(['geolocation']);
    await page.addInitScript(() => {
      localStorage.setItem('agriwise_user', JSON.stringify({
        id: 'test_user_id',
        role: 'farmer',
        name: 'Test Farmer'
      }));
    });
    // Intercept the weather API call so we don't spam OpenWeatherMap and get a deterministic response
    await page.route('**/api/support/weather*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            temp: 28,
            humidity: 65,
            wind: 12,
            advisory: "Conditions are excellent for harvesting today.",
            code: 0,
            icon: "☀️",
            rainProb: [0, 5, 10, 0, 0, 0, 0, 0],
            forecast: [
              { date: '2025-05-15T00:00:00.000Z', min: 20, max: 30, code: 0 },
              { date: '2025-05-16T00:00:00.000Z', min: 19, max: 29, code: 1 },
              { date: '2025-05-17T00:00:00.000Z', min: 22, max: 32, code: 0 },
              { date: '2025-05-18T00:00:00.000Z', min: 18, max: 28, code: 3 },
              { date: '2025-05-19T00:00:00.000Z', min: 17, max: 26, code: 48 }
            ]
          }
        })
      });
    });

    // Go to weather page
    await page.goto('/weather');

    // Wait for the loader to disappear
    await expect(page.getByText('Syncing Satellite Intelligence...')).toBeHidden({ timeout: 10000 });

    // Validate data rendering
    await expect(page.getByText('28°').first()).toBeVisible();
    await expect(page.getByText('65%').first()).toBeVisible();
    await expect(page.getByText('12 km/h').first()).toBeVisible();
  });

  test('Displays error state when API fails', async ({ page }) => {
    await page.context().setGeolocation({ longitude: 77.2090, latitude: 28.6139 });
    await page.context().grantPermissions(['geolocation']);
    await page.addInitScript(() => {
      localStorage.setItem('agriwise_user', JSON.stringify({
        id: 'test_user_id',
        role: 'farmer',
        name: 'Test Farmer'
      }));
    });
    // Intercept with a 500 error sequence
    await page.route('**/api/support/weather*', async (route) => {
      await route.fulfill({ status: 500 });
    });

    await page.goto('/weather');
    
    // Validate error state
    await expect(page.getByText('Connection Failed')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("We couldn't reach the weather satellites. Please check your internet.")).toBeVisible();
  });
});
