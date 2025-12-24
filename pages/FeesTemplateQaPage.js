class FeesTemplateQaPage {
  constructor(page) {
    this.page = page;
  }

  async clickFeesTemplate() {
    await this.page.getByRole('link', { name: 'Fees Template', exact: true }).click();
  }

  async clickAddNew() {
    await this.page.getByTestId('AI-FT-add-new').click();
  }

  async enterTemplateName(name) {
    await this.page.getByTestId('AF-FT-template-name-input').click();
    await this.page.getByTestId('AF-FT-template-name-input').fill(name);
  }

  async clickAddComponent() {
    await this.page.getByTestId('AF-FT-add-component-btn').click();
  }

  async enterComponentName(name) {
    await this.page.getByTestId('AF-FT-component-name').click();
    await this.page.getByTestId('AF-FT-component-name').fill(name);
  }

  async enterComponentAmount(amount) {
    await this.page.getByTestId('AF-FT-component-amount').click();
    await this.page.getByTestId('AF-FT-component-amount').fill(amount);
  }

  async saveComponent() {
    await this.page.getByTestId('AF-FT-save-component').click();
  }

  async saveTemplate() {
    await this.page.getByTestId('AF-FT-save-button').click();
  }

  async createTemplate(templateData) {
    await this.clickAddNew();
    await this.enterTemplateName(templateData.name);
    await this.clickAddComponent();
    await this.enterComponentName(templateData.componentName);
    await this.enterComponentAmount(templateData.amount);
    await this.saveTemplate();
    await this.saveTemplate();
    await this.saveComponent();
    await this.saveTemplate();
  }
}

export default FeesTemplateQaPage;

