class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://platform.baap.company/');
  }

  async enterEmailOrPhone(emailOrPhone) {
    await this.page.getByRole('textbox', { name: 'Enter your email or phone' }).click();
    await this.page.getByRole('textbox', { name: 'Enter your email or phone' }).fill(emailOrPhone);
  }

  async enterPassword(password) {
    await this.page.getByRole('textbox', { name: 'Password' }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async clickSignIn() {
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async login(emailOrPhone, password) {
    await this.goto();
    await this.enterEmailOrPhone(emailOrPhone);
    await this.enterPassword(password);
    await this.clickSignIn();
  }
}

export default LoginPage;

