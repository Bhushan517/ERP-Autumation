import { test, expect } from '@playwright/test';

test('User Role Management - Manage Permissions', async ({ page }) => {
  test.setTimeout(120000); // 2 minutes timeout

  // Login
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  await page.getByTestId('SI-username-input-password').fill('9699342811+2');
  await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
  await page.getByTestId('SI-password-input-password').press('Enter');
  await page.waitForTimeout(2000); // Login wait

  // Navigate to Roles
  await page.getByTestId('menu-item-user-management').click();
  await page.waitForTimeout(500);
  await page.getByTestId('submenu-item-roles').click();
  await page.waitForTimeout(1500); // Page load wait

  // Search for role
  await page.getByTestId('UM-role-list-search').fill('demo1');
  await page.waitForTimeout(1000); // Search results wait

  // Click Manage button for the searched role (in its row)
  await page.getByRole('row', { name: /demo1/ })
    .getByTestId('UM-role-list-manage-permissions-btn').click();
  await page.waitForTimeout(1500); // Modal load wait

  // Change permissions
  await page.getByTestId('UM-sys-admin-change-perm-btn').click();
  await page.waitForTimeout(1000);

  // Select module
  await page.getByTestId('UM-apply-perm-module-search').click();
  await page.waitForTimeout(500);
  await page.getByText('Certificates').nth(2).click();
  await page.waitForTimeout(800);

  // Select permission
  await page.getByTestId('UM-apply-perm-perm-search').click();
  await page.waitForTimeout(500);
  await page.getByText('Certificate Cash Payment(').click();
  await page.waitForTimeout(800);

  // Select action
  await page.getByTestId('UM-apply-perm-action-search').click();
  await page.waitForTimeout(500);
  await page.getByTestId('UM-apply-perm-action-7504e346-2575-467a-be35-63d6045dd5d4').check();
  await page.waitForTimeout(500);

  // Submit
  await page.getByTestId('UM-apply-perm-submit-btn').click();
  await page.waitForTimeout(2000); // Save wait

  // Edit
  await page.getByTestId('UM-sys-admin-edit-btn').click();
  await page.waitForTimeout(1000);
  await page.locator('.text-\\[var\\(--icon-color\\)\\]').click();
  await page.waitForTimeout(800);

  // Delete
  await page.getByTestId('UM-sys-admin-delete-btn').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('UM-sys-admin-delete-perm-popup-confirm').click();
  await page.waitForTimeout(2000);

  // Close
// Close outer modal
await page.locator('.cursor-pointer > path').first().click({ force: true });
await page.waitForTimeout(1000);

// Close inner modal if exists
const closeButton = page.locator('.lucide.lucide-x').first();
if (await closeButton.isVisible().catch(() => false)) {
  await closeButton.click({ force: true });
  await page.waitForTimeout(500);
}

  console.log('✅ Test completed!');
});





//   await page.getByTestId('UM-role-list-add-btn').click();
//   await page.getByTestId('UM-add-roles-name').click();
//   await page.getByTestId('UM-add-roles-name').fill('demo1');
//   await page.getByTestId('UM-add-roles-code').click();
//   await page.getByTestId('UM-add-roles-code').fill('3332321');
//   await page.getByTestId('UM-add-roles-desc').click();
//   await page.getByTestId('UM-add-roles-desc').fill('demo1');
//   await page.getByTestId('UM-add-roles-is-system').check();
//   await page.getByTestId('UM-add-roles-save-btn').click();