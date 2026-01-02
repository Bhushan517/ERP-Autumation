import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  await page.getByTestId('SI-username-input-password').click();
  await page.getByTestId('SI-username-input-password').fill('9699342811+2');
  await page.getByTestId('SI-username-input-password').press('Enter');
  await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
  await page.getByTestId('SI-password-input-password').press('Enter');
  await page.getByTestId('menu-item-admission-&-fees').click();
  await page.getByTestId('submenu-item-admissions').click();
  await page.getByTestId('AF-admission-name-f088bc41-7aa4-41dc-b88f-28ccd3c0d188').click();
  await page.getByTestId('EA-tab-fees-details').click();
  await page.getByTestId('AI-FD-template-select').click();
  await page.getByTestId('AI-FD-template-option-2').click();
  await page.getByTestId('AI-FD-add-template').click();
  await page.getByTestId('AI-FD-add-installment').click();
  await page.getByTestId('AI-FD-installment-amount-input').click();
  await page.getByTestId('AI-FD-installment-amount-input').fill('30');
  await page.getByTestId('AI-FD-installment-dueon').click();
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByTestId('AI-FD-save-installments').click();
  await page.locator('.lucide.lucide-chevron-down').first().click();
  await page.locator('.lucide.lucide-chevron-down').first().click();
});