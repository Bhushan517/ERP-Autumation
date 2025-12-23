class AdmissionPage {
  constructor(page) {
    this.page = page;
  }

  async clickAddNewButton() {
    await this.page.locator('.w-\\[40px\\]').first().click();
  }

  async selectTitle(title) {
    await this.page.getByRole('button', { name: 'Title' }).click();
    await this.page.getByText(title, { exact: true }).click();
  }

  async enterFirstName(firstName) {
    await this.page.getByRole('textbox', { name: 'Enter first name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter first name' }).fill(firstName);
  }

  async enterMiddleName() {
    await this.page.getByRole('textbox', { name: 'Enter middle name' }).click();
  }

  async enterLastName(lastName) {
    await this.page.getByRole('textbox', { name: 'Enter last name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter last name' }).fill(lastName);
  }

  async selectGender(gender) {
    await this.page.getByRole('button', { name: gender }).click();
    await this.page.locator('div').filter({ hasText: new RegExp(`^${gender}$`) }).nth(1).click();
  }

  async selectDate(day) {
    await this.page.getByRole('textbox', { name: 'Select date' }).click();
    await this.page.getByRole('button', { name: day }).nth(3).click();
  }

  async selectLocation(location) {
    await this.page.getByRole('textbox', { name: 'Select location' }).click();
    await this.page.getByText(location, { exact: true }).click();
  }

  async enterEmail(email) {
    await this.page.getByRole('textbox', { name: 'Enter email address' }).click();
    await this.page.getByRole('textbox', { name: 'Enter email address' }).fill(email);
  }

  async generateEmail() {
    await this.page.locator('.h-\\[40px\\].w-\\[60px\\] > .text-\\[var\\(--text-color\\)\\] > path').first().click();
    // await this.page.getByRole('button', { name: 'Generate' }).click();
  }

  async enterPhoneNumber(phoneNumber) {
    await this.page.getByRole('textbox', { name: 'Enter phone number' }).click();
    await this.page.getByRole('textbox', { name: 'Enter phone number' }).fill(phoneNumber);
  }

  async generatePhone() {
    await this.page.locator('.h-\\[40px\\].w-\\[60px\\] > .text-\\[var\\(--text-color\\)\\] > path').click();
    // await this.page.getByRole('button', { name: 'Generate' }).click();
  }

  async selectCourse(course) {
    await this.page.locator('.css-1995squ-control > .css-hlgwow > .css-15ol6m4').first().click();
    await this.page.getByRole('option', { name: course }).click();
  }

  async selectYear(year) {
    await this.page.locator('.css-1995squ-control > .css-hlgwow > .css-15ol6m4').first().click();
    await this.page.getByRole('option', { name: year }).click();
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save' }).first().click();
  }

  async clickStudentName(studentName) {
    await this.page.getByText(studentName).first().click();
  }

  async createAdmission(admissionData) {
    await this.clickAddNewButton();
    await this.selectTitle(admissionData.title);
    await this.enterFirstName(admissionData.firstName);
    await this.enterMiddleName();
    await this.enterLastName(admissionData.lastName);
    await this.selectGender(admissionData.gender);
    await this.selectDate(admissionData.date);
    await this.selectLocation(admissionData.location);
    await this.enterEmail(admissionData.email);
    await this.generateEmail();
    await this.enterPhoneNumber(admissionData.phoneNumber);
    await this.generatePhone();
    await this.selectCourse(admissionData.course);
    await this.selectYear(admissionData.year);
    await this.clickSave();
  }
}

export default AdmissionPage;
