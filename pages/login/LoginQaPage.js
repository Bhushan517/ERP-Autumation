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

  async clickSignInContainer() {
    await this.page.getByTestId('SI-signin-container').click();
  }

  async clickSubmit() {
    await this.page.getByTestId('SI-submit-button-show').click();
  }

  async login(username, password) {
    console.log(`Attempting login with user: ${username}`);
    await this.goto();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignInContainer();
    await this.clickSubmit();
    console.log('✅ Login successful');
  }
}

export default LoginQaPage;

