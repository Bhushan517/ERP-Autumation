class MembershipPersonalDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToPersonalDetails() {
    console.log('Navigating to Personal Details...');
    await this.page.getByRole('link', { name: 'Personal Details' }).click();
    await this.page.waitForTimeout(1000);
  }

  async clickEdit() {
    await this.page.getByTestId('H-M-PD-Edit-Button').click();
    await this.page.waitForTimeout(1000);
  }

  async fillPermanentAddress(addressData) {
    await this.page.getByTestId('H-M-PD-Perm-HouseNo-Input').fill(addressData.houseNo);
    await this.page.getByTestId('H-M-PD-Perm-Street-Input').fill(addressData.street);
    await this.page.getByTestId('H-M-PD-Perm-Locality-Input').fill(addressData.locality);
    await this.page.getByTestId('H-M-PD-Perm-State-Input').fill(addressData.state);
    await this.page.getByTestId('H-M-PD-Perm-City-Input').fill(addressData.city);
    await this.page.getByTestId('H-M-PD-Perm-ZipCode-Input').fill(addressData.zipCode);

    await this.page.getByTestId('H-M-PD-Perm-Country-Dropdown').click();
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('H-M-PD-Perm-Country-Option-India').click();
    await this.page.waitForTimeout(500);
  }

  async fillTemporaryAddress(addressData) {
    await this.page.getByTestId('H-M-PD-Temp-City-Input').fill(addressData.city);
    await this.page.getByTestId('H-M-PD-Temp-State-Input').fill(addressData.state);
    await this.page.getByTestId('H-M-PD-Temp-Street-Input').fill(addressData.street);
    await this.page.getByTestId('H-M-PD-Temp-HouseNo-Input').fill(addressData.houseNo);
    await this.page.getByTestId('H-M-PD-Temp-Village-Input').fill(addressData.village);
    await this.page.getByTestId('H-M-PD-Temp-Locality-Input').fill(addressData.locality);
    await this.page.getByTestId('H-M-PD-Temp-ZipCode-Input').fill(addressData.zipCode);

    await this.page.getByTestId('H-M-PD-Temp-Country-Dropdown').click();
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('H-M-PD-Temp-Country-Option-India').click();
    await this.page.waitForTimeout(500);
  }

  async addFamilyMember(familyData, index = 0) {
    await this.page.getByTestId(`H-M-PD-Family-Name-Input-${index}`).fill(familyData.name);
    await this.page.getByTestId(`H-M-PD-Family-Email-Input-${index}`).fill(familyData.email);
    await this.page.getByTestId(`H-M-PD-Family-Phone-Input-${index}`).fill(familyData.phone);
  }

  async addEmergencyContact(emergencyData, index = 0) {
    await this.page.getByTestId(`H-M-PD-Emergency-Name-Input-${index}`).fill(emergencyData.name);
    await this.page.getByTestId(`H-M-PD-Emergency-Relation-Input-${index}`).fill(emergencyData.relation);
    await this.page.getByTestId(`H-M-PD-Emergency-Phone-Input-${index}`).fill(emergencyData.phone);
  }

  async save() {
    await this.page.getByTestId('H-M-PD-Save-Button').click();


    try {
      await this.page.getByTestId('H-M-PD-Edit-Button').waitFor({
        state: 'visible',
        timeout: 10000
      });
      console.log('✅ Personal details saved successfully');
    } catch (e) {
      console.error('Error verifying save completion:', e);
      try {
        await this.page.waitForTimeout(1000);
      } catch (timeoutError) {
      }
    }
  }

  async goBack() {

    try {
      const backButton = this.page.getByTestId('H-M-AD-Back-Button');
      await backButton.waitFor({ state: 'visible', timeout: 3000 });
      await backButton.click();

      await this.page.waitForTimeout(1000);
    } catch (e) {

    }
  }
}

export default MembershipPersonalDetailsPage;

