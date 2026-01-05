import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import MembershipPage from '../pages/hostel/MembershipPage.js';
import MembershipFeesDetailsPage from '../pages/hostel/MembershipFeesDetailsPage.js';
import MembershipPersonalDetailsPage from '../pages/hostel/MembershipPersonalDetailsPage.js';
import MembershipViewPage from '../pages/hostel/MembershipViewPage.js';

const uniqueId = () => Date.now();
const uniqueText = (prefix) => `${prefix}_${uniqueId()}`;
const uniqueEmail = () => `test_${uniqueId()}@gmail.com`;
const uniquePhone = () => {
  const phone = Math.floor(1000000000 + Math.random() * 9000000000);
  return phone.toString();
};
const uniqueZip = () => (400000 + Math.floor(Math.random() * 100000)).toString();
const uniqueTransactionId = () => Math.floor(10000000 + Math.random() * 90000000).toString();

test('Hostel - Member Fees Details and Personal Details with auto-generated data', async ({ page }) => {
  test.setTimeout(60000);
  const loginQaPage = new LoginQaPage(page);
  const membershipPage = new MembershipPage(page);
  const membershipFeesDetailsPage = new MembershipFeesDetailsPage(page);
  const membershipPersonalDetailsPage = new MembershipPersonalDetailsPage(page);
  const membershipViewPage = new MembershipViewPage(page);

  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(2000);

  await membershipPage.navigateToMemberships();

  await membershipViewPage.clickMember(0);

  await membershipFeesDetailsPage.navigateToFeesDetails();

  await membershipFeesDetailsPage.searchAndSelectTemplate('bhushan raut');
  await membershipFeesDetailsPage.addTemplate();

  const installmentAmount = '30';
  const installmentDay = '31';
  await membershipFeesDetailsPage.addInstallment(installmentAmount, installmentDay);
  await membershipFeesDetailsPage.saveAll();

  await membershipFeesDetailsPage.expandInstallment(0);
  await membershipFeesDetailsPage.expandInstallment(1);
  await membershipFeesDetailsPage.getPayment(0, 0);

  const transactionId = uniqueTransactionId();
  await membershipFeesDetailsPage.processManualPayment(transactionId, 'smart', '31');

  await membershipFeesDetailsPage.collapseInstallment();

  await membershipPersonalDetailsPage.navigateToPersonalDetails();
  await membershipPersonalDetailsPage.clickEdit();

  const permAddress = {
    houseNo: uniqueText('house'),
    street: uniqueText('street'),
    locality: uniqueText('locality'),
    state: uniqueText('state'),
    city: uniqueText('city'),
    zipCode: uniqueZip(),
    country: 'India'
  };
  await membershipPersonalDetailsPage.fillPermanentAddress(permAddress);

  const tempAddress = {
    city: uniqueText('city'),
    state: uniqueText('state'),
    street: uniqueText('street'),
    houseNo: uniqueText('house'),
    village: uniqueText('village'),
    locality: uniqueText('locality'),
    zipCode: uniqueZip(),
    country: 'India'
  };
  await membershipPersonalDetailsPage.fillTemporaryAddress(tempAddress);

  const familyData = {
    name: uniqueText('family'),
    email: uniqueEmail(),
    phone: uniquePhone()
  };
  await membershipPersonalDetailsPage.addFamilyMember(familyData, 0);

  const emergencyData = {
    name: uniqueText('emergency'),
    relation: uniqueText('relation'),
    phone: uniquePhone()
  };
  await membershipPersonalDetailsPage.addEmergencyContact(emergencyData, 0);

  await membershipPersonalDetailsPage.save();

  await membershipPersonalDetailsPage.goBack();

  try {
    await membershipViewPage.exitMember(0);
  } catch (e) {
    console.log('Exit member step skipped - continuing test');
  }
});

