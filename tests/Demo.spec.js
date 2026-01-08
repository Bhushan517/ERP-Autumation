import { test, expect } from '@playwright/test';

test('User Management - Search, Edit, Delete, Filter', async ({ page }) => {
  test.setTimeout(120000); // 2 minutes timeout

  // Login
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  await page.getByTestId('SI-username-input-password').fill('9699342811+2');
  await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
  await page.getByTestId('SI-password-input-password').press('Enter');
  await page.waitForTimeout(2000);

  // Navigate to Users
  await page.getByTestId('menu-item-user-management').click();
  await page.waitForTimeout(500);
  await page.getByTestId('submenu-item-users').click();
  await page.waitForTimeout(1500);

  // Search User
  await page.getByTestId('UM-emp-list-search').fill('bhushan');
  await page.waitForTimeout(1000);

  await page.getByRole('row').nth(1).getByTestId('UM-emp-list-edit-btn').click();
  await page.waitForTimeout(1500);

  await page.getByTestId('UM-AE-First Name').fill('playuygfhjwrighttt');
  await page.waitForTimeout(300);
  await page.getByTestId('UM-AE-Last Name').fill('testhgvbingtt');
  await page.waitForTimeout(500);
  await page.getByTestId('UM-AE-Phone number').click();
  await page.waitForTimeout(800);

  await page.getByTestId('UM-AE-Manager').click();
  await page.waitForTimeout(800);

  await page.locator('.absolute > div:nth-child(2)').click();
  await page.waitForTimeout(800);

  // await page.getByTestId('UM-AE-Search Location').click();
  // await page.waitForTimeout(800);

  // await page.getByText('Baap company', { exact: true }).click();
  // await page.waitForTimeout(800);

  await page.getByTestId('UM-AE-Search Department').click();
  await page.waitForTimeout(800);

  // Select QA from dropdown - using last() to get the dropdown option, not table text
  await page.getByText('QA', { exact: true }).last().click();
  await page.waitForTimeout(800);


  // Joining Date
  await page.getByTestId('UM-AE-Joining Date').click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: '2' }).nth(3).click();
  await page.waitForTimeout(500);

  await page.getByTestId('UM-AE-Geofencing').check();
  await page.waitForTimeout(500);

  // Update
  await page.getByRole('button', { name: 'Update' }).click();
  await page.waitForTimeout(2000);

  // Delete
  await page.getByRole('row').nth(1).getByTestId('UM-emp-list-delete-btn').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('UM-emp-list-delete-popup-confirm').click();
  await page.waitForTimeout(2000);


  await page.getByTestId('UM-emp-list-filter-btn').click();
  await page.waitForTimeout(800);

  await page.getByTestId('UM-user-filter-manager-search').click();
  await page.waitForTimeout(800);
  await page.getByText('Bhushan Raut', { exact: true }).first().click();
  await page.waitForTimeout(800);

  await page.getByTestId('UM-user-filter-dept-search').click();
  await page.waitForTimeout(800);
  // Select QA from filter dropdown - using last() to avoid table text
  await page.getByText('QA', { exact: true }).last().click();
  await page.waitForTimeout(800);

  await page.getByTestId('UM-user-filter-loc-search').click();
  await page.waitForTimeout(800);
  await page.getByText('Baap company', { exact: true }).click();
  await page.waitForTimeout(800);

  await page.getByTestId('UM-user-filter-status').click();
  await page.waitForTimeout(800);
  await page.getByText('active', { exact: true }).click();
  await page.waitForTimeout(1000);

  await page.getByTestId('UM-user-filter-apply-btn').click();
  await page.waitForTimeout(2000);



  console.log('✅ Test completed!');
});