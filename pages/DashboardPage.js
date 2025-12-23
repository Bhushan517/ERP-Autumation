class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async clickAdmissionAndFees() {
    await this.page.getByRole('button', { name: 'Admission & Fees' }).click();
  }

  async clickAdmissions() {
    await this.page.getByRole('link', { name: 'Admissions' }).click();
  }

  async navigateToAdmissions() {
    await this.clickAdmissionAndFees();
    await this.clickAdmissions();
  }
}


export default DashboardPage;