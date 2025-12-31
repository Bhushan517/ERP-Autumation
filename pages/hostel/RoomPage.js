class RoomPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToRooms() {
    await this.page.getByTestId('H-HP-Tab-Link-room').click();
    await this.page.waitForTimeout(1000);
  }

  async clickAddRoom() {
    await this.page.getByTestId('H-P-R-add-room-button').click();
    await this.page.waitForTimeout(500);
  }

  async enterRoomName(roomName) {
    await this.page.getByTestId('H-P-R-Add-Room-Name').click();
    await this.page.getByTestId('H-P-R-Add-Room-Name').fill(roomName);
    await this.page.waitForTimeout(300);
  }

  async selectBuilding(buildingName, location) {
    await this.page.locator('.react-select__input-container').first().click();
    await this.page.waitForTimeout(500);
    await this.page.getByText(`${buildingName} (${location})`).click();
    await this.page.waitForTimeout(500);
  }

  async enterCapacity(capacity) {
    await this.page.getByTestId('H-P-R-Add-room-capacity').click();
    await this.page.getByTestId('H-P-R-Add-room-capacity').fill(capacity);
    await this.page.waitForTimeout(300);
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(1500);
  }

  async createRoom(roomData) {
    await this.enterRoomName(roomData.name);
    await this.selectBuilding(roomData.buildingName, roomData.location);
    await this.enterCapacity(roomData.capacity);
    await this.clickSave();
  }
}

export default RoomPage;

