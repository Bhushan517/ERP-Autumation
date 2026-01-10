class MembershipPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToMemberships() {
    console.log('Navigating to Memberships...');
    const submenu = this.page.getByTestId('submenu-item-memberships');
    const isVisible = await submenu.isVisible().catch(() => false);

    if (!isVisible) {
      await this.page.getByTestId('menu-item-hostel').click();
      await submenu.waitFor({ state: 'visible', timeout: 5000 });
    }

    await submenu.click();

    await this.page.waitForURL('**/hostel/addmission**', { timeout: 10000 });

    await this.page.waitForLoadState('networkidle');

    await this.page.getByTestId('H-M-add-member-button').waitFor({
      state: 'visible',
      timeout: 10000
    });
    console.log('✅ Navigated to Memberships');
  }

  async clickAddMember() {
    await this.page.getByTestId('H-M-add-member-button').click();

    await this.page.getByText('Admission to hostel', { exact: false }).waitFor({
      state: 'visible',
      timeout: 5000
    });
  }

  async selectUser(userName) {
    const userInput = this.page.locator('.react-select__input-container').first();
    await userInput.click();

    // Wait for the menu to appear. React-select menu usually has role 'listbox' or we can find options.
    // User requested to click on the first available member/option.
    // Using a more generic selector for the option.
    const firstOption = this.page.locator('[id^="react-select-"][id*="-option-0"]').first();

    // Sometimes the menu takes a moment or the ID is slightly different. 
    // Trying to wait for any option.
    try {
      await firstOption.waitFor({ state: 'visible', timeout: 5000 });
      await firstOption.click();
    } catch (e) {
      console.log('First specific option not found, trying generic role=option');
      const genericOption = this.page.getByRole('option').first();
      await genericOption.waitFor({ state: 'visible', timeout: 5000 });
      await genericOption.click();
    }
  }

  async selectBuilding(buildingName) {
    const buildingSelect = this.page
      .locator('.react-select__control.css-ku5mul-control > .react-select__value-container > .react-select__input-container')
      .first();

    await buildingSelect.click();

    const listbox = this.page.getByRole('listbox');
    await listbox.waitFor({ state: 'visible', timeout: 5000 });

    const option = this.page.getByRole('option', { name: buildingName });
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async selectStartDate(day) {
    const startDateInput = this.page.getByRole('textbox', { name: 'Select date' }).first();
    await startDateInput.click();

    const dayButton = this.page.getByRole('button', { name: day }).nth(2);
    await dayButton.waitFor({ state: 'visible', timeout: 5000 });
    await dayButton.click();
  }

  async selectEndDate(day) {
    const endDateInput = this.page.getByRole('textbox', { name: 'Select date' }).nth(1);
    await endDateInput.click();

    const dayButton = this.page.getByRole('button', { name: day, exact: true });
    await dayButton.waitFor({ state: 'visible', timeout: 5000 });
    await dayButton.click();
  }

  async clickSave() {
    const saveButton = this.page.getByRole('button', { name: 'Save' });
    await saveButton.click();

    await this.page.getByText('Admission to hostel', { exact: false }).waitFor({
      state: 'hidden',
      timeout: 10000
    });
  }

  async createMembership(membershipData) {
    console.log(`Creating membership for user: ${membershipData.userName}`);
    await this.selectUser(membershipData.userName);
    await this.selectBuilding(membershipData.buildingName);
    await this.selectStartDate(membershipData.startDate);
    await this.selectEndDate(membershipData.endDate);
    await this.clickSave();
    console.log('✅ Membership created successfully');
  }
}

export default MembershipPage;