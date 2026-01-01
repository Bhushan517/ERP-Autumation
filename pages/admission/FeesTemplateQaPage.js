import { expect } from '@playwright/test';

class FeesTemplateQaPage {
  constructor(page) {
    this.page = page;
  }

  async clickAdmissionAndFees() {
    await this.page.getByTestId('menu-item-admission-&-fees').click();
  }

  async clickFeesTemplate() {
    await this.page.getByTestId('submenu-item-fees-template').click();
  }

  async navigateToFeesTemplate() {
    await this.clickAdmissionAndFees();
    await this.page.waitForTimeout(1000);
    await this.clickFeesTemplate();
    await this.page.waitForTimeout(1500);
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

  async editFirstTemplate() {
    const firstRow = this.page.getByRole('row').nth(1);
    await expect(firstRow).toBeVisible();
    await firstRow.getByTestId('AI-FT-edit-icon').click();
    await this.page.waitForTimeout(500);
  }

  async saveTemplateAfterEdit() {
    await expect(this.page.getByTestId('AF-FT-save-button')).toBeVisible();
    await this.page.getByTestId('AF-FT-save-button').click();
    await this.page.waitForTimeout(1000);
  }

  async deleteFirstTemplate() {
    const firstRow = this.page.getByRole('row').nth(1);
    await expect(firstRow.getByTestId('AI-FT-delete-icon')).toBeVisible();
    await firstRow.getByTestId('AI-FT-delete-icon').click();
    await this.page.waitForTimeout(500);
  }

  async confirmDelete() {
    await expect(this.page.getByTestId('AF-FT-Delete-confirm')).toBeVisible();
    await this.page.getByTestId('AF-FT-Delete-confirm').click();
    await this.page.waitForTimeout(1500);
  }

  async closeModal() {
    await this.page.locator('.css-8mmkcg').click();
    await this.page.waitForTimeout(500);
  }
}

export default FeesTemplateQaPage;

