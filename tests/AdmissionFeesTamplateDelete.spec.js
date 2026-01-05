import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import FeesTemplateQaPage from '../pages/admission/FeesTemplateQaPage.js';

test('Admission QA - Edit and Delete Fees Template', async ({ page }) => {
  const loginQaPage = new LoginQaPage(page);
  const feesTemplateQaPage = new FeesTemplateQaPage(page);

  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(2000);

  await feesTemplateQaPage.navigateToFeesTemplate();

  await feesTemplateQaPage.editFirstTemplate();
  await feesTemplateQaPage.saveTemplateAfterEdit();

  await feesTemplateQaPage.deleteFirstTemplate();
  await feesTemplateQaPage.confirmDelete();

  await feesTemplateQaPage.closeModal();
});
