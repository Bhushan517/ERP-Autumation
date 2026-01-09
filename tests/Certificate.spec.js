import { test, expect } from '@playwright/test';

test('Certificate Module - Request, Approve, Reject, Download', async ({ page }) => {
    test.setTimeout(120000); // Increase timeout

    // Login
    await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
    await page.getByTestId('SI-username-input-password').fill('9699342811+2');
    await page.getByTestId('SI-password-input-password').fill('Ritesh@123');
    await page.getByTestId('SI-password-input-password').press('Enter');
    await page.waitForTimeout(2000);

    // Navigate to Certificates
    await page.getByTestId('menu-item-certificates').click();
    await page.waitForTimeout(800);
    await page.getByTestId('submenu-item-approved-certificates').click();
    await page.waitForTimeout(1500);

    // --- Scenario 1: Request & Approve ---
    await page.getByTestId('C-AC-Request').click();
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Search certificate' }).click();
    await page.getByText('ritesh cash payment', { exact: true }).click();
    await page.waitForTimeout(800);

    await page.getByRole('checkbox', { name: 'Cash' }).check();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Request' }).nth(1).click();
    await page.waitForTimeout(2000); // Wait after request

    await page.getByTestId('C-AC-Approve').click();
    await page.waitForTimeout(2000);

    // Download Certificate
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('row', { name: '1 Ritesh Cash Payment 09/01/' }).getByTestId('C-AC-Download-Certificate').click();
    const download = await downloadPromise;
    console.log('Downloaded Certificate:', await download.path());
    await page.waitForTimeout(1500);

    // Download Receipt (handling popup)
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('row', { name: '1 Ritesh Cash Payment 09/01/' }).getByTestId('C-AC-Download-Receipt').click();
    const page1 = await page1Promise;
    await page.waitForTimeout(1500);
    if (!page1.isClosed()) await page1.close(); // Close popup if open

    // Delete
    await page.getByRole('row', { name: '1 Ritesh Cash Payment 09/01/' }).getByTestId('C-AC-Delete').click();
    await page.waitForTimeout(1000);
    await page.getByTestId('common-confirm-confirm').click();
    await page.waitForTimeout(2000);


    // --- Scenario 2: Request & Reject ---
    await page.getByTestId('C-AC-Request').click();
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Search certificate' }).click();
    await page.getByText('ritesh cash payment', { exact: true }).click();
    await page.waitForTimeout(800);

    await page.getByRole('checkbox', { name: 'Cash' }).check();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Request' }).nth(1).click();
    await page.waitForTimeout(2000);

    await page.getByTestId('C-AC-Reject').click();
    await page.waitForTimeout(1000);
    await page.getByText('Reject', { exact: true }).click(); // Confirm Reject
    await page.waitForTimeout(2000);


    // --- Scenario 3: Request Again for View Requests ---
    await page.getByTestId('C-AC-Request').click();
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Search certificate' }).click();
    await page.getByText('ritesh cash payment', { exact: true }).click();
    await page.waitForTimeout(800);

    await page.getByRole('checkbox', { name: 'Cash' }).check();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Request' }).nth(1).click();
    await page.waitForTimeout(2000);

    await page.getByTestId('C-AC-Approve').click();
    await page.waitForTimeout(2000);


    // --- Verify in View Certificate Requests ---
    await page.getByTestId('submenu-item-view-certificate-requests').click();
    await page.waitForTimeout(1500);

    // Filter Approved
    await page.locator('.w-4').first().click();
    await page.waitForTimeout(500);
    await page.getByTestId('C-VCR-Certificates-Requests').getByText('Approved').click();
    await page.waitForTimeout(1500);

    const download1Promise = page.waitForEvent('download');
    await page.getByRole('row', { name: '1 ritesh cash payment 09/01/' }).getByTestId('C-VCR-Download-Certificate').click();
    const download1 = await download1Promise;
    await page.waitForTimeout(1000);

    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('row', { name: '1 ritesh cash payment 09/01/' }).getByTestId('C-VCR-Download-Receipt').click();
    const page2 = await page2Promise;
    await page.waitForTimeout(1000);
    if (!page2.isClosed()) await page2.close();

   
    await page.locator('.w-4 > path').first().click();
    await page.waitForTimeout(500);
    
       await page.locator('.w-4').first().click();
    await page.waitForTimeout(500);

    await page.getByText('Rejected').click();
    await page.waitForTimeout(1500);

   
    await page.getByRole('row', { name: '1 ritesh cash payment 09/01/' }).getByTestId('C-VCR-delete').click();
    await page.waitForTimeout(1000);
    await page.getByTestId('common-confirm-confirm').click();
    await page.waitForTimeout(2000);

    console.log('✅ Certificate Test Completed');
});
