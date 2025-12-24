class AdmissionQaPage {
  constructor(page) {
    this.page = page;
  }

  async clickAddAdmissionButton() {
    await this.page.getByTestId('AF-add-admission-button').click();
  }

  async enterPRN(prn) {
    await this.page.getByTestId('AF-student-prn-input').click();
    await this.page.getByTestId('AF-student-prn-input').fill(prn);
  }

  async selectTitle(title) {
    await this.page.getByTestId('AF-student-title-dropdown').click();
    await this.page.getByText(title, { exact: true }).click();
  }

  async enterFirstName(firstName) {
    await this.page.getByTestId('AF-student-first-name').click();
    await this.page.getByTestId('AF-student-first-name').fill(firstName);
  }

  async enterLastName(lastName) {
    await this.page.getByTestId('AF-student-last-name').click();
    await this.page.getByTestId('AF-student-last-name').fill(lastName);
  }

  async selectGender(gender) {
    await this.page.getByTestId('AF-student-gender-dropdown').click();
    await this.page.getByTestId('AF-student-gender-options').locator('div').filter({ hasText: new RegExp(`^${gender}$`) }).click();
  }

  async selectDate(day) {
    await this.page.getByTestId('AF-student-dob-input').click();
    await this.page.getByRole('button', { name: day }).click();
  }

  async selectLocation(location) {
    await this.page.getByTestId('AF-student-location-textbox').click();
    await this.page.getByTestId('AF-student-location-input').getByText(location).click();
  }

  async enterEmail(email) {
    await this.page.getByTestId('student-email').click();
    await this.page.getByTestId('student-email').fill(email);
  }

  async generateEmail() {
    await this.page.locator('.h-\\[40px\\].w-\\[60px\\] > .text-\\[var\\(--text-color\\)\\] > path').first().click();
  }

  async enterPhone(phone) {
    await this.page.getByTestId('AF-student-phone').click();
    await this.page.getByTestId('AF-student-phone').fill(phone);
  }

  async generatePhone() {
    await this.page.locator('.h-\\[40px\\].w-\\[60px\\] > .text-\\[var\\(--text-color\\)\\] > path').click();
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
    await this.page.getByTestId('AF-student-save-button').click();
  }

  async clickStudentName(studentName) {
    await this.page.getByText(studentName).first().click();
  }

  async createAdmission(admissionData) {
    await this.clickAddAdmissionButton();
    await this.enterPRN(admissionData.prn);
    await this.selectTitle(admissionData.title);
    await this.enterFirstName(admissionData.firstName);
    await this.enterLastName(admissionData.lastName);
    await this.selectGender(admissionData.gender);
    await this.selectDate(admissionData.date);
    await this.selectLocation(admissionData.location);
    await this.enterEmail(admissionData.email);
    await this.generateEmail();
    await this.enterPhone(admissionData.phoneNumber);
    await this.generatePhone();
    await this.selectCourse(admissionData.course);
    await this.selectYear(admissionData.year);
    await this.clickSave();
  }
}

export default AdmissionQaPage;
