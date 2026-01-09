import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import CertificatePage from '../pages/certificate/CertificatePage.js';

test('Certificate Module - Request, Approve, Reject, Download', async ({ page }) => {
    test.setTimeout(180000); // Increase timeout for demo

    const loginQaPage = new LoginQaPage(page);
    const certificatePage = new CertificatePage(page);

    // Login
    await loginQaPage.goto();
    await loginQaPage.login('9699342811+2', 'Ritesh@123');
    await page.waitForTimeout(2000);

    // Navigate to Certificates
    await certificatePage.navigateToCertificates();
    await certificatePage.navigateToApprovedCertificates();

    // --- Scenario 1: Request & Approve ---
    await certificatePage.clickRequestCertificate();

    await certificatePage.searchAndSelectCertificate('ritesh cash payment');
    await certificatePage.selectPaymentMode('Cash');
    await certificatePage.submitRequest();

    await certificatePage.approveRequest();

    const rowNameApprove = '1 Ritesh Cash Payment 09/01/'; // Update date if needed

    // Download Certificate
    await certificatePage.downloadCertificate(rowNameApprove);

    // Download Receipt
    await certificatePage.downloadReceipt(rowNameApprove);

    // Delete
    await certificatePage.deleteRequest(rowNameApprove);


    // --- Scenario 2: Request & Reject ---
    await certificatePage.clickRequestCertificate();

    await certificatePage.searchAndSelectCertificate('ritesh cash payment');
    await certificatePage.selectPaymentMode('Cash');
    await certificatePage.submitRequest();

    await certificatePage.rejectRequest();


    // --- Scenario 3: Request Again for View Requests ---
    await certificatePage.clickRequestCertificate();

    await certificatePage.searchAndSelectCertificate('ritesh cash payment');
    await certificatePage.selectPaymentMode('Cash');
    await certificatePage.submitRequest();

    await certificatePage.approveRequest();


    // --- Verify in View Certificate Requests ---
    await certificatePage.navigateToViewCertificateRequests();

    // Filter Approved
    await certificatePage.filterRequests('Approved');

    // Note: Casing seems to differ in View Requests based on previous raw test ('ritesh' vs 'Ritesh')
    const rowNameView = '1 ritesh cash payment 09/01/';

    await certificatePage.downloadCertificateFromView(rowNameView);
    await certificatePage.downloadReceiptFromView(rowNameView);

    // Change to Rejected
    await certificatePage.filterRequests('Rejected');

    // Delete from View Requests
    await certificatePage.deleteFromViewRequests(rowNameView);

    console.log('✅ Certificate Test Completed');
});
