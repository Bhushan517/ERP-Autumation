class HostelNavigationPage {
  constructor(page) {
    this.page = page;
  }

  async ensureHostelMenuOpen() {
    const submenu = this.page.getByTestId('submenu-item-premises');
    const isVisible = await submenu.isVisible().catch(() => false);
    
    if (!isVisible) {
      await this.page.getByTestId('menu-item-hostel').click();
      await submenu.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async navigateToPremises() {
    await this.ensureHostelMenuOpen();
    await this.page.getByTestId('submenu-item-premises').click();
    await this.page.waitForURL('**/hostel/premises**', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAttendance() {
    await this.ensureHostelMenuOpen();
    await this.page.getByTestId('submenu-item-hostel-attendance').click();
    await this.page.waitForURL('**/hostel/hostel-attendance**', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToGatepassRequests() {
    await this.ensureHostelMenuOpen();
    await this.page.getByTestId('submenu-item-gatepass-requests').click();
    await this.page.waitForURL('**/hostel/gatepass**', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToGatepassApprovals() {
    await this.ensureHostelMenuOpen();
    await this.page.getByTestId('submenu-item-gatepass-request-approvals').click();
    await this.page.waitForURL('**/hostel/gatepass-approvals**', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }
}

export default HostelNavigationPage;