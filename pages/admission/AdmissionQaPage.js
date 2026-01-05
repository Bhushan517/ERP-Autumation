import { expect } from '@playwright/test';

class AdmissionQaPage {
  constructor(page) {
    this.page = page;
  }


  async clickAdmissionAndFees() {
    await this.page.getByTestId('menu-item-admission-&-fees').click();
  }

  async clickAdmissions() {
    await this.page.getByTestId('submenu-item-admissions').click();
  }

  async clickAddAdmissionButton() {
    await this.page.getByTestId('AF-add-admission-button').click();
  }

  async enterPRN(prn) {
    const prnField = this.page.getByTestId('AF-student-prn-input');
    const isPRNVisible = await prnField.isVisible().catch(() => false);

    if (isPRNVisible) {
      console.log('PRN field visible - filling PRN number');
      await prnField.click();
      await prnField.fill(prn);
    } else {

      console.log('PRN field hidden - skipping PRN entry');
    }
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
    await this.page.waitForTimeout(500);
    const dateField = this.page.getByTestId('AF-student-dob-field');
    const dateButton = dateField.locator(`xpath=.//button[text()='${day}' and not(@disabled)]`).first();
    await dateButton.waitFor({ state: 'visible', timeout: 5000 });
    await dateButton.click();
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
    await this.page.getByTestId('AF-verify-email').click();
  }

  async enterPhone(phone) {
    await this.page.getByTestId('AF-student-phone').click();
    await this.page.getByTestId('AF-student-phone').fill(phone);
  }

  async generatePhone() {
    await this.page.getByTestId('AF-verify-phone').click();
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

  async navigateToAdmissions() {
    await this.clickAdmissionAndFees();
    await this.page.waitForTimeout(1000);
    await this.clickAdmissions();
    await this.page.waitForTimeout(1500);
  }

  async updatePersonalDetails(personalData) {
    await this.page.getByTestId('AI-PD-edit-contact-info-button').click();
    await this.page.waitForTimeout(1000);

    await this.page.getByTestId('AI-PD-permanent-house-no-input').fill(personalData.houseNo);
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-PD-permanent-village-input').fill(personalData.village);
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-PD-permanent-locality-input').fill(personalData.locality);
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-PD-permanent-street-input').fill(personalData.street);
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-PD-permanent-city-input').fill(personalData.city);
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-PD-permanent-state-input').fill(personalData.state);
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-PD-permanent-country-dropdown').click();
    await this.page.waitForTimeout(1000);

    await this.page
      .getByTestId('AI-PD-permanent-country-options')
      .getByText(personalData.country, { exact: true })
      .click();
    await this.page.waitForTimeout(800);

    await this.page.getByTestId('AI-PD-permanent-zip-code-input').fill(personalData.zipCode);
    await this.page.waitForTimeout(800);

    await this.page.locator('.border > .w-4').first().click();
    await this.page.waitForTimeout(500);

    await this.page.getByTestId(`AI-PD-blood-group-option-${personalData.bloodGroup}`).click();
    await this.page.waitForTimeout(800);

    await this.page.getByTestId('AI-PD-save-personal-details-button').click();
    await this.page.waitForTimeout(2000);
  }

  async updateAcademicInfo(academicData) {
    await this.page.getByTestId('EA-tab-academic-info').click();
    await this.page.waitForTimeout(1000);

    await this.page.getByTestId('AI-A-edit-icon').click();
    await this.page.waitForTimeout(1000);

    await expect(this.page.getByTestId('AI-A-save-button')).toBeVisible();

    if (academicData.rollNo) {
      await this.page.getByTestId('AI-A-roll-no-input').fill(academicData.rollNo);
      await this.page.waitForTimeout(800);
    }

    await this.page.getByTestId('AI-A-save-button').click();
    await this.page.waitForTimeout(1500);
  }

  async addNote(noteData) {
    await this.page.getByTestId('EA-tab-notes').click();
    await this.page.waitForTimeout(1000);

    await this.page.getByTestId('AI-N-title').fill(noteData.title);
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-N-description').fill(noteData.description);
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-N-approver').click();
    await this.page.waitForTimeout(800);

    await this.page
      .getByTestId('AI-N-approver-dropdown')
      .getByText(noteData.approver, { exact: true })
      .click();
    await this.page.waitForTimeout(800);

    await this.page.getByTestId('AI-N-date').click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('button', { name: noteData.dateDay, exact: true }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByTestId('AI-N-save-btn').click();
    await this.page.waitForTimeout(1500);
  }

  async clickTab(tabName) {
    const tabMap = {
      'personal-details': 'EA-tab-personal-details',
      'academic-info': 'EA-tab-academic-info',
      'fees-details': 'EA-tab-fees-details',
      'notes': 'EA-tab-notes'
    };
    await this.page.getByTestId(tabMap[tabName]).click();
    await this.page.waitForTimeout(1000);
  }

  async createAdmission(admissionData) {
    await this.clickAdmissionAndFees();
    await this.page.waitForTimeout(500);
    await this.clickAdmissions();
    await this.clickAddAdmissionButton();
    await this.page.waitForTimeout(500);
    await this.enterPRN(admissionData.prn);
    await this.page.waitForTimeout(300);
    await this.selectTitle(admissionData.title);
    await this.page.waitForTimeout(300);
    await this.enterFirstName(admissionData.firstName);
    await this.page.waitForTimeout(300);
    await this.enterLastName(admissionData.lastName);
    await this.page.waitForTimeout(300);
    await this.selectGender(admissionData.gender);
    await this.page.waitForTimeout(300);
    await this.selectDate(admissionData.date);
    await this.page.waitForTimeout(300);
    await this.selectLocation(admissionData.location);
    await this.page.waitForTimeout(300);
    await this.enterEmail(admissionData.email);
    await this.page.waitForTimeout(300);
    await this.generateEmail();
    await this.page.waitForTimeout(300);
    await this.enterPhone(admissionData.phoneNumber);
    await this.page.waitForTimeout(300);
    await this.generatePhone();
    await this.page.waitForTimeout(300);
    await this.selectCourse(admissionData.course);
    await this.page.waitForTimeout(300);
    await this.selectYear(admissionData.year);
    await this.page.waitForTimeout(500);
    await this.clickSave();
  }

  async clickEditAdmission() {
    await this.page.getByTestId('AF-edit-admission').first().click();
    await this.page.waitForTimeout(1000);
  }

  async changeStatusToCanceled() {
    await this.page.getByRole('button', { name: 'Confirmed' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByText('Canceled').click();
    await this.page.waitForTimeout(500);
  }

  async deleteAdmission() {
    await this.page.getByTestId('AF-delete-admission').first().click();
    await this.page.waitForTimeout(1000);
    await this.page.getByTestId('AF-Delete-confirm').click();
    await this.page.waitForTimeout(1500);
  }

  async clickFilterButton() {
    await this.page.getByTestId('AF-filter-button').click();
    await this.page.waitForTimeout(500);
  }

  async closeFilter() {
    await this.page.getByTestId('AI-close-filter-button').click();
    await this.page.waitForTimeout(500);
  }

  async clickInviteButton() {
    await this.page.getByTestId('AF-invite-button').click();
    await this.page.waitForTimeout(500);
  }

  async closeInviteModal() {
    await this.page.getByTestId('AI-close-button').click();
    await this.page.waitForTimeout(500);
  }
}

export default AdmissionQaPage;
