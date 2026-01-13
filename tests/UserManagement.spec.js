// UserManagement.spec.js
import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import UserManagementPage from '../pages/user-management/UserManagementPage.js';

test('Create User with Auto-Generated Data', async ({ page }) => {
  test.setTimeout(120000);
  const loginQaPage = new LoginQaPage(page);
  const userManagementPage = new UserManagementPage(page);

  // Login
  await loginQaPage.login('rushikesh@gmail.com', 'Rd@12345');
  await page.waitForTimeout(2000);

  // Navigate to Users
  await userManagementPage.navigateToUsers();

  // Generate unique data
  const timestamp = Date.now();
  const uniqueId = Math.floor(1000 + Math.random() * 9000);
  const firstName = 'playwright';
  const lastName = 'testing';
  const uniqueEmail = `play${timestamp}@gmail.com`;
  const uniquePhone = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
  const emergencyPhone = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
  const currentDate = new Date().getDate().toString();

  console.log(`Creating user: ${firstName} ${lastName}`);
  console.log(`Email: ${uniqueEmail}`);
  console.log(`Phone: ${uniquePhone}`);

  // Prepare user data object
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: uniqueEmail,
    phone: uniquePhone,
    officialEmail: uniqueEmail,
    designation: 'QA Engineer',
    joiningDate: currentDate,
    emergencyContactName: 'Emergency Contact',
    relationship: 'Father',
    emergencyPhone: emergencyPhone,
    location: 'Baap company'
  };

  // Create user using POM
  await userManagementPage.createUser(userData);

  console.log('✅ User created successfully!');

  // View user details
  await userManagementPage.viewUserDetails(firstName, lastName);

  // Navigate through all tabs
  await userManagementPage.viewAllUserTabs();

  // Close and navigate to roles
  await userManagementPage.closeUserDetails();
  await userManagementPage.navigateToRoles();

  console.log('🎉 Test completed!');
});