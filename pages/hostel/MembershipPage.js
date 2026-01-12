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
    await this.page.waitForTimeout(1000);

    // User requested to pick ANY name. 
    // We will NOT type the specific userName to avoid "No results" if data is missing.
    // If the list is empty, we might try typing a generic character like 'a'.

    const firstOption = this.page.locator('[id^="react-select-"][id*="-option-0"]').first();

    try {
      await firstOption.waitFor({ state: 'visible', timeout: 3000 });
      await firstOption.click();
    } catch (e) {
      console.log('Option-0 not found. Checking for "No options"...');
      const noOpt = this.page.getByText('No options');
      if (await noOpt.isVisible()) {
        console.log('List empty. Typing "a" to trigger search...');
        await this.page.keyboard.type('a');
        await this.page.waitForTimeout(1500);
        // Try fetching option again
        await this.page.getByRole('option').first().click();
      } else {
        // Maybe generic option is there
        await this.page.getByRole('option').first().click();
      }
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