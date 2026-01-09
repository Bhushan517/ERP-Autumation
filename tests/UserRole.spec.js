import { test, expect } from '@playwright/test';

test('User Role Management - Manage Permissions', async ({ page }) => {
  test.setTimeout(120000);

  // Login
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  await page.getByTestId('SI-username-input-password').fill('9699342811+2');
  await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
  await page.getByTestId('SI-password-input-password').press('Enter');
  await page.waitForTimeout(2000);

  // Navigate to Roles
  await page.getByTestId('menu-item-user-management').click();
  await page.waitForTimeout(500);
  await page.getByTestId('submenu-item-roles').click();
  await page.waitForTimeout(1500);

  const roleName = 'demo4';
  
  // Check if role already exists
  await page.getByTestId('UM-role-list-search').fill(roleName);
  await page.waitForTimeout(1000);
  
  const roleExists = await page.getByRole('row', { name: new RegExp(roleName) })
    .isVisible({ timeout: 2000 }).catch(() => false);
  
  if (!roleExists) {
    // Role doesn't exist - create it
    console.log('✅ Role not found - creating new role');
    
    // Clear search
    await page.getByTestId('UM-role-list-search').clear();
    await page.waitForTimeout(500);
    
    await page.getByTestId('UM-role-list-add-btn').click();
    await page.waitForTimeout(1000);
    
    await page.getByTestId('UM-add-roles-name').fill(roleName);
    await page.waitForTimeout(500);
    
    await page.getByTestId('UM-add-roles-code').fill('3332341');
    await page.waitForTimeout(500);
    
    await page.getByTestId('UM-add-roles-desc').fill('demo4');
    await page.waitForTimeout(500);
    
    await page.getByTestId('UM-add-roles-is-system').check();
    await page.waitForTimeout(500);
    
    await page.getByTestId('UM-add-roles-save-btn').click();
    await page.waitForTimeout(2000);
    
    // Search again after creation
    await page.getByTestId('UM-role-list-search').fill(roleName);
    await page.waitForTimeout(1000);
  } else {
    console.log('⚠️ Role already exists - skipping creation');
  }

  // Continue with manage permissions (rest of the code same)
  await page.getByRole('row', { name: new RegExp(roleName) })
    .getByTestId('UM-role-list-manage-permissions-btn').click();
  await page.waitForTimeout(1500);

  await page.getByTestId('UM-sys-admin-change-perm-btn').click();
  await page.waitForTimeout(1000);

  await page.getByTestId('UM-apply-perm-module-search').click();
  await page.waitForTimeout(500);
  await page.getByText('Certificates').nth(2).click();
  await page.waitForTimeout(800);

  await page.getByTestId('UM-apply-perm-perm-search').click();
  await page.waitForTimeout(500);
  await page.getByText('Certificate Cash Payment(').click();
  await page.waitForTimeout(800);

  await page.getByTestId('UM-apply-perm-action-search').click();
  await page.waitForTimeout(500);
  await page.getByTestId('UM-apply-perm-action-7504e346-2575-467a-be35-63d6045dd5d4').check();
  await page.waitForTimeout(500);

  await page.getByTestId('UM-apply-perm-submit-btn').click();
  await page.waitForTimeout(2000);

  await page.getByTestId('UM-sys-admin-edit-btn').click();
  await page.waitForTimeout(1000);
  await page.locator('.text-\\[var\\(--icon-color\\)\\]').click();
  await page.waitForTimeout(800);

  await page.getByTestId('UM-sys-admin-delete-btn').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('UM-sys-admin-delete-perm-popup-confirm').click();
  await page.waitForTimeout(2000);

  await page.locator('.cursor-pointer > path').first().click({ force: true });
  await page.waitForTimeout(1000);

  const closeButton = page.locator('.lucide.lucide-x').first();
  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click({ force: true });
    await page.waitForTimeout(500);
  }

  console.log('✅ Test completed successfully!');
});