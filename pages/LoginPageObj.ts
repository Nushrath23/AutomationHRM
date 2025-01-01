import { Page, Locator } from '@playwright/test';

export class LoginPageObj {
  private page: Page;
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#email');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('.btn.btn-primary.account-btn');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.goto('https://antlerhrm-dev.web.app/login');
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
