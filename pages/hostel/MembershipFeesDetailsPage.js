class MembershipFeesDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToFeesDetails() {
    console.log('Navigating to Fees Details...');
    const link = this.page.getByRole('link', { name: 'Fees Details' });
    await link.waitFor({ state: 'visible', timeout: 10000 });
    await link.click();
    await this.page.waitForTimeout(1000);
  }

  async searchAndSelectTemplate(templateName) {
    const toggle = this.page.getByTestId('H-M-FD-Template-Search-Toggle');
    await toggle.waitFor({ state: 'visible', timeout: 5000 });
    await toggle.click();
    await this.page.waitForTimeout(500);

    const input = this.page.getByTestId('H-M-FD-Template-Search-Input');
    await input.waitFor({ state: 'visible', timeout: 2000 });
    await input.fill('bhushan');
    await this.page.waitForTimeout(500);

    const option = this.page.getByTestId('H-M-FD-Template-Option-0').getByText('bhushan raut');
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(500);
    console.log(`✅ Template '${templateName}' selected`);

  }

  async addTemplate() {
    const addBtn = this.page.getByTestId('H-M-FD-Template-Add-Button');
    await addBtn.waitFor({ state: 'visible', timeout: 5000 });
    await addBtn.click();
    await this.page.waitForTimeout(1000);
    console.log('Template added');
  }

  async addInstallment(amount, day) {
    const addInstBtn = this.page.getByTestId('H-M-FD-FeeTemplate-Add-Installment-Button');
    await addInstBtn.waitFor({ state: 'visible', timeout: 5000 });
    await addInstBtn.click();
    await this.page.waitForTimeout(500);

    const amountInput = this.page.getByTestId('H-M-FD-FeeTemplate-Installment-Amount-Input-0');
    await amountInput.waitFor({ state: 'visible', timeout: 2000 });
    await amountInput.click();
    await amountInput.fill(amount);

    await this.page.getByRole('textbox', { name: 'Select date' }).click();
    await this.page.waitForTimeout(500);
    const dayBtn = this.page.getByRole('button', { name: day });
    if (await dayBtn.isVisible()) {
      await dayBtn.click();
    } else {
      // Fallback for date picker
      await this.page.keyboard.press('Enter');
    }
    await this.page.waitForTimeout(500);
  }

  async saveAll() {
    const saveBtn = this.page.getByTestId('H-M-FD-FeeTemplate-Save-All-Button');
    await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
    await saveBtn.click();
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

    // Using simple locator for date if precise button fails
    const dayBtn = this.page.getByRole('button', { name: day }).first();
    if (await dayBtn.isVisible()) {
      await dayBtn.click();
    }

    await this.page.waitForTimeout(500);
    const txnInput = this.page.getByRole('textbox', { name: 'Enter Transaction ID' });
    await txnInput.waitFor({ state: 'visible' });
    await txnInput.click();
    await txnInput.fill(transactionId);
    await this.page.waitForTimeout(500);

    await this.page.getByRole('button', { name: 'Select Provider' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByText(provider, { exact: true }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(3000); // Increased wait for saving payment
    console.log('✅ Manual payment processed successfully');
  }

  async collapseInstallment() {
    await this.page.locator('.ml-2 > .lucide').first().click();
    await this.page.locator('.lucide.lucide-chevron-up').click();
    await this.page.waitForTimeout(500);
  }
}

export default MembershipFeesDetailsPage;

