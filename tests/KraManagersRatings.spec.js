import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Increase timeout for the entire test
  test.setTimeout(120000); // 2 minutes
  
  // Login as first user (Ritesh)
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('SI-username-input-password').fill('ritesh@gmail.com');
  await page.waitForTimeout(500);
  
  await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
  await page.waitForTimeout(500);
  
  await page.getByTestId('SI-submit-button-show').click();
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('CG-org-card-571bf643-60d5-4e9c-9c99-b8a52ca1832a').click();
  await page.waitForLoadState('networkidle');
  
  // Logout
  await page.getByTestId('logout-button').click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForLoadState('networkidle');
  
  // Login as second user (Rushikesh)
  await page.getByTestId('SI-username-input-password').fill('rushikesh@gmail.com');
  await page.waitForTimeout(500);
  
  await page.getByTestId('SI-password-input-password').fill('Rd@12345');
  await page.waitForTimeout(500);
  
  await page.getByTestId('SI-submit-button-show').click();
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('CG-org-card-571bf643-60d5-4e9c-9c99-b8a52ca1832a').click();
  await page.waitForLoadState('networkidle');
  
  // Navigate to Performance -> Team KRA
  await page.getByTestId('menu-item-performance').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('submenu-item-team-kra').click();
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('PM-TK-Kra-Count-0').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('PM-VTK-Kra-0').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('PM-TWD-Back-Button').click();
  await page.waitForTimeout(500);
  
  // Add rating and comment
  await page.getByTestId('PM-VTK-Rating-0').click();
  await page.waitForTimeout(500);
  
  await page.locator('.flex > button:nth-child(4)').click();
  await page.waitForTimeout(500);
  
  await page.getByRole('textbox', { name: 'Enter your comment' }).fill('goddjbhsbchscjbj');
  await page.waitForTimeout(500);
  
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(1000);
  
  // Navigate back
  await page.getByTestId('PM-VTK-Kra-0').click();
  await page.waitForTimeout(500);
  
  await page.getByTestId('PM-TWD-Back-Button').click();
  await page.waitForTimeout(500);
  
  await page.getByTestId('PM-VTK-Back-Button').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('PM-TK-Year-Clear').click();
  await page.waitForTimeout(500);
  
  await page.getByTestId('submenu-item-my-kra').click();
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('menu-item-performance').click();
  await page.waitForTimeout(1000);
  
  // Logout
  await page.getByTestId('logout-button').click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForLoadState('networkidle');
  
  // Login as third user (Swati)
  await page.getByTestId('SI-username-input-password').fill('swati.dighe@gmail.com');
  await page.waitForTimeout(500);
  
  await page.getByTestId('SI-password-input-password').fill('Swati@123');
  await page.waitForTimeout(500);
  
  await page.getByTestId('SI-submit-button-show').click();
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('CG-org-card-571bf643-60d5-4e9c-9c99-b8a52ca1832a').click();
  await page.waitForLoadState('networkidle');
  
  // Navigate to Performance -> Team KRA
  await page.getByTestId('menu-item-performance').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('submenu-item-team-kra').click();
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('PM-TK-Kra-Count-0').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('PM-VTK-Kra-0').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('PM-TWD-Back-Button').click();
  await page.waitForTimeout(500);
  
  // Add rating and comment
  await page.getByTestId('PM-VTK-Rating-0').click();
  await page.waitForTimeout(500);
  
  await page.locator('.flex.gap-2 > button:nth-child(3)').click();
  await page.waitForTimeout(500);
  
  await page.getByRole('textbox', { name: 'Enter your comment' }).fill('jhdbhjbhjbahjbahjfbajh');
  await page.waitForTimeout(500);
  
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(1000);
  
  // Navigate back
  await page.getByTestId('PM-VTK-Kra-0').click();
  await page.waitForTimeout(500);
  
  await page.getByTestId('PM-TWD-Back-Button').click();
  await page.waitForTimeout(500);
  
  await page.getByTestId('PM-VTK-Back-Button').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('PM-TK-Year-Clear').click();
  await page.waitForTimeout(500);
  
  await page.getByTestId('submenu-item-my-kra').click();
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('menu-item-performance').click();
  await page.waitForTimeout(1000);
});