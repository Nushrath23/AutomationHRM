import { test, expect } from '@playwright/test';
import { AttendanceFormPage } from '../../pages/MissingAtt';

test.describe('Attendance Form Tests', () => {
  test('Submit the form successfully with valid input', async ({ page }) => {
    const attendanceForm = new AttendanceFormPage(page);

    // Navigate to the form page
    await page.goto('https://antlerhrm-dev.web.app/dashboard/employee');

    // Fill out the form
    await attendanceForm.selectType('Full Day');
    await attendanceForm.fillDate('12/29/2024');
    await attendanceForm.fillTimeIn('10', '14');
    await attendanceForm.fillTimeOut('18', '30');
    await attendanceForm.fillReason('Full day work.');

    // Verify that the Submit button is enabled
    const isEnabled = await attendanceForm.isSubmitButtonEnabled();
    expect(isEnabled).toBe(true);

    // Submit the form
    await attendanceForm.clickSubmit();

    // Verify success message or redirect
    await expect(page.locator('text=Employee missing attendance created')).toBeVisible();
  });

  test('Show validation error when Time In is greater than Time Out', async ({ page }) => {
    const attendanceForm = new AttendanceFormPage(page);

    // Navigate to the form page
    await page.goto('https://antlerhrm-dev.web.app/dashboard/employee');

    // Fill out the form with invalid time
    await attendanceForm.selectType('Half Day');
    await attendanceForm.fillDate('12/29/2024');
    await attendanceForm.fillTimeIn('03', '00');
    await attendanceForm.fillTimeOut('10', '00');
    await attendanceForm.fillReason('Testing invalid time.');

    // Verify that the Submit button is still disabled
    const isEnabled = await attendanceForm.isSubmitButtonEnabled();
    expect(isEnabled).toBe(false);

    // Verify validation error message
    await expect(page.locator('text=Time In must be earlier than Time Out')).toBeVisible();
  });
});
