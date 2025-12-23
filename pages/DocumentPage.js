class DocumentPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToDocumentModule() {
    await this.page.getByRole('button', { name: 'Document' }).click();
  }

  async navigateToDocumentConfiguration() {
    await this.page.getByRole('link', { name: 'Document Configuration' }).click();
  }

  async addCategory(categoryData) {
    await this.page.getByRole('button', { name: 'Add Category' }).click();
    await this.page.getByRole('textbox', { name: 'Category name', exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Category name', exact: true }).fill(categoryData.name);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async navigateToDocumentType() {
    await this.page.getByRole('link', { name: 'Document Type' }).click();
  }

  async addDocumentType(documentTypeData) {
    await this.page.getByRole('button', { name: 'Add Document' }).click();

    await this.page.getByRole('textbox', { name: 'Enter document name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter document name' }).fill(documentTypeData.name);

    await this.page.getByRole('textbox', { name: 'Search category' }).click();
    await this.page.getByText(documentTypeData.categoryName).click();

    await this.page.getByRole('textbox', { name: 'Select format' }).click();
    await this.page.getByRole('listitem').filter({ hasText: new RegExp(`^${documentTypeData.format}$`) }).click();

    if (documentTypeData.isExpiryRequired) {
      await this.page.getByRole('checkbox', { name: 'Is expiry required ?' }).check();
    }

    await this.page.getByRole('textbox', { name: 'Enter warning days' }).click();
    await this.page.getByRole('textbox', { name: 'Enter warning days' }).fill(documentTypeData.warningDays);

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async navigateToRoleMapping() {
    await this.page.getByRole('link', { name: 'Role Mapping' }).click();
  }

  async addRoleMapping(roleMappingData) {
    await this.page.getByRole('button', { name: 'Add Role' }).click();

    await this.page.getByRole('textbox', { name: 'Search role' }).click();
    await this.page.getByRole('listitem').filter({ hasText: new RegExp(`^${roleMappingData.role}$`) }).click();

    await this.page.getByRole('textbox', { name: 'Search document type' }).click();
    await this.page.getByText(roleMappingData.documentType, { exact: true }).click();

    if (roleMappingData.isMandatory) {
      await this.page.locator('#isMandatory').check();
    }

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async navigateToDocuments() {
    await this.page.getByRole('link', { name: 'Documents', exact: true }).click();
  }

  async uploadDocument(uploadData) {
    await this.page.getByRole('button', { name: 'Upload' }).nth(1).click();

    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(uploadData.filePath);

    await this.page.getByRole('textbox', { name: 'Select date' }).first().click();
    await this.page.getByRole('button', { name: uploadData.startDay }).nth(2).click();

    await this.page.getByRole('textbox', { name: 'Select date' }).nth(1).click();
    await this.page.getByRole('button', { name: uploadData.endDay }).click();

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async verifyDocumentsFlow() {
    await this.page.getByRole('button', { name: 'View' }).click();
    await this.page.getByRole('button', { name: '×' }).click();

    await this.page.getByRole('link', { name: 'Document Verification' }).click();
    await this.page.getByRole('link', { name: 'All documents' }).click();
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.page.locator('.absolute.top-6').click();

    await this.page.getByRole('link', { name: 'Pending documents' }).click();
    await this.page.getByRole('link', { name: 'View Documents' }).click();
    await this.page.getByRole('button', { name: 'View' }).first().click();
    await this.page.locator('.absolute.top-4').click();
  }
}

export default DocumentPage;

