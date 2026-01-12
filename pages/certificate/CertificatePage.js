class CertificatePage {
    constructor(page) {
        this.page = page;
    }

    async navigateToCertificates() {
        console.log('Navigating to Certificates...');
        await this.page.getByTestId('menu-item-certificates').click();
        await this.page.waitForTimeout(2000);
    }

    async navigateToApprovedCertificates() {
        console.log('Navigating to Approved Certificates...');
        await this.page.getByTestId('submenu-item-approved-certificates').click();
        await this.page.waitForTimeout(2000);
    }

    async navigateToViewCertificateRequests() {
        console.log('Navigating to View Certificate Requests...');
        await this.page.getByTestId('submenu-item-view-certificate-requests').click();
        await this.page.waitForTimeout(2000);
    }

    // --- Active (Approved) Tab Actions ---

    async clickRequestCertificate() {
        console.log('Clicking Request Certificate (AC)...');
        await this.page.getByTestId('C-AC-Request').click();
        await this.page.waitForTimeout(2000);
    }

    async fillRequestDetails(certName, mode) {
        console.log(`Filling request details: ${certName}, ${mode}`);
        await this.page.getByRole('textbox', { name: 'Search certificate' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText(certName, { exact: true }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('checkbox', { name: mode }).check();
        await this.page.waitForTimeout(1000);
    }

    async submitRequest() {
        console.log('Submitting request...');
        await this.page.getByRole('button', { name: 'Request' }).nth(1).click();
        await this.page.waitForTimeout(3000);
    }

    async downloadCertificateAC() {
        console.log('Downloading Certificate (AC - First Row)...');
        const downloadPromise = this.page.waitForEvent('download');
        // Usng first() row's download button
        await this.page.getByTestId('C-AC-Download-Certificate').first().click();
        const download = await downloadPromise;
        console.log('✅ Downloaded:', await download.path());
        await this.page.waitForTimeout(3000);
    }

    async downloadReceiptAC() {
        console.log('Downloading Receipt (AC - First Row)...');
        const pagePromise = this.page.waitForEvent('popup');
        await this.page.getByTestId('C-AC-Download-Receipt').first().click();
        const page = await pagePromise;
        await this.page.waitForTimeout(1000);
        if (!page.isClosed()) await page.close();
        console.log('✅ Receipt verified');
        await this.page.waitForTimeout(2000);
    }

    async deleteRequestAC() {
        console.log('Deleting Request (AC - First Row)...');
        // User code click 'C-AC-Delete' directly (implies it is standalone or first)
        await this.page.getByTestId('C-AC-Delete').first().click();
        await this.page.waitForTimeout(2000);
        await this.page.getByTestId('common-confirm-confirm').click();
        console.log('✅ Request Deleted');
        await this.page.waitForTimeout(3000);
    }

    // --- View Requests Tab Actions ---

    async approveFirstRequest() {
        console.log('Approving First Request (View)...');
        await this.page.getByTestId('C-VCR-Approve').first().click();
        await this.page.waitForTimeout(3000);
    }

    async rejectFirstRequest() {
        console.log('Rejecting First Request (View)...');
        await this.page.getByTestId('C-VCR-Reject').first().click();
        await this.page.waitForTimeout(2000);
        // User code: getByRole('button', { name: 'Reject' }).nth(1)
        await this.page.getByRole('button', { name: 'Reject' }).last().click();
        await this.page.waitForTimeout(3000);
    }

    async deleteFirstRequestView() {
        console.log('Deleting First Request (View)...');
        await this.page.getByTestId('C-VCR-delete').first().click();
        await this.page.waitForTimeout(2000);
        await this.page.getByTestId('common-confirm-confirm').click();
        await this.page.waitForTimeout(3000);
    }

    async filterByStatus(status) {
        console.log(`Filtering by status: ${status}`);
        await this.page.locator('#upload-type-dropdown').click();
        await this.page.waitForTimeout(1000);
        // Be careful with 'Approved' vs 'Rejected' text locator matching multiple
        // User code uses specific locator logic: getByTestId('C-VCR-Certificates-Requests').getByText('Approved')
        if (status === 'Approved') {
            await this.page.getByTestId('C-VCR-Certificates-Requests').getByText('Approved').click();
        } else {
            await this.page.getByText(status).click();
        }
        await this.page.waitForTimeout(2000);
    }

    async resetFilter() {
        console.log('Resetting filter (.w-4)...');
        await this.page.locator('.w-4').first().click();
        await this.page.waitForTimeout(2000);
    }

    async downloadCertificateView() {
        console.log('Downloading Certificate (View - First Row)...');
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByTestId('C-VCR-Download-Certificate').first().click();
        const download = await downloadPromise;
        console.log('✅ Downloaded:', await download.path());
        await this.page.waitForTimeout(3000);
    }

    async downloadReceiptView() {
        console.log('Downloading Receipt (View - First Row)...');
        const pagePromise = this.page.waitForEvent('popup');
        await this.page.getByTestId('C-VCR-Download-Receipt').first().click();
        const page = await pagePromise;
        await this.page.waitForTimeout(1000);
        if (!page.isClosed()) await page.close();
        await this.page.waitForTimeout(2000);
    }

    // --- Create Request From View Tab (New) ---
    async createRequestFromView(user, certName) {
        console.log('Creating Request from View Tab...');
        await this.page.getByTestId('C-VCR-Request').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('C-VCR-RC-Select-User').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText(user).click();
        await this.page.waitForTimeout(1000);

        await this.page.getByTestId('C-VCR-RC-Certificate').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText(certName).click();
        await this.page.waitForTimeout(1000);

        await this.page.getByTestId('C-VCR-RC-Cash').check();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('C-VCR-RC-save-button').click();
        await this.page.waitForTimeout(3000);
    }
}

export default CertificatePage;
