import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import AdmissionQaPage from '../pages/admission/AdmissionQaPage.js';

test.setTimeout(120000);

test('Admission QA - Delete Admission and Test UI Elements', async ({ page }) => {
  const loginQaPage = new LoginQaPage(page);
  const admissionQaPage = new AdmissionQaPage(page);

  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(2000);

  await admissionQaPage.navigateToAdmissions();

  await admissionQaPage.clickEditAdmission();
  await page.waitForTimeout(1000);

  await admissionQaPage.changeStatusToCanceled();
  await page.waitForTimeout(500);

  await admissionQaPage.clickSave();
  await page.waitForTimeout(1500);

  await admissionQaPage.deleteAdmission();
  await page.waitForTimeout(1000);

  await admissionQaPage.clickFilterButton();
  await page.waitForTimeout(500);
  await admissionQaPage.closeFilter();
  await page.waitForTimeout(500);

  await admissionQaPage.clickInviteButton();
  await page.waitForTimeout(500);
  await admissionQaPage.closeInviteModal();
  await page.waitForTimeout(500);
});