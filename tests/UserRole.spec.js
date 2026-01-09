import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import UserManagementPage from '../pages/user-management/UserManagementPage.js';

test('User Role Management - Manage Permissions', async ({ page }) => {
  test.setTimeout(120000);

  const loginQaPage = new LoginQaPage(page);
  const userManagementPage = new UserManagementPage(page);

  // Login
  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(2000);

  // Navigate to Roles
  await userManagementPage.navigateToUsers(); // Go to User Management module
  await userManagementPage.navigateToRoles(); // Go to Roles submenu
  await page.waitForTimeout(1500);

  const roleName = 'demo8';

  // Check if role already exists
  await userManagementPage.searchRole(roleName);

  const roleExists = await userManagementPage.checkRoleExists(roleName);

  if (!roleExists) {
    // Role doesn't exist - create it
    console.log('✅ Role not found - creating new role');

    await userManagementPage.clearRoleSearch();
    await userManagementPage.clickAddRole();
    await userManagementPage.fillRoleDetails(roleName, '3362341', 'demo6');
    await userManagementPage.saveRole();

    // Search again after creation
    await userManagementPage.searchRole(roleName);
  } else {
    console.log('⚠️ Role already exists - skipping creation');
  }

  // Manage Permissions
  await userManagementPage.managePermissions(roleName);
  await userManagementPage.changePermissions();

  await userManagementPage.applyPermission('Certificates', 'Certificate Cash Payment(');

  await userManagementPage.editAndDeletePermission();

  await userManagementPage.closeRolePanel();

  console.log('✅ Test completed successfully!');
});