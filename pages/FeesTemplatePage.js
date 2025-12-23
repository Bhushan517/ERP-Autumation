class FeesTemplatePage {
  constructor(page) {
    this.page = page;
  }

  async clickFeesTemplate() {
    await this.page.getByRole('link', { name: 'Fees Template', exact: true }).click();
  }

  async clickAddNew() {
    await this.page.getByRole('button', { name: 'Add New', exact: true  }).click();
  }

  async enterTemplateName(name) {
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
  }

  async selectPaymentTypesDropdown() {
    await this.page.locator('.css-vua7lq-control > .css-1wy0on6 > .h-4').click();
    await this.page.locator('.css-s9vmqc-singleValue').click();
  }

  async selectPaymentTypesCheckbox() {
    await this.page.locator('.w-4.h-4.ml-2').click();
    await this.page.getByRole('checkbox').nth(1).check();
    await this.page.locator('.w-4.h-4.ml-2').click();
    await this.page.locator('.w-8').click();
  }

  async enterPaymentTypeName(name) {
    await this.page.getByRole('textbox', { name: 'Name' }).nth(1).click();
    await this.page.getByRole('textbox', { name: 'Name' }).nth(1).fill(name);
  }

  async enterAmount(amount) {
    await this.page.getByRole('textbox', { name: 'Amount' }).click();
    await this.page.getByRole('textbox', { name: 'Amount' }).fill(amount);
  }

  async clickAddPaymentType() {
    await this.page.locator('.bg-\\[var\\(--submit-button\\)\\].w-8.h-8.flex.items-center.justify-center.rounded-md.hover\\:bg-opacity-80').first().click();
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async clickAddType() {
    await this.page.getByRole('button', { name: 'Add Type', exact: true  }).click();
  }

  async enterType(type) {
    await this.page.getByRole('textbox', { name: 'Type' }).click();
    await this.page.getByRole('textbox', { name: 'Type' }).fill(type);
  }

  async saveTemplate() {
    await this.page.locator('.w-\\[35px\\]').click();
    await this.page.getByRole('button', { name: 'Admission & Fees' }).click();
  }

  async createTemplate(templateData) {
    await this.clickAddNew();
    await this.selectPaymentTypesDropdown();
    await this.enterTemplateName(templateData.name);
    await this.selectPaymentTypesCheckbox();
    await this.enterPaymentTypeName(templateData.paymentTypeName);
    await this.enterAmount(templateData.amount);
    await this.clickAddPaymentType();
    await this.clickSave();
    await this.clickAddType();
    await this.enterType(templateData.type);
    await this.saveTemplate();
  }
}

export default FeesTemplatePage;

