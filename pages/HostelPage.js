class HostelPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToHostelModule() {
    await this.page.getByRole('button', { name: 'Hostel' }).click();
  }

  // Premises - Building
  async navigateToPremises() {
    await this.page.getByRole('link', { name: 'Premises' }).click();
  }

  async addBuilding(buildingData) {
    await this.page.getByRole('button', { name: 'Add Building' }).click();

    await this.page.getByRole('textbox', { name: 'Enter building name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter building name' }).fill(buildingData.name);

    await this.page.getByText('Select Type').click();
    await this.page.locator('div').filter({ hasText: new RegExp(`^${buildingData.type}$`) }).click();

    await this.page.getByPlaceholder('Enter capacity').click();
    await this.page.getByPlaceholder('Enter capacity').fill(buildingData.capacity);

    await this.page.getByRole('textbox', { name: 'Enter address' }).click();
    await this.page.getByRole('textbox', { name: 'Enter address' }).fill(buildingData.address);

    await this.page.getByRole('textbox', { name: 'Select location' }).click();
    await this.page.getByText(buildingData.location).nth(1).click();

    await this.page.locator('.react-select__input-container').click();
    await this.page.getByRole('option', { name: buildingData.managerName }).click();

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Floors
  async navigateToFloors() {
    await this.page.getByRole('link', { name: 'Floors' }).click();
  }

  async addFloor(floorData) {
    await this.page.getByRole('button', { name: 'Add Floor' }).click();

    await this.page.getByRole('textbox', { name: 'Enter floor name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter floor name' }).fill(floorData.name);

    await this.page.getByPlaceholder('Enter capacity').click();
    await this.page.getByPlaceholder('Enter capacity').fill(floorData.capacity);

    await this.page.locator('.react-select__input-container').click();
    await this.page.getByRole('option', { name: floorData.buildingOption }).click();

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Rooms
  async navigateToRooms() {
    await this.page.getByRole('link', { name: 'Rooms' }).click();
  }

  async addRoom(roomData) {
    await this.page.getByRole('button', { name: 'Add Room' }).click();

    await this.page.getByRole('textbox', { name: 'Enter room name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter room name' }).fill(roomData.name);

    await this.page.locator('.react-select__input-container').first().click();
    await this.page.getByText(roomData.buildingOption).click();

    await this.page.getByRole('textbox', { name: 'Enter room capacity' }).click();
    await this.page.getByRole('textbox', { name: 'Enter room capacity' }).fill(roomData.capacity);

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Hostel Fees Template
  async navigateToHostelFeesTemplate() {
    await this.page.getByRole('link', { name: 'Hostel Fees Template' }).click();
  }

  async addHostelTemplate(templateData) {
    await this.page.getByRole('button', { name: 'Add Hostel Template' }).click();

    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(templateData.name);

    await this.page.locator('span').filter({ hasText: 'Select Payment Types' }).click();
    await this.page.locator('div').filter({ hasText: new RegExp(`^${templateData.paymentTypeOption}$`) }).nth(1).click();
    await this.page.locator('div').filter({ hasText: /^1 payment type\(s\) selected$/ }).click();
    await this.page.locator('.w-8').click();

    await this.page.getByRole('textbox', { name: 'Name' }).nth(1).click();
    await this.page.getByRole('textbox', { name: 'Name' }).nth(1).fill(templateData.feesName);

    await this.page.getByRole('textbox', { name: 'Amount' }).click();
    await this.page.getByRole('textbox', { name: 'Amount' }).fill(templateData.amount);

    await this.page.locator('.flex.gap-1 > button').first().click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Memberships
  async navigateToMemberships() {
    await this.page.getByRole('link', { name: 'Memberships' }).click();
  }

  async addMember(memberData) {
    await this.page.getByRole('button', { name: 'Add Member' }).click();

    await this.page.locator('.react-select__input-container').first().click();
    if (memberData.studentName) {
      await this.page.getByRole('option', { name: memberData.studentName }).click();
    } else {
      await this.page.getByRole('option').first().click();
    }

    await this.page.locator('.react-select__control.css-ku5mul-control > .react-select__value-container > .react-select__input-container').first().click();
    await this.page.getByRole('option', { name: memberData.buildingOption }).click();

    await this.page.getByRole('textbox', { name: 'Select date' }).first().click();
    await this.page.getByRole('button', { name: memberData.startDay, exact: true }).click();

    await this.page.getByRole('textbox', { name: 'Select date' }).nth(1).click();
    await this.page.getByRole('button', { name: memberData.endDay, exact: true }).click();

    if (memberData.roomOption) {
      await this.page.locator('.react-select__control.css-6y7xo6-control > .react-select__value-container > .react-select__input-container').click();
      await this.page.getByRole('option', { name: memberData.roomOption }).click();
    }

    if (memberData.managerApproval) {
      await this.page.getByRole('checkbox', { name: 'Is Manager Approval required?' }).check();
    }

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Gatepass
  async navigateToGatepassRequests() {
    await this.page.getByRole('link', { name: 'Gatepass Requests', exact: true }).click();
  }

  async navigateToGatepassApprovals() {
    await this.page.getByRole('link', { name: 'Gatepass Request Approvals', exact: true }).click();
  }

  async createGatepass(gatepassData) {
    await this.page.getByRole('button', { name: 'Create Gatepass' }).click();

    await this.page.getByRole('textbox', { name: 'Select date' }).first().click();
    await this.page.getByRole('button', { name: gatepassData.startDay }).click();

    await this.page.getByRole('textbox', { name: 'Select date' }).nth(1).click();
    await this.page.getByRole('button', { name: gatepassData.endDay }).click();

    await this.page.getByRole('textbox', { name: 'Enter reason...' }).click();
    await this.page.getByRole('textbox', { name: 'Enter reason...' }).fill(gatepassData.reason);

    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.locator('.sticky > .transition-colors').click();
  }
}

export default HostelPage;


