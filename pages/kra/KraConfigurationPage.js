class KraConfigurationPage {
    constructor(page) {
        this.page = page;
    }

    // Navigation
    async navigateToKraManagement() {
        console.log('Navigating to KRA Management...');
        await this.page.getByTestId('menu-item-kra-management').click();
        await this.page.waitForTimeout(800);
    }

    async navigateToKraConfiguration() {
        console.log('Navigating to KRA Configuration...');
        await this.page.getByTestId('submenu-item-kra-configuration').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1500);
    }

    // Configuration Setup
    async applyConfig() {
        console.log('Applying Config...');
        await this.page.getByTestId('KM-KT-Apply-Config-Button').click();
        await this.page.waitForTimeout(1000);
    }

    async exitConfig() {
        console.log('Exiting Config...');
        await this.page.getByTestId('KM-KC-CS-exit').click();
        await this.page.waitForTimeout(800);
    }

    // Category Management
    async navigateToCategoriesTab() {
        console.log('Navigating to Categories tab...');
        await this.page.getByTestId('KM-KC-Tab-Categories').click();
        await this.page.waitForTimeout(1000);
    }

    async addCategory(categoryName, description) {
        console.log(`Adding Category: ${categoryName}...`);
        await this.page.getByTestId('KM-KC-Add-Category-Button').click();
        await this.page.waitForTimeout(1000);

        await this.page.getByTestId('KM-KC-ANC-CN').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-ANC-CN').fill(categoryName);

        await this.page.getByTestId('KM-KC-ANC-Description').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-ANC-Description').fill(description);

        await this.page.getByTestId('KM-KC-ANC-close btn').click();
        await this.page.waitForTimeout(1000);
        console.log('✅ Category Added');
    }

    // Template Management
    async navigateToTemplatesTab() {
        console.log('Navigating to Templates tab...');
        await this.page.getByTestId('KM-KC-Tab-Templates').click();
        await this.page.waitForTimeout(1000);
    }

    async clickAddTemplate() {
        console.log('Clicking Add Template...');
        await this.page.getByTestId('KM-KT-Add-Template-Button').click();
        await this.page.waitForTimeout(1500);
    }

    async fillTemplateName(templateName) {
        console.log(`Filling Template Name: ${templateName}...`);
        await this.page.getByTestId('KM-KC-CNT-TN').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-CNT-TN').fill(templateName);
    }

    async selectCategory(categoryName) {
        console.log(`Selecting Category: ${categoryName}...`);
        await this.page.waitForTimeout(800);
        await this.page.locator('.css-15ol6m4').first().click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('option', { name: categoryName }).click();
    }

    async selectEndDate(day) {
        console.log(`Selecting End Date: ${day}...`);
        await this.page.waitForTimeout(800);
        await this.page.getByTestId('KM-KC-CNT-End-Date').click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: day }).click();
    }

    async selectRole(roleName) {
        console.log(`Selecting Role: ${roleName}...`);
        await this.page.waitForTimeout(800);
        await this.page.locator('.grid.grid-cols-1.md\\:grid-cols-2.gap-6 > div > .w-full > .css-p25h17-control > .css-hlgwow > .css-15ol6m4').first().click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('option', { name: roleName }).click();
    }

    async fillTemplateDescription(description) {
        console.log('Filling Template Description...');
        await this.page.waitForTimeout(800);
        await this.page.getByTestId('KM-KT-Description-Input').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KT-Description-Input').fill(description);
    }

    // Milestone Management
    async addFirstMilestone(title, weightage, description) {
        console.log(`Adding First Milestone: ${title}...`);
        await this.page.waitForTimeout(800);
        await this.page.getByTestId('KM-KT-Add-Milestone-Button').click();
        await this.page.waitForTimeout(1000);

        await this.page.getByTestId('KM-KC-KTM-K-title').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-KTM-K-title').fill(title);

        await this.page.getByTestId('KM-KC-KTM-weightage').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-KTM-weightage').fill(weightage);

        await this.page.getByTestId('KM-KC-KTM-Description').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-KTM-Description').fill(description);
        console.log('✅ First Milestone Added');
    }

    async addSecondMilestone(title, weightage, description) {
        console.log(`Adding Second Milestone: ${title}...`);
        await this.page.waitForTimeout(800);
        await this.page.getByTestId('KM-KT-Add-Milestone-Small-Button').click();
        await this.page.waitForTimeout(1000);

        await this.page.getByTestId('KM-KC-KTM-K-title').nth(1).click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-KTM-K-title').nth(1).fill(title);

        await this.page.getByTestId('KM-KC-KTM-weightage').nth(1).click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-KTM-weightage').nth(1).fill(weightage);

        await this.page.getByTestId('KM-KC-KTM-Description').nth(1).click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KC-KTM-Description').nth(1).fill(description);
        console.log('✅ Second Milestone Added');
    }

    // Task Management
    async addTask(title, description) {
        console.log(`Adding Task: ${title}...`);
        await this.page.waitForTimeout(800);
        await this.page.getByTestId('KM-KT-Add-Task-Button').click();
        await this.page.waitForTimeout(1000);

        await this.page.getByTestId('KM-KT-Task-Title-0').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KT-Task-Title-0').fill(title);

        await this.page.getByTestId('KM-KT-Task-Description-0').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('KM-KT-Task-Description-0').fill(description);
        console.log('✅ Task Added');
    }

    async saveTemplate() {
        console.log('Saving Template...');
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('KM-KC-CNT-Save-button').click();
        await this.page.waitForTimeout(2000);
        console.log('✅ Template Saved');
    }
}

export default KraConfigurationPage;
