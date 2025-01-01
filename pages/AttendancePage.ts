import { Page, Locator } from '@playwright/test';

export class AttendancePage {
  private page: Page;
  private checkInButton: Locator;
  private checkOutButton: Locator;
  private timeDisplay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkInButton = page.locator('#checkin'); // Locator for Check-In button
    this.checkOutButton = page.locator('#checkout'); // Locator for Check-Out button
    this.timeDisplay = page.locator('#time-display'); // Locator for the time display
  }

  async checkIn(): Promise<void> {
    await this.checkInButton.click(); // Click Check-In button
  }

  async checkOut(): Promise<void> {
    await this.checkOutButton.click(); // Click Check-Out button
  }

  async getTime(): Promise<string> {
    return await this.timeDisplay.textContent(); // Get the current time displayed
  }
}
