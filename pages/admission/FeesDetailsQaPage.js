// FeesDetailsQaPage.js
class FeesDetailsQaPage {
  constructor(page) {
    this.page = page;
  }

  async clickFeesDetails() {
    await this.page.getByTestId('EA-tab-fees-details').click();
  }

  async selectTemplate(templateName) {
    await this.page.getByTestId('AI-FD-template-select').click();
    await this.page.getByText(templateName).click();
  }

  async clickAddTemplate() {
    await this.page.getByTestId('AI-FD-add-template').click();
  }

  async clickAddInstallment() {
    await this.page.getByTestId('AI-FD-add-installment').click();
  }

  async enterInstallmentAmount(amount) {
    await this.page.getByTestId('AI-FD-installment-amount-input').click();
    await this.page.getByTestId('AI-FD-installment-amount-input').fill(amount);
  }

 async selectInstallmentDate(day) {
  await this.page.getByTestId('AI-FD-installment-dueon').click();
  await this.page.getByRole('button', { name: day, exact: true }).click();
}

  async saveInstallments() {
    await this.page.getByTestId('AI-FD-save-installments').click();
  }

  async clickTemplate(templateName) {
    await this.page.getByText(templateName, { exact: true }).click();
  }

  async clickInstallment() {
    await this.page.getByText('Installment', { exact: true }).click();
  }

  async clickGetPayment(index = '0-0') {
    await this.page.getByTestId(`AI-FD-get-payment-btn-${index}`).click();
  }

  async savePayment() {
    await this.page.getByTestId('AI-PAY-save-btn').first().click();
  }

  async clickBack() {
    await this.page.getByTestId('EA-back-button').click();
  }

  async addInstallment(amount, date) {
    await this.clickAddInstallment();
    await this.enterInstallmentAmount(amount);
    await this.selectInstallmentDate(date);
    await this.saveInstallments();
  }

  /**
   * Process payment - automatically handles cash or online payment based on availability
   * @param {string} templateName - Template name to click
   * @param {string} index - Payment button index (default: '0-0')
   * @param {Object} onlinePaymentData - Data for online payment (transactionId, date, provider)
   */
  async processPayment(templateName, index = '0-0', onlinePaymentData = {}) {
    await this.clickTemplate(templateName);
    await this.clickInstallment();
    await this.clickGetPayment(index);

    // Wait for payment modal to appear
    await this.page.getByText('Payment').first().waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);

    // Check if cash payment option is available
    const cashCheckbox = this.page.getByTestId('AI-PAY-method-cash').first();
    const isCashAvailable = await cashCheckbox.isVisible().catch(() => false);

    if (isCashAvailable) {
      // Use cash payment
      console.log('Cash payment option available - using cash');
      await cashCheckbox.scrollIntoViewIfNeeded();
      await cashCheckbox.check();
    } else {
      // Use online payment
      console.log('Cash payment not available - using online payment');
      const onlineCheckbox = this.page.getByTestId('AI-PAY-method-online').first();
      await onlineCheckbox.scrollIntoViewIfNeeded();
      await onlineCheckbox.check();

      // Fill online payment details
      await this.page.getByTestId('AI-PAY-ONLINE-date-picker').click();
      await this.page.getByRole('button', { name: onlinePaymentData.date, exact: true }).click();
      
      await this.page.getByTestId('AI-PAY-ONLINE-transaction-id').click();
      await this.page.getByTestId('AI-PAY-ONLINE-transaction-id').fill(onlinePaymentData.transactionId);
      
      await this.page.getByRole('button', { name: 'Select Provider' }).click();
      await this.page.getByText(onlinePaymentData.provider).click();
    }

    // Save payment
    await this.savePayment();
  }
}

export default FeesDetailsQaPage;