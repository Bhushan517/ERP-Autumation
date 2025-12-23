import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import DocumentPage from '../pages/DocumentPage.js';

test('document flow using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const documentPage = new DocumentPage(page);

  await loginPage.login('9699342811+2', 'Ritesh@123');

  await documentPage.navigateToDocumentModule();
  await documentPage.navigateToDocumentConfiguration();

  await documentPage.addCategory({
    name: 'sdfdgsvwvwvw',
  });

  await documentPage.navigateToDocumentType();
  await documentPage.addDocumentType({
    name: 'cv',
    categoryName: 'sdfdgsvwvwvw',
    format: 'PDF',
    isExpiryRequired: true,
    warningDays: '5',
  });

  await documentPage.navigateToRoleMapping();
  await documentPage.addRoleMapping({
    role: 'Admin',
    documentType: 'cv',
    isMandatory: true,
  });

  await documentPage.navigateToDocuments();
  await documentPage.uploadDocument({
    filePath: 'tests/fixtures/Python Programming Certificate.pdf',
    startDay: '1',
    endDay: '22',
  });

  await documentPage.verifyDocumentsFlow();

});