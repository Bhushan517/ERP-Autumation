import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import FeesTemplateQaPage from '../pages/admission/FeesTemplateQaPage.js';

test('Admission QA - Edit and Delete Fees Template', async ({ page }) => {
  const loginQaPage = new LoginQaPage(page);
  const feesTemplateQaPage = new FeesTemplateQaPage(page);

  // Login
  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(2000);

  // Navigate to Fees Template
  await feesTemplateQaPage.navigateToFeesTemplate();

  // Edit first template
  await feesTemplateQaPage.editFirstTemplate();
  await feesTemplateQaPage.saveTemplateAfterEdit();

  // Delete first template
  await feesTemplateQaPage.deleteFirstTemplate();
  await feesTemplateQaPage.confirmDelete();

  // Optional: Close modal
  await feesTemplateQaPage.closeModal();
});
