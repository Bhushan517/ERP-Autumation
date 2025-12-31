class MembershipPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToMemberships() {
    await this.page.getByTestId('submenu-item-memberships').click();
    
    // Wait for navigation to complete
    await this.page.waitForURL('**/hostel/addmission**', { timeout: 10000 });
    
    // Wait for page to be fully loaded
    await this.page.waitForLoadState('networkidle');
    
    // Ensure Add Member button is visible
    await this.page.getByTestId('H-M-add-member-button').waitFor({ 
      state: 'visible', 
      timeout: 10000 
    });
  }

  async clickAddMember() {
    await this.page.getByTestId('H-M-add-member-button').click();
    
    // Wait for modal to appear
    await this.page.getByText('Admission to hostel', { exact: false }).waitFor({ 
      state: 'visible',
      timeout: 5000 
    });
  }

  async selectUser(userName) {
    // Click the search input to open dropdown
    const userInput = this.page.locator('.react-select__input-container').first();
    await userInput.click();
    
    // Directly click the first option by ID pattern (like original test)
    await this.page.locator('[id^="react-select-"][id$="-option-0"]').waitFor({ 
      state: 'visible', 
      timeout: 5000 
    });
    await this.page.locator('[id^="react-select-"][id$="-option-0"]').click();
  }

  async selectBuilding(buildingName) {
    // Click building select dropdown
    const buildingSelect = this.page
      .locator('.react-select__control.css-ku5mul-control > .react-select__value-container > .react-select__input-container')
      .first();
    
    await buildingSelect.click();
    
    // Wait for listbox to appear
    const listbox = this.page.getByRole('listbox');
    await listbox.waitFor({ state: 'visible', timeout: 5000 });
    
    // Wait for specific option to be available
    const option = this.page.getByRole('option', { name: buildingName });
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async selectStartDate(day) {
    // Click to open datepicker
    const startDateInput = this.page.getByRole('textbox', { name: 'Select date' }).first();
    await startDateInput.click();
    
    // Directly click the day button (like original test - no calendar wait needed)
    const dayButton = this.page.getByRole('button', { name: day }).nth(2);
    await dayButton.waitFor({ state: 'visible', timeout: 5000 });
    await dayButton.click();
  }

  async selectEndDate(day) {
    // Click to open datepicker
    const endDateInput = this.page.getByRole('textbox', { name: 'Select date' }).nth(1);
    await endDateInput.click();
    
    // Directly click the day button (like original test)
    const dayButton = this.page.getByRole('button', { name: day, exact: true });
    await dayButton.waitFor({ state: 'visible', timeout: 5000 });
    await dayButton.click();
  }

  async clickSave() {
    const saveButton = this.page.getByRole('button', { name: 'Save' });
    await saveButton.click();
    
    // Wait for modal to close (indicates save completed)
    await this.page.getByText('Admission to hostel', { exact: false }).waitFor({ 
      state: 'hidden', 
      timeout: 10000 
    });
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