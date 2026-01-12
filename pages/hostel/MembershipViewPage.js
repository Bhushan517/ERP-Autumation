class MembershipViewPage {
  constructor(page) {
    this.page = page;
  }

  async clickMember(index = 0) {
    const member = this.page.getByTestId(`H-M-member-name-${index}`);
    await member.waitFor({ state: 'visible', timeout: 10000 });
    await member.click();
  }

  async exitMember(index = 0) {
    const exitBtn = this.page.getByTestId(`H-M-exit-member-${index}`);
    await exitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await exitBtn.click();
    await this.page.getByTestId('H-M-exit-confirm-button').click();
  }
}

export default MembershipViewPage;

