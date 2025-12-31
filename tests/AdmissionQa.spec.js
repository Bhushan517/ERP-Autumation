import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import AdmissionQaPage from '../pages/admission/AdmissionQaPage.js';
import FeesDetailsQaPage from '../pages/admission/FeesDetailsQaPage.js';
import FeesTemplateQaPage from '../pages/admission/FeesTemplateQaPage.js';

test('Admission QA - Create Admission and Fees Flow', async ({ page }) => {
  const loginQaPage = new LoginQaPage(page);
  const admissionQaPage = new AdmissionQaPage(page);
  const feesDetailsQaPage = new FeesDetailsQaPage(page);
  const feesTemplateQaPage = new FeesTemplateQaPage(page);

  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(1000); 


  await page.waitForTimeout(1000); 

  const uniqueId = `${Date.now()}`;
  const uniquePRN = `${Math.floor(1000 + Math.random() * 9000)}`;
  const uniqueEmail = `ram${uniqueId}@gmail.com`;
  const uniquePhone = `6${Math.floor(100000000 + Math.random() * 900000000)}`; 
  const currentDate = new Date().getDate().toString(); 
  const firstName = 'ram';
  const lastName = 'sham';
  const studentName = `Mr. ${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;

  await admissionQaPage.createAdmission({
    prn: uniquePRN,
    title: 'Mr',
    firstName: firstName,
    lastName: lastName,
    gender: 'Male',
    date: currentDate,
    location: 'Baap company',
    email: uniqueEmail,
    phoneNumber: uniquePhone,
    course: 'BCA',
    year: 'First Year'
  });
  await page.waitForTimeout(1500); 

  await admissionQaPage.clickStudentName(studentName);
  await page.waitForTimeout(1000); 

  await feesDetailsQaPage.clickFeesDetails();
  await page.waitForTimeout(1000);
  await feesDetailsQaPage.selectTemplate('sujit');
  await page.waitForTimeout(500); 
  await feesDetailsQaPage.clickAddTemplate();
  await page.waitForTimeout(500);
  await feesDetailsQaPage.addInstallment('30', currentDate);
  await page.waitForTimeout(1000); 
  await feesDetailsQaPage.processPayment('Sujit', '0-0');
  await page.waitForTimeout(1000); 
  await feesDetailsQaPage.clickBack();
  await page.waitForTimeout(1000); 

  await feesTemplateQaPage.clickFeesTemplate();
  await page.waitForTimeout(1000); 
  await feesTemplateQaPage.createTemplate({
    name: `ram-${uniqueId}`,
    componentName: 'am',
    amount: '3000000'
  });
  await page.waitForTimeout(1000); 
});