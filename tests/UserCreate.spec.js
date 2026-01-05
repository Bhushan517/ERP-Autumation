import { test, expect } from '@playwright/test';

test('Create 99 Users with Same Data', async ({ page }) => {
  test.setTimeout(600000); 

  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  await page.getByTestId('SI-username-input-password').fill('9699342811+2');
  await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
  await page.getByTestId('SI-password-input-password').press('Enter');
  await page.waitForTimeout(2000);

  await page.getByTestId('menu-item-user-management').click();
  await page.getByTestId('submenu-item-users').click();
  await page.waitForTimeout(1000);

  for (let i = 1; i <= 99; i++) {
    console.log(`Creating user ${i} of 99...`);

    await page.getByTestId('UM-emp-list-add-btn').click();
    await page.getByTestId('UM-AE-First Name').click();
    await page.getByTestId('UM-AE-First Name').fill('bhushan');
    await page.getByTestId('UM-AE-Last Name').click();
    await page.getByTestId('UM-AE-Last Name').fill('raut');
    await page.getByTestId('UM-AE-Email').click();
    await page.getByTestId('UM-AE-Email').fill('nagare212@gmail.com');
    await page.getByTestId('UM-AE-FaCheckCircle icon3').click();
    await page.getByTestId('UM-AE-Generate').click();
    await page.getByTestId('UM-AE-Phone number').click();
    await page.getByTestId('UM-AE-Phone number').fill('8262830261');
    await page.locator('.flex.items-center.gap-2.w-full > .cursor-pointer > path').click();
    await page.getByTestId('UM-AE-Generate button').click();
    await page.locator('div').filter({ hasText: /^Male$/ }).click();
    await page.getByTestId('UM-AE-Gender select').first().click();
    await page.getByTestId('UM-AE-Role').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByTestId('UM-AE-Designation').click();
    await page.getByTestId('UM-AE-Designation').fill('jhagdhjadjgdbqhdjqhdbhdbwhdb');
    await page.getByTestId('UM-AE-Joining Date').click();
    await page.getByRole('button', { name: '1' }).nth(4).click();
    await page.getByRole('button', { name: 'Save' }).click();
    
    await page.waitForTimeout(2000); 
    console.log(`✅ User ${i} created!`);
  }

  console.log('🎉 All 99 users created!');
});