class HostelNavigationPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToHostel() {
    await this.page.getByTestId('menu-item-hostel').click();
    await this.page.waitForTimeout(500);
  }

  async navigateToPremises() {
    await this.navigateToHostel();
    await this.page.getByTestId('submenu-item-premises').click();
    await this.page.waitForTimeout(500);
  }

  async navigateToAttendance() {
    await this.navigateToHostel();
    await this.page.getByTestId('submenu-item-hostel-attendance').click();
    await this.page.waitForTimeout(500);
  }

  async navigateToGatepassRequests() {
    await this.navigateToHostel();
    await this.page.getByTestId('submenu-item-gatepass-requests').click();
    await this.page.waitForTimeout(500);
  }

  async navigateToGatepassApprovals() {
    await this.navigateToHostel();
    await this.page.getByTestId('submenu-item-gatepass-request-approvals').click();
    await this.page.waitForTimeout(500);
  }
}

export default HostelNavigationPage;

