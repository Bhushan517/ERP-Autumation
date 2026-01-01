import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  await page.getByTestId('SI-username-input-password').click();
  await page.getByTestId('SI-username-input-password').fill('9699342811+2');
  await page.getByTestId('SI-password-input-password').click();
  await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
  await page.getByTestId('SI-password-input-password').press('Enter');
  await page.getByTestId('menu-item-admission-&-fees').click();
  await page.getByTestId('submenu-item-admissions').click();
  await page.getByText('Mr. Ram Sham').first().click();
  await page.getByTestId('EA-tab-fees-details').click();
  await page.getByText('Sujit').click();
  await page.locator('.lucide.lucide-chevron-down').first().click();
 
await page.getByTestId('AI-FD-get-payment-btn-0-0').click();

// Wait for the payment modal to appear
await page.getByText('Payment').first().waitFor({ state: 'visible' });

// Scroll within the modal if needed
const checkbox = page.getByTestId('AI-PAY-method-online').first();
await checkbox.scrollIntoViewIfNeeded();
await checkbox.check();
  await page.getByTestId('AI-PAY-ONLINE-date-picker').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByTestId('AI-PAY-ONLINE-transaction-id').click();
  await page.getByTestId('AI-PAY-ONLINE-transaction-id').fill('765222422256');
  await page.getByRole('button', { name: 'Select Provider' }).click();
  await page.getByText('dere-hdfc').click();
  await page.getByTestId('AI-PAY-save-btn').first().click();
});