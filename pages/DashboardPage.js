class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToAdmissions() {
    await this.clickAdmissionAndFees();
    await this.clickAdmissions();
  }
}


export default DashboardPage;