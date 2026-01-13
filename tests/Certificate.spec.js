import { test } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import CertificatePage from '../pages/certificate/CertificatePage.js';

test('Certificate Module - User Requested Flow', async ({ page }) => {
    test.setTimeout(180000); // 3 mins

    const loginQaPage = new LoginQaPage(page);
    const certificatePage = new CertificatePage(page);

    // 1. Login
    await loginQaPage.login('rushikesh@gmail.com', 'Rd@12345');
    await page.getByTestId('menu-item-certificates').click(); // Initial Nav

    // 2. Nav to Approved -> Request New
    await certificatePage.navigateToApprovedCertificates();
    await certificatePage.clickRequestCertificate();
    await certificatePage.fillRequestDetails('ritesh cash payment', 'Cash');
    await certificatePage.submitRequest();

    // 3. Nav to View Requests -> Approve
    await certificatePage.navigateToViewCertificateRequests();
    await certificatePage.approveFirstRequest();

    // 4. Nav to Approved -> Download
    await certificatePage.navigateToApprovedCertificates();
    await certificatePage.downloadCertificateAC();
    await certificatePage.downloadReceiptAC();

    // 5. Request New (Again)
    await certificatePage.clickRequestCertificate();
    await certificatePage.fillRequestDetails('ritesh cash payment', 'Cash');
    await certificatePage.submitRequest();

    // 6. Nav to View Requests -> Reject
    await certificatePage.navigateToViewCertificateRequests();
    await certificatePage.rejectFirstRequest();

    // 7. Nav to Approved -> Download Receipt -> Delete
    // Note: User code navigated to Approved then clicked Download Receipt from 'Delete Download Receipt' cell?
    // This implies looking for a row that has Delete & Download Receipt.
    // We will just Download Receipt (First) and Delete (First) as per usual logic.
    await certificatePage.navigateToApprovedCertificates();
    await certificatePage.downloadReceiptAC();
    await certificatePage.deleteRequestAC();

    // 8. Request New (Again)
    await certificatePage.clickRequestCertificate();
    await certificatePage.fillRequestDetails('ritesh cash payment', 'Cash');
    await certificatePage.submitRequest();

    // 9. Nav to View Requests -> Filter Rejected -> Delete
    await certificatePage.navigateToViewCertificateRequests();
    await certificatePage.filterByStatus('Rejected');
    await certificatePage.deleteFirstRequestView();

    // 10. Filter Approved -> Downloads
    await certificatePage.filterByStatus('Approved');
    await certificatePage.downloadCertificateView();
    await certificatePage.downloadReceiptView();

    // 11. Reset Filter -> Delete
    await certificatePage.resetFilter();
    await certificatePage.deleteFirstRequestView();

    // 12. Create Request (View Tab)
    await certificatePage.createRequestFromView('Pratibha Nawale', 'ritesh cash payment');

    // 13. Approve
    await certificatePage.approveFirstRequest();

    // 14. Nav to Approved (Verify)
    await certificatePage.navigateToApprovedCertificates();

    console.log('✅ Certificate User Flow Completed');
});
