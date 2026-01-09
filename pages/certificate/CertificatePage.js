class CertificatePage {
    constructor(page) {
        this.page = page;
    }

    async navigateToCertificates() {
        await this.page.getByTestId('menu-item-certificates').click();
        await this.page.waitForTimeout(1000);
    }

    async navigateToApprovedCertificates() {
        await this.page.getByTestId('submenu-item-approved-certificates').click();
        await this.page.waitForTimeout(1500);
    }

    async navigateToViewCertificateRequests() {
        await this.page.getByTestId('submenu-item-view-certificate-requests').click();
        await this.page.waitForTimeout(1500);
    }

    async clickRequestCertificate() {
        await this.page.getByTestId('C-AC-Request').click();
        await this.page.waitForTimeout(1000);
    }

    async searchAndSelectCertificate(certName) {
        await this.page.getByRole('textbox', { name: 'Search certificate' }).click();
        await this.page.waitForTimeout(500);
        await this.page.getByText(certName, { exact: true }).click();
        await this.page.waitForTimeout(1000);
    }

    async selectPaymentMode(mode) {
        await this.page.getByRole('checkbox', { name: mode }).check();
        await this.page.waitForTimeout(500);
    }

    async submitRequest() {
        await this.page.getByRole('button', { name: 'Request' }).nth(1).click();
        await this.page.waitForTimeout(2000);
    }

    async approveRequest() {
        await this.page.getByTestId('C-AC-Approve').click();
        await this.page.waitForTimeout(2000);
    }

    async rejectRequest() {
        await this.page.getByTestId('C-AC-Reject').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText('Reject', { exact: true }).click();
        await this.page.waitForTimeout(2000);
    }

    async downloadCertificate(rowName) {
        const downloadPromise = this.page.waitForEvent('download');
        // Using first() for safety as seen in previous fix
        await this.page.getByRole('row', { name: rowName }).first().getByTestId('C-AC-Download-Certificate').click();
        const download = await downloadPromise;
        console.log('Downloaded Certificate:', await download.path());
        await this.page.waitForTimeout(1500);
    }

    async downloadReceipt(rowName) {
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('row', { name: rowName }).first().getByTestId('C-AC-Download-Receipt').click();
        const page1 = await page1Promise;
        await this.page.waitForTimeout(1500);
        if (!page1.isClosed()) await page1.close();
    }

    async deleteRequest(rowName) {
        await this.page.getByRole('row', { name: rowName }).first().getByTestId('C-AC-Delete').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('common-confirm-confirm').click();
        await this.page.waitForTimeout(2000);
    }

    async filterRequests(status) {
        // Ensure dropdown is open. 
        // We know the container 'C-VCR-Certificates-Requests' contains the list if open? 
        // Or we click the toggle first.

        // Toggle dropdown
        const filterIcon = this.page.locator('.flex.items-center.cursor-pointer.justify-between').first();
        await filterIcon.click(); // Always click to toggle? Assumes it starts closed. 
        // If we just want to switch, we might need to check if list is visible.

        await this.page.waitForTimeout(1000);

        // Check if list is visible, if not, click again (maybe we closed it)
        const listContainer = this.page.getByTestId('C-VCR-Certificates-Requests'); // Check if this is the container
        // Actually, if 'C-VCR-Certificates-Requests' is the wrapper of the whole area, it's always visible.
        // Let's just try to click the status.
        // If status is not visible, maybe we need to click toggle.

        const statusItem = this.page.getByTestId('C-VCR-Certificates-Requests').getByText(status);
        if (!(await statusItem.isVisible())) {
            console.log('Status item hidden, toggling dropdown again...');
            await filterIcon.click();
            await this.page.waitForTimeout(1000);
        }

        await statusItem.click();
        await this.page.waitForTimeout(1500);
    }

    // resetFilter removed/integrated into logic if needed, but keeping for now as simple toggle
    async resetFilter() {
        const filterIcon = this.page.locator('.flex.items-center.cursor-pointer.justify-between').first();
        await filterIcon.click();
        await this.page.waitForTimeout(500);
    }

    async downloadCertificateFromView(rowName) {
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('row', { name: rowName }).first().getByTestId('C-VCR-Download-Certificate').click();
        const download = await downloadPromise;
        console.log('Downloaded Certificate (View):', await download.path());
        await this.page.waitForTimeout(1500);
    }

    async downloadReceiptFromView(rowName) {
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('row', { name: rowName }).first().getByTestId('C-VCR-Download-Receipt').click();
        const page1 = await page1Promise;
        await this.page.waitForTimeout(1500);
        if (!page1.isClosed()) await page1.close();
    }

    async deleteFromViewRequests(rowName) {
        await this.page.getByRole('row', { name: rowName }).first().getByTestId('C-VCR-delete').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('common-confirm-confirm').click();
        await this.page.waitForTimeout(2000);
    }
}

export default CertificatePage;
