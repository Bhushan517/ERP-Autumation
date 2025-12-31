import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import MembershipPage from '../pages/hostel/MembershipPage.js';
import MembershipFeesDetailsPage from '../pages/hostel/MembershipFeesDetailsPage.js';
import MembershipPersonalDetailsPage from '../pages/hostel/MembershipPersonalDetailsPage.js';
import MembershipViewPage from '../pages/hostel/MembershipViewPage.js';

// Helper functions for auto-generating unique data
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
  test.setTimeout(60000); // Increase timeout to 60s for this test
  const loginQaPage = new LoginQaPage(page);
  const membershipPage = new MembershipPage(page);
  const membershipFeesDetailsPage = new MembershipFeesDetailsPage(page);
  const membershipPersonalDetailsPage = new MembershipPersonalDetailsPage(page);
  const membershipViewPage = new MembershipViewPage(page);

  // Login
  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(2000);

  // Navigate to memberships
  await membershipPage.navigateToMemberships();

  // Click on first member
  await membershipViewPage.clickMember(0);

  // ========== FEES DETAILS ==========
  await membershipFeesDetailsPage.navigateToFeesDetails();
  
  // Search and add template
  await membershipFeesDetailsPage.searchAndSelectTemplate('bhushan raut');
  await membershipFeesDetailsPage.addTemplate();

  // Add installment with auto-generated data
  const installmentAmount = '30';
  const installmentDay = '31';
  await membershipFeesDetailsPage.addInstallment(installmentAmount, installmentDay);
  await membershipFeesDetailsPage.saveAll();

  // Expand installment and process payment
  await membershipFeesDetailsPage.expandInstallment(0);
  await membershipFeesDetailsPage.expandInstallment(1);
  await membershipFeesDetailsPage.getPayment(0, 0);

  // Process manual payment with auto-generated transaction ID
  const transactionId = uniqueTransactionId();
  await membershipFeesDetailsPage.processManualPayment(transactionId, 'smart', '31');
  
  // Collapse installment
  await membershipFeesDetailsPage.collapseInstallment();

  // ========== PERSONAL DETAILS ==========
  await membershipPersonalDetailsPage.navigateToPersonalDetails();
  await membershipPersonalDetailsPage.clickEdit();

  // Fill permanent address with auto-generated data
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

  // Fill temporary address with auto-generated data
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

  // Add family member with auto-generated data
  const familyData = {
    name: uniqueText('family'),
    email: uniqueEmail(),
    phone: uniquePhone()
  };
  await membershipPersonalDetailsPage.addFamilyMember(familyData, 0);

  // Add emergency contact with auto-generated data
  const emergencyData = {
    name: uniqueText('emergency'),
    relation: uniqueText('relation'),
    phone: uniquePhone()
  };
  await membershipPersonalDetailsPage.addEmergencyContact(emergencyData, 0);

  // Save personal details
  await membershipPersonalDetailsPage.save();

  // Go back (if page is still open)
  await membershipPersonalDetailsPage.goBack();
  
  // Exit member (optional - don't fail test if this fails)
  try {
    await membershipViewPage.exitMember(0);
  } catch (e) {
    // Exit member is optional - test can pass without it
    console.log('Exit member step skipped - continuing test');
  }
});

