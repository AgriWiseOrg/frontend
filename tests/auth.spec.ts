import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('User can switch between Login and Register modes', async ({ page }) => {
    await page.goto('/login');
    await page.screenshot({ path: 'login-screenshot.png' });

    // Should default to Login mode
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // Switch to Register mode
    await page.getByText("Don't have an account? Register").click();
    
    // Check Register mode fields
    await expect(page.getByPlaceholder('Phone Number')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();

    // Switch back to Login mode
    await page.getByText('Already have an account? Login').click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('Shows error on invalid login', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder('Email').fill('invalid@example.com');
    await page.getByPlaceholder('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    // We expect an error message to appear
    const errorMsg = page.locator('.text-red-500');
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
  });
});
