class MembershipViewPage {
  constructor(page) {
    this.page = page;
  }

  async clickMember(index = 0) {
    await this.page.getByTestId(`H-M-member-name-${index}`).click();
  }

  async exitMember(index = 0) {
    await this.page.getByTestId(`H-M-exit-member-${index}`).click();
    await this.page.getByTestId('H-M-exit-confirm-button').click();
  }
}

export default MembershipViewPage;

