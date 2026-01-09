class FeesTemplatePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToFeesTemplate() {
    console.log('Navigating to Fees Template...');
    await this.page.getByTestId('submenu-item-hostel-fees-template').click();

    await this.page.waitForURL('**/hostel/fees/template**', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');

    await this.page.getByTestId('H-HFT-add-hostel-template-button').waitFor({
      state: 'visible',
      timeout: 10000
    });
    console.log('✅ Navigated to Fees Template');
  }

  async clickAddTemplate() {
    await this.page.getByTestId('H-HFT-add-hostel-template-button').click();

    await this.page.getByTestId('H-HFT-Add-name-input').waitFor({
      state: 'visible',
      timeout: 5000
    });
  }

  async fillTemplateName(name) {
    await this.page.getByTestId('H-HFT-Add-name-input').click();
    await this.page.getByTestId('H-HFT-Add-name-input').fill(name);
  }

  async selectPaymentType(type) {
    await this.page.getByTestId('H-HFT-Add-payment-types-dropdown').getByText('Select Payment Types').click();
    await this.page.locator('div').filter({ hasText: new RegExp(`^${type}$`) }).nth(1).click();
  }

  async closePaymentDropdown() {
    await this.page.locator('.w-4').first().click();
  }

  async clickAddComponent() {
    await this.page.getByTestId('H-HFT-Add-add-component-button').click();

    await this.page.getByTestId('H-HFT-Add-block-name-input-0').waitFor({
      state: 'visible',
      timeout: 5000
    });
  }

  async fillComponentDetails(index, name, amount) {
    await this.page.getByTestId(`H-HFT-Add-block-name-input-${index}`).click();
    await this.page.getByTestId(`H-HFT-Add-block-name-input-${index}`).fill(name);

    await this.page.getByTestId(`H-HFT-Add-block-Amount-input-${index}`).click();
    await this.page.getByTestId(`H-HFT-Add-block-Amount-input-${index}`).fill(amount);
  }

  async clickAddSubComponent(index) {
    await this.page.getByTestId(`H-HFT-Add-add-component-button-${index}`).click();
  }

  async clickSave() {
    await this.page.getByTestId('H-HFT-Add-save-button').click();


    await this.page.locator('.toast-success, [role="alert"]').waitFor({
      state: 'visible',
      timeout: 5000
    }).catch(() => {
      return this.page.getByTestId('H-HFT-Add-save-button').waitFor({
        state: 'hidden',
        timeout: 5000
      });
    });
  }

  async createTemplate(templateData) {
    console.log(`Creating fees template: ${templateData.name}`);
    await this.fillTemplateName(templateData.name);
    await this.selectPaymentType(templateData.paymentType);
    await this.closePaymentDropdown();
    await this.clickAddComponent();
    await this.fillComponentDetails(0, templateData.componentName, templateData.amount);
    await this.clickAddSubComponent(0);
    await this.clickSave();
    console.log(`✅ Fees template ${templateData.name} created successfully`);
  }
}

export default FeesTemplatePage;