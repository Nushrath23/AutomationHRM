import { test, expect } from '@playwright/test';
import { tabs } from '../../pages/tabs';

test.describe('Attendance Tab Component Tests', () => {
  test('Default tab should be Missing Attendance', async ({ page }) => {
    const Tabs = new tabs(page);

    // Navigate to the attendance page
    await Tabs.navigateTo();

    // Verify Missing Attendance form is visible by default
    const isMissingAttendanceVisible = await Tabs.isMissingAttendanceFormVisible();
    expect(isMissingAttendanceVisible).toBe(false);

    // Verify Apply Leave form is not visible
    const isApplyLeaveVisible = await Tabs.isApplyLeaveFormVisible();
    expect(isApplyLeaveVisible).toBe(true);
  });

  test('Switching to Apply Leave tab displays correct form', async ({ page }) => {
    const Tabs = new tabs(page);

    // Navigate to the attendance page
    await Tabs.navigateTo();

    // Switch to Apply Leave tab
    await Tabs.selectApplyLeaveTab();

    // Verify Apply Leave form is visible
    const isApplyLeaveVisible = await Tabs.isApplyLeaveFormVisible();
    expect(isApplyLeaveVisible).toBe(true);

    // Verify Missing Attendance form is not visible
    const isMissingAttendanceVisible = await Tabs.isMissingAttendanceFormVisible();
    expect(isMissingAttendanceVisible).toBe(false);
  });
});
