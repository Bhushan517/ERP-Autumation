class FloorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToFloors() {
    console.log('Navigating to Floors...');
    await this.page.getByTestId('H-HP-Tab-Link-floor').click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Navigated to Floors');
  }

  async clickAddFloor() {
    await this.page.getByTestId('H-P-F-add-floor-button').click();
    await this.page.waitForTimeout(500);
  }

  async enterFloorName(floorName) {
    await this.page.getByTestId('H-P-F-Add-Floor-Name').click();
    await this.page.getByTestId('H-P-F-Add-Floor-Name').fill(floorName);
    await this.page.waitForTimeout(300);
  }

  async enterCapacity(capacity) {
    await this.page.getByTestId('H-P-F-Add-Capacity').click();
    await this.page.getByTestId('H-P-F-Add-Capacity').fill(capacity);
    await this.page.waitForTimeout(300);
  }

  async selectBuilding(buildingName, location) {
    await this.page.locator('.react-select__input-container').click();
    // Type building name to filter options
    await this.page.keyboard.type(buildingName);
    await this.page.waitForTimeout(1000); // Wait for filter

    await this.page.getByRole('option', { name: `${buildingName} (${location})` }).click();
    await this.page.waitForTimeout(500);
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(1500);
  }

  async createFloor(floorData) {
    console.log(`Creating floor: ${floorData.name}`);
    await this.enterFloorName(floorData.name);
    await this.enterCapacity(floorData.capacity);
    await this.selectBuilding(floorData.buildingName, floorData.location);
    await this.clickSave();
    console.log(`✅ Floor ${floorData.name} created successfully`);
  }
}

export default FloorPage;

