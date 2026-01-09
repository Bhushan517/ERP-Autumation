class MembershipFeesDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToFeesDetails() {
    console.log('Navigating to Fees Details...');
    await this.page.getByRole('link', { name: 'Fees Details' }).click();
    await this.page.waitForTimeout(1000);
  }

  async searchAndSelectTemplate(templateName) {
    await this.page.getByTestId('H-M-FD-Template-Search-Toggle').click();
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('H-M-FD-Template-Search-Input').fill('bhushan');
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('H-M-FD-Template-Option-0').getByText('bhushan raut').click();
    await this.page.waitForTimeout(500);
    console.log(`✅ Template '${templateName}' selected`);

  }

  async addTemplate() {
    await this.page.getByTestId('H-M-FD-Template-Add-Button').click();
    await this.page.waitForTimeout(1000);
    console.log('Template added');
  }

  async addInstallment(amount, day) {
    await this.page.getByTestId('H-M-FD-FeeTemplate-Add-Installment-Button').click();
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('H-M-FD-FeeTemplate-Installment-Amount-Input-0').click();
    await this.page.getByTestId('H-M-FD-FeeTemplate-Installment-Amount-Input-0').fill(amount);
    await this.page.getByRole('textbox', { name: 'Select date' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: day }).click();
    await this.page.waitForTimeout(500);
  }

  async saveAll() {
    await this.page.getByTestId('H-M-FD-FeeTemplate-Save-All-Button').click();
    await this.page.waitForTimeout(2000);
  }

  async expandInstallment() {
    const chevron = this.page.locator('.lucide.lucide-chevron-down').first();
    await chevron.waitFor({ state: 'visible', timeout: 5000 });
    await chevron.click();
    await this.page.waitForTimeout(1000);
  }

  async getPayment(installmentIndex = 0, paymentIndex = 0) {
    const paymentButton = this.page.getByTestId(`H-M-FD-Get-Payment-Button-${installmentIndex}-${paymentIndex}`);
    await paymentButton.waitFor({ state: 'visible', timeout: 10000 });
    await paymentButton.click();
    await this.page.waitForTimeout(1000);
  }

  async processManualPayment(transactionId, provider, day) {
    await this.page.getByRole('checkbox', { name: 'Manual Payment' }).check();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('textbox', { name: 'Select date' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: day }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('textbox', { name: 'Enter Transaction ID' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Transaction ID' }).fill(transactionId);
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Select Provider' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByText(provider, { exact: true }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Manual payment processed successfully');
  }

  async collapseInstallment() {
    await this.page.locator('.ml-2 > .lucide').first().click();
    await this.page.locator('.lucide.lucide-chevron-up').click();
    await this.page.waitForTimeout(500);
  }
}

export default MembershipFeesDetailsPage;

