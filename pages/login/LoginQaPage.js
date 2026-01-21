class LoginQaPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/');
  }

  async navigateToLogin() {
    console.log('Navigating to Login page...');
    await this.page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/', { waitUntil: 'networkidle' });
    await this.page.waitForTimeout(1000);
  }

  async fillUsername(username) {
    console.log(`Filling username: ${username}...`);
    await this.page.getByTestId('SI-username-input-password').click();
    await this.page.waitForTimeout(200);
    await this.page.getByTestId('SI-username-input-password').fill(username);
  }

  async fillPassword(password) {
    console.log('Filling password...');
    await this.page.getByTestId('SI-password-input-password').click();
    await this.page.waitForTimeout(200);
    await this.page.getByTestId('SI-password-input-password').fill(password);
  }

  async submitLogin() {
    console.log('Submitting login...');
    await this.page.getByTestId('SI-password-input-password').press('Enter');
    await this.page.waitForTimeout(2000);
  }

  async selectOrganization(orgId) {
    console.log(`Selecting organization: ${orgId}...`);
    await this.page.getByTestId(`CG-org-card-${orgId}`).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    console.log('✅ Login successful');
  }

  // Legacy methods for backward compatibility
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

