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
    await this.page.getByRole('button', { name: day }).click();
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

  async processPayment(templateName, index = '0-0') {
    await this.clickTemplate(templateName);
    await this.clickInstallment();
    await this.clickGetPayment(index);
    await this.savePayment();
  }
}

export default FeesDetailsQaPage;

