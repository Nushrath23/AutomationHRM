import { test, expect } from '@playwright/test';
import { LoginPageObj } from '../../pages/LoginPageObj';

test.describe('Authentication Tests', () => {
  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPageObj(page);
    await loginPage.login('admin@antlerhrm.com', 'Admin@#$1234');
    expect(await page.url()).toBe('https://antlerhrm-dev.web.app/login');
  });

  test('Invalid login attempt', async ({ page }) => {
    const loginPage = new LoginPageObj(page);
    await loginPage.login('hr_user@yopmail.com', 'wrongpassword');
    await expect(page.locator('#swal2-title')).toHaveText('Login Failed');
  });
});
