import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import AdmissionQaPage from '../pages/admission/AdmissionQaPage.js';

test.setTimeout(120000);

const uniqueText = (prefix = 'text') =>
  `${prefix}_${Date.now()}`;

const uniqueZip = () =>
  (400000 + Math.floor(Math.random() * 100000)).toString();

test('Admission QA - Update Admission Details', async ({ page }) => {
  const loginQaPage = new LoginQaPage(page);
  const admissionQaPage = new AdmissionQaPage(page);

  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(2000);

  await admissionQaPage.navigateToAdmissions();

  await admissionQaPage.clickStudentName('Mr. Ram Sham');
  await page.waitForTimeout(1500);

  await admissionQaPage.updatePersonalDetails({
    houseNo: uniqueText('house'),
    village: uniqueText('village'),
    locality: uniqueText('locality'),
    street: uniqueText('street'),
    city: uniqueText('city'),
    state: 'MH',
    country: 'India',
    zipCode: uniqueZip(),
    bloodGroup: 'A+'
  });

  await admissionQaPage.updateAcademicInfo({
    rollNo: String(Math.floor(Math.random() * 100))
  });

  await admissionQaPage.addNote({
    title: uniqueText('note'),
    description: uniqueText('desc'),
    approver: 'Swati Dighe',
    dateDay: '1'
  });

  await admissionQaPage.clickTab('fees-details');
  await admissionQaPage.clickTab('academic-info');
  await admissionQaPage.clickTab('personal-details');
});
