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
    await this.page.getByTestId('AI-FD-template-option-0').click();
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
    
    // Check if save default button exists
    const saveDefaultBtn = this.page.getByTestId('AI-FD-save-default');
    const isSaveDefaultVisible = await saveDefaultBtn.isVisible().catch(() => false);
    
    if (isSaveDefaultVisible) {
      await saveDefaultBtn.click();
    }
  }

  async clickTemplate(templateName) {
    await this.page.locator('.lucide.lucide-chevron-down').first().click()
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

  /**
   * Add installment - automatically handles templates with/without installment option
   * @param {string} amount - Installment amount
   * @param {string} date - Due date
   */
  async addInstallment(amount, date) {
    // Check if "Add Installment" button exists (some templates don't allow installments)
    const addInstallmentBtn = this.page.getByTestId('AI-FD-add-installment');
    const canCreateInstallment = await addInstallmentBtn.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (canCreateInstallment) {
      // Template allows installments - create custom installment
      console.log('✅ Template allows installments - creating custom installment');
      await this.clickAddInstallment();
      await this.enterInstallmentAmount(amount);
      await this.selectInstallmentDate(date);
      await this.saveInstallments();
    } else {
      // Template doesn't allow installments - use default save
      console.log('⏭️ Template does not allow installments - using default save');
      const saveDefaultBtn = this.page.getByTestId('AI-FD-save-default');
      const isSaveDefaultVisible = await saveDefaultBtn.isVisible().catch(() => false);
      
      if (isSaveDefaultVisible) {
        await saveDefaultBtn.click();
      } else {
        console.log('⚠️ No save option found - template might be auto-saved');
      }
    }
  }

  /**
   * Process payment - automatically handles cash or manual payment based on availability
   */
  async processPayment(templateName, index = '0-0', onlinePaymentData = {}) {
    await this.clickTemplate(templateName);
    await this.clickInstallment();
    await this.clickGetPayment(index);

    await this.page.getByText('Payment').first().waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);

    const cashCheckbox = this.page.getByTestId('AI-PAY-method-cash').first();
    const isCashAvailable = await cashCheckbox.isVisible().catch(() => false);

    if (isCashAvailable) {
      console.log('✅ Cash payment available - using cash');
      await cashCheckbox.scrollIntoViewIfNeeded();
      await cashCheckbox.check();
    } else {
      console.log('❌ Cash not available - using manual payment');
      const manualCheckbox = this.page.locator('input[type="checkbox"]').filter({ 
        has: this.page.locator('text=Manual Payment') 
      }).first();
      await manualCheckbox.scrollIntoViewIfNeeded();
      await manualCheckbox.check();
    }

    await this.savePayment();
  }
}

export default FeesDetailsQaPage;