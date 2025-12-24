import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/LoginQaPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import AdmissionQaPage from '../pages/AdmissionQaPage.js';
import FeesDetailsQaPage from '../pages/FeesDetailsQaPage.js';
import FeesTemplateQaPage from '../pages/FeesTemplateQaPage.js';

test('test', async ({ page }) => {
  const loginQaPage = new LoginQaPage(page);
  const dashboardPage = new DashboardPage(page);
  const admissionQaPage = new AdmissionQaPage(page);
  const feesDetailsQaPage = new FeesDetailsQaPage(page);
  const feesTemplateQaPage = new FeesTemplateQaPage(page);

  await loginQaPage.login('9699342811+2', 'Ritesh@123');

  await dashboardPage.navigateToAdmissions();

  const uniqueId = `${Date.now()}`;
  const uniquePRN = `${Math.floor(1000 + Math.random() * 9000)}`;
  const uniqueEmail = `ram${uniqueId}@gmail.com`;
  const uniquePhone = `6${Math.floor(100000000 + Math.random() * 900000000)}`; // 10-digit starting with 6
  const uniqueTemplateName = `sujit${uniqueId}`;
  const firstName = 'ram';
  const lastName = 'sham';
  const studentName = `Mr. ${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;

  await admissionQaPage.createAdmission({
    prn: uniquePRN,
    title: 'Mr',
    firstName: firstName,
    lastName: lastName,
    gender: 'Male',
    date: '23',
    location: 'Baap company',
    email: uniqueEmail,
    phoneNumber: uniquePhone,
    course: 'BCA',
    year: 'First Year'
  });

  await admissionQaPage.clickStudentName(studentName);
  await feesDetailsQaPage.clickFeesDetails();
  await feesDetailsQaPage.selectTemplate('sujit');
  await feesDetailsQaPage.clickAddTemplate();
  await feesDetailsQaPage.addInstallment('30', '24');
  await feesDetailsQaPage.processPayment('Sujit', '0-0');
  await feesDetailsQaPage.clickBack();
  await feesTemplateQaPage.clickFeesTemplate();
  await feesTemplateQaPage.createTemplate({
    name: `ram-${uniqueId}`,
    componentName: 'am',
    amount: '3000000'
  });
});