import { Page, Locator } from '@playwright/test';

export class tabs {
  private page: Page;
  private missingAttendanceTab: Locator;
  private applyLeaveTab: Locator;
  private missingAttendanceForm: Locator;
  private applyLeaveForm: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.missingAttendanceTab = page.locator('button[id="missing-attendance-tab"]');
    this.applyLeaveTab = page.locator('button[id="apply-leave-tab"]');
    this.missingAttendanceForm = page.locator('#attendanceTabsContent');
    this.applyLeaveForm = page.locator('#apply-leave');
    this.submitButton = page.locator('.btn btn-primary submit-btn');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://antlerhrm-dev.web.app/dashboard/employee');
  }

  async selectMissingAttendanceTab(): Promise<void> {
    await this.missingAttendanceTab.click();
  }

  async selectApplyLeaveTab(): Promise<void> {
    await this.applyLeaveTab.click();
  }

  async isMissingAttendanceFormVisible(): Promise<boolean> {
    return this.missingAttendanceForm.isVisible();
  }

  async isApplyLeaveFormVisible(): Promise<boolean> {
    return this.applyLeaveForm.isVisible();
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }
}
