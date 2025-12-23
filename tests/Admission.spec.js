import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import AdmissionPage from '../pages/AdmissionPage.js';
import FeesDetailsPage from '../pages/FeesDetailsPage.js';
import FeesTemplatePage from '../pages/FeesTemplatePage.js';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const admissionPage = new AdmissionPage(page);
  const feesDetailsPage = new FeesDetailsPage(page);
  const feesTemplatePage = new FeesTemplatePage(page);

  await loginPage.login('9699342811+2', 'Ritesh@123');

  await dashboardPage.navigateToAdmissions();

  await admissionPage.createAdmission({
    title: 'Mr',
    firstName: 'tushar ',
    lastName: 'sangle',
    gender: 'Male',
    date: '1',
    location: 'The Baap Company',
    email: 'ritesh@gmail.com',
    phoneNumber: '8767629834',
    course: 'BBA',
    year: '10th'
  });

  await admissionPage.clickStudentName('Mr. Tushar Sangle');
  await feesDetailsPage.clickFeesDetails();
  await feesDetailsPage.selectTemplate('template');
  await feesDetailsPage.clickAdd();
  await feesDetailsPage.addInstallment('5000', '23');
  await feesDetailsPage.processPayment();

  // await feesDetailsPage.clickBack();
  await feesTemplatePage.clickFeesTemplate();
  await feesTemplatePage.createTemplate({
    name: 'bhushan',
    paymentTypeName: 'bhushan',
    amount: '3000',
    type: 'fees'
  });
});
