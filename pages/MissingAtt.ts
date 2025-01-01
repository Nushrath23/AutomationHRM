import { Page, Locator } from '@playwright/test';

export class AttendanceFormPage {
  private page: Page;
  private typeDropdown: Locator;
  private dateField: Locator;
  private timeInHour: Locator;
  private timeInMinute: Locator;
  private timeOutHour: Locator;
  private timeOutMinute: Locator;
  private reasonField: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.typeDropdown = page.locator('select[name="Type"]');
    this.dateField = page.locator('input[name="date"]');
    this.timeInHour = page.locator('input[name="timeInHour"]');
    this.timeInMinute = page.locator('input[name="timeInMinute"]');
    this.timeOutHour = page.locator('input[name="timeOutHour"]');
    this.timeOutMinute = page.locator('input[name="timeOutMinute"]');
    this.reasonField = page.locator('textarea[name="reason"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async selectType(type: string): Promise<void> {
    await this.typeDropdown.selectOption(type);
  }

  async fillDate(date: string): Promise<void> {
    await this.dateField.fill(date);
  }

  async fillTimeIn(hour: string, minute: string): Promise<void> {
    await this.timeInHour.fill(hour);
    await this.timeInMinute.fill(minute);
  }

  async fillTimeOut(hour: string, minute: string): Promise<void> {
    await this.timeOutHour.fill(hour);
    await this.timeOutMinute.fill(minute);
  }

  async fillReason(reason: string): Promise<void> {
    await this.reasonField.fill(reason);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.submitButton.isEnabled();
  }
}
