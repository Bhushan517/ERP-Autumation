import { test, expect } from '@playwright/test';
test.setTimeout(120000); 

const uniqueText = (prefix = 'text') =>
  `${prefix}_${Date.now()}`;

const uniqueZip = () =>
  (400000 + Math.floor(Math.random() * 100000)).toString();

test('test', async ({ page }) => {
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  await page.waitForTimeout(1500);

  await page.getByTestId('SI-username-input-password').fill('9699342811+2');
  await page.waitForTimeout(800);

  await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
  await page.waitForTimeout(800);

  await page.getByTestId('SI-submit-button-show').click();
  await page.waitForTimeout(2000);

  await page.getByTestId('menu-item-admission-&-fees').click();
  await page.waitForTimeout(1000);

  await page.getByTestId('submenu-item-admissions').click();
  await page.waitForTimeout(1500);

  await page.getByText('Mr. Ram Sham').first().click();
  await page.waitForTimeout(1500);

  await page.getByTestId('AI-PD-edit-contact-info-button').click();
  await page.waitForTimeout(1000);

  await page.getByTestId('AI-PD-permanent-house-no-input')
    .fill(uniqueText('house'));
  await page.waitForTimeout(500);

  await page.getByTestId('AI-PD-permanent-village-input')
    .fill(uniqueText('village'));
  await page.waitForTimeout(500);

  await page.getByTestId('AI-PD-permanent-locality-input')
    .fill(uniqueText('locality'));
  await page.waitForTimeout(500);

  await page.getByTestId('AI-PD-permanent-street-input')
    .fill(uniqueText('street'));
  await page.waitForTimeout(500);

  await page.getByTestId('AI-PD-permanent-city-input')
    .fill(uniqueText('city'));
  await page.waitForTimeout(500);

  await page.getByTestId('AI-PD-permanent-state-input')
    .fill('MH');
  await page.waitForTimeout(500);

  await page.getByTestId('AI-PD-permanent-country-dropdown').click();
  await page.waitForTimeout(1000);

  await page
    .getByTestId('AI-PD-permanent-country-options')
    .getByText('India', { exact: true })
    .click();
  await page.waitForTimeout(800);

  await page.getByTestId('AI-PD-permanent-zip-code-input')
    .fill(uniqueZip());
  await page.waitForTimeout(800);

  await page.locator('.border > .w-4').first().click();
  await page.waitForTimeout(500);

  await page.getByTestId('AI-PD-blood-group-option-A+').click();
  await page.waitForTimeout(800);

  await page.getByTestId('AI-PD-save-personal-details-button').click();
  await page.waitForTimeout(2000);

  await page.getByTestId('EA-tab-academic-info').click();
  await page.waitForTimeout(1000);

  await page.getByTestId('AI-A-edit-icon').click();
  await page.waitForTimeout(1000);

  await expect(page.getByTestId('AI-A-save-button')).toBeVisible();

  await page.getByTestId('AI-A-roll-no-input')
    .fill(String(Math.floor(Math.random() * 100)));
  await page.waitForTimeout(800);

  await page.getByTestId('AI-A-save-button').click();
  await page.waitForTimeout(1500);

  await page.getByTestId('EA-tab-notes').click();
  await page.waitForTimeout(1000);

  await page.getByTestId('AI-N-title')
    .fill(uniqueText('note'));
  await page.waitForTimeout(500);

  await page.getByTestId('AI-N-description')
    .fill(uniqueText('desc'));
  await page.waitForTimeout(500);

  await page.getByTestId('AI-N-approver').click();
  await page.waitForTimeout(800);

  await page
    .getByTestId('AI-N-approver-dropdown')
    .getByText('bhushan rahut', { exact: true })
    .click();
  await page.waitForTimeout(800);

  await page.getByTestId('AI-N-date').click();
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.waitForTimeout(500);

  await page.getByTestId('AI-N-save-btn').click();
  await page.waitForTimeout(1500);

  await page.getByTestId('EA-tab-fees-details').click();
  await page.waitForTimeout(1000);

  await page.getByTestId('EA-tab-academic-info').click();
  await page.waitForTimeout(1000);

  await page.getByTestId('EA-tab-personal-details').click();
  await page.waitForTimeout(1000);
});
