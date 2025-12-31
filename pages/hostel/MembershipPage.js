class MembershipPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToMemberships() {
    await this.page.getByTestId('submenu-item-memberships').click();
    await this.page.waitForTimeout(500);
  }

  async clickAddMember() {
    await this.page.getByTestId('H-M-add-member-button').click();
    await this.page.waitForTimeout(500);
  }

  async selectUser(userName) {
    await this.page.locator('.react-select__input-container').first().click();
    await this.page.waitForTimeout(500);
    // Using locator with ID as fallback, can be improved with better selector
    await this.page.locator('#react-select-6-option-0').click();
    await this.page.waitForTimeout(500);
  }

  async selectBuilding(buildingName) {
    await this.page
      .locator('.react-select__control.css-ku5mul-control > .react-select__value-container > .react-select__input-container')
      .first()
      .click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('option', { name: buildingName }).click();
    await this.page.waitForTimeout(500);
  }

  async selectStartDate(day) {
    await this.page.getByRole('textbox', { name: 'Select date' }).first().click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: day }).nth(2).click();
    await this.page.waitForTimeout(500);
  }

  async selectEndDate(day) {
    await this.page.getByRole('textbox', { name: 'Select date' }).nth(1).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: day, exact: true }).click();
    await this.page.waitForTimeout(500);
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(1500);
  }

  async createMembership(membershipData) {
    await this.selectUser(membershipData.userName);
    await this.selectBuilding(membershipData.buildingName);
    await this.selectStartDate(membershipData.startDate);
    await this.selectEndDate(membershipData.endDate);
    await this.clickSave();
  }
}

export default MembershipPage;

