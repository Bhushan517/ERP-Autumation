class LoginQaPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  }

  async enterUsername(username) {
    await this.page.getByTestId('SI-username-input-password').click();
    await this.page.getByTestId('SI-username-input-password').fill(username);
  }

  async enterPassword(password) {
    await this.page.getByTestId('SI-password-input-password').click();
    await this.page.getByTestId('SI-password-input-password').fill(password);
  }

  async clickSubmit() {
    await this.page.getByTestId('SI-submit-button-show').click();
  }

  async selectGroup() {
    await this.page.getByTestId('CG-org-card-571bf643-60d5-4e9c-9c99-b8a52ca1832a').click();
  }

  async login(username, password) {
    console.log(`Attempting login with user: ${username}`);
    await this.goto();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSubmit();
    await this.selectGroup();
    console.log('✅ Login successful');
    await this.page.waitForTimeout(2000);
  }
}

export default LoginQaPage;

