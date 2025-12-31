class FeesTemplatePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToFeesTemplate() {
    await this.page.getByTestId('submenu-item-hostel-fees-template').click();
    await this.page.waitForTimeout(1000);
  }

  async clickAddTemplate() {
    await this.page.getByTestId('H-HFT-add-hostel-template-button').click();
    await this.page.waitForTimeout(500);
  }

  async enterTemplateName(templateName) {
    await this.page.getByTestId('H-HFT-Add-name-input').click();
    await this.page.getByTestId('H-HFT-Add-name-input').fill(templateName);
    await this.page.waitForTimeout(300);
  }

  async selectPaymentType(paymentType) {
    await this.page.getByTestId('H-HFT-Add-payment-types-dropdown').getByText('Select Payment Types').click();
    await this.page.waitForTimeout(500);
    await this.page.locator('div').filter({ hasText: new RegExp(`^${paymentType}$`) }).nth(1).click();
    await this.page.waitForTimeout(500);
  }

  async toggleAllowInstallments() {
    await this.page.locator('.w-4').first().click();
    await this.page.waitForTimeout(300);
  }

  async clickAddComponent() {
    await this.page.getByTestId('H-HFT-Add-add-component-button').click();
    await this.page.waitForTimeout(500);
  }

  async enterComponentName(index, componentName) {
    await this.page.getByTestId(`H-HFT-Add-block-name-input-${index}`).click();
    await this.page.getByTestId(`H-HFT-Add-block-name-input-${index}`).fill(componentName);
    await this.page.waitForTimeout(300);
  }

  async enterComponentAmount(index, amount) {
    await this.page.getByTestId(`H-HFT-Add-block-Amount-input-${index}`).click();
    await this.page.getByTestId(`H-HFT-Add-block-Amount-input-${index}`).fill(amount);
    await this.page.waitForTimeout(300);
  }

  async clickAddSubComponent(index) {
    await this.page.getByTestId(`H-HFT-Add-add-component-button-${index}`).click();
    await this.page.waitForTimeout(500);
  }

  async clickSave() {
    await this.page.getByTestId('H-HFT-Add-save-button').click();
    await this.page.waitForTimeout(1500);
  }

  async createTemplate(templateData) {
    await this.enterTemplateName(templateData.name);
    await this.selectPaymentType(templateData.paymentType);
    await this.toggleAllowInstallments();
    await this.clickAddComponent();
    await this.enterComponentName(0, templateData.componentName);
    await this.enterComponentAmount(0, templateData.amount);
    if (templateData.addSubComponent) {
      await this.clickAddSubComponent(0);
    }
    await this.clickSave();
  }
}

export default FeesTemplatePage;

