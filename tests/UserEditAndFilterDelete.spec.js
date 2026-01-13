import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import UserManagementPage from '../pages/user-management/UserManagementPage.js';

test('User Management - Search, Edit, Delete, Filter', async ({ page }) => {
  test.setTimeout(120000);

  const loginQaPage = new LoginQaPage(page);
  const userManagementPage = new UserManagementPage(page);

  // Login
  await loginQaPage.login('rushikesh@gmail.com', 'Rd@12345');
  await page.waitForTimeout(2000);

  // Navigate to Users
  await userManagementPage.navigateToUsers();
  await page.waitForTimeout(1500);

  // Edit User (Row 2, Index 1)
  await userManagementPage.clickEditUser(1);

  // Update Personal Info
  await userManagementPage.updateBasicInfo('playuygfhjwrighttt', 'testhgvbingtt');

  // Click Phone number (preserving original test step)
  await page.getByTestId('UM-AE-Phone number').click();
  await page.waitForTimeout(800);

  // Update Official Info
  await userManagementPage.selectManager('bhushan raut');
  await page.waitForTimeout(800);

  await userManagementPage.selectDepartment('QA');
  await page.waitForTimeout(800);

  await userManagementPage.selectJoiningDate('2');
  await page.waitForTimeout(500);

  // Geofencing
  await userManagementPage.setAttendanceType();
  await page.waitForTimeout(500);

  // Update
  await userManagementPage.clickUpdateUser();

  // Filter
  await userManagementPage.openFilter();

  await userManagementPage.applyFilter({
    manager: 'Bhushan Raut',
    department: 'QA',
    location: 'Baap company',
    status: 'active'
  });

  // Reset Filter
  await userManagementPage.openFilter();
  await userManagementPage.resetFilterButtons();

  // Delete User
  await userManagementPage.deleteUser(1);

  console.log('✅ Test completed!');
});