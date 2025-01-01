import { test, expect, Page } from '@playwright/test';
import { AttendancePage } from '../../pages/AttendancePage';

test.describe('Attendance Tests', () => {
  test('Successful Check-In updates the time', async ({ page }: { page: Page }) => {
    const attendancePage = new AttendancePage(page);

    // Navigate to the attendance page
    await page.goto('https://yourapp.com/attendance');

    // Verify initial time (assuming 00:00:00 at the start)
    const initialTime = await attendancePage.getTime();
    expect(initialTime).toBe('00:00:00'); // Assert initial state

    // Perform check-in
    await attendancePage.checkIn();

    // Wait for the time to update
    await page.waitForFunction(
      (currentTime) => {
        const timeElement = document.querySelector('#time-display');
        return timeElement && timeElement.textContent !== currentTime;
      },
      initialTime
    );

    // Verify the updated time is not 00:00:00
    const updatedTime = await attendancePage.getTime();
    expect(updatedTime).not.toBe('00:00:00');

    // Optionally verify the format of the updated time
    const timeFormat = /^\d{2}:\d{2}:\d{2}$/; // Matches HH:mm:ss
    expect(updatedTime).toMatch(timeFormat);
  });

  test('Successful Check-Out updates the time', async ({ page }: { page: Page }) => {
    const attendancePage = new AttendancePage(page);

    // Navigate to the attendance page
    await page.goto('https://yourapp.com/attendance');

    // Perform check-in to start tracking time
    await attendancePage.checkIn();
    await page.waitForFunction(() => document.querySelector('#time-display')?.textContent !== '00:00:00');

    // Perform check-out
    await attendancePage.checkOut();

    // Wait for the time to update after check-out
    const checkoutTime = await attendancePage.getTime();
    expect(checkoutTime).not.toBe('00:00:00');
    expect(checkoutTime).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });
});
