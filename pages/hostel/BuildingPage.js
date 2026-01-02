class BuildingPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToBuildings() {
    await this.page.getByTestId('menu-item-hostel').click();
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('submenu-item-premises').click();
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('H-P-B-building-button').click();
    await this.page.waitForTimeout(1000);
  }

  async clickAddBuilding() {
    await this.page.getByTestId('H-P-B-building-button').click();
    await this.page.waitForTimeout(500);
  }

  async enterBuildingName(buildingName) {
    await this.page.getByTestId('H-P-B-Add-Building-Name').click();
    await this.page.getByTestId('H-P-B-Add-Building-Name').fill(buildingName);
    await this.page.waitForTimeout(300);
  }

  async selectType(type) {
    await this.page.getByText('Select Type').click();
    await this.page.waitForTimeout(300);
    await this.page.getByTestId('H-P-B-Add-Type').getByText(type).click();
    await this.page.waitForTimeout(300);
  }

  async enterCapacity(capacity) {
    await this.page.getByTestId('H-P-B-Add-Capacity').click();
    await this.page.getByTestId('H-P-B-Add-Capacity').fill(capacity);
    await this.page.waitForTimeout(300);
  }

  async enterAddress(address) {
    await this.page.getByTestId('H-P-B-Add-Address').click();
    await this.page.getByTestId('H-P-B-Add-Address').fill(address);
    await this.page.waitForTimeout(300);
  }

  async selectLocation(location) {
    await this.page.getByTestId('H-P-B-Add-Location').click();

    //  await page.getByTestId('H-P-B-Add-Location').click();
  await this.page.getByText(location).nth(1).click();
    await this.page.waitForTimeout(500);
    // Using nth(1) as per original test to avoid strict mode violation
    // await this.page.getByText(location, { exact: true }).first().click();
    // await this.page.waitForTimeout(500);
  }

  async selectIncharge(inchargeName) {
    await this.page.locator('.react-select__input-container').click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('option',).first().click();
    await this.page.waitForTimeout(500);
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(1500);
  }

  async createBuilding(buildingData) {
    await this.enterBuildingName(buildingData.name);
    await this.selectType(buildingData.type);
    await this.enterCapacity(buildingData.capacity);
    await this.enterAddress(buildingData.address);
    await this.selectLocation(buildingData.location);
    await this.selectIncharge(buildingData.incharge);
    await this.clickSave();
  }
}

export default BuildingPage;

