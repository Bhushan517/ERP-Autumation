class FeesDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async clickFeesDetails() {
    await this.page.getByRole('link', { name: 'Fees Details' }).click();
  }

  async selectTemplate(templateName) {
    await this.page.getByRole('button', { name: 'Select Template' }).click();
    await this.page.getByText(templateName, { exact: true }).click();
  }

  async clickAdd() {
    await this.page.getByRole('button', { name: 'Add', exact: true }).click();
  }

  async clickAddInstallment() {
    await this.page.locator('.flex.items-center.gap-2.text-white').click();
  }

  async enterInstallmentAmount(amount) {
    await this.page.getByRole('textbox', { name: 'Enter Installment Amount' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Installment Amount' }).fill(amount);
  }

  async selectInstallmentDate(day) {
    await this.page.getByRole('textbox', { name: 'Select date' }).nth(1).click();
    await this.page.getByRole('button', { name: day }).click();
  }

  async clickAddComponent() {
    await this.page.getByRole('button', { name: 'Add Component' }).click();
    await this.page.locator('.text-white.p-1').click();
  }

  async saveAllInstallments() {
    await this.page.getByRole('button', { name: 'Save All Installments', exact: true  }).click();
  }

  async clickTemplate() {
    await this.page.getByText('Template', { exact: true }).click();
  }

  async clickInstallment() {
    await this.page.getByText('Installment', { exact: true }).click();
  }

  async clickGetPayment() {
    await this.page.getByRole('button', { name: 'Get Payment' }).click();
  }

  async selectPaymentMethod() {
    await this.page.getByText('CASHUPIManual PaymentReceived').click();
  }

  async savePayment() {
    await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
  }

  // async clickBack() {
  //   await this.page.getByRole('button', { name: 'Back' }).click();
  // }

  async addInstallment(amount, date) {
    await this.clickAddInstallment();
    await this.enterInstallmentAmount(amount);
    await this.selectInstallmentDate(date);
    await this.clickAddComponent();
    await this.saveAllInstallments();
  }

  async processPayment() {
    await this.clickTemplate();
    await this.clickInstallment();
    await this.clickGetPayment();
    await this.selectPaymentMethod();
    await this.savePayment();
  }
}

export default FeesDetailsPage;

