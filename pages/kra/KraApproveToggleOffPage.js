class KraApproveToggleOffPage {
    constructor(page) {
        this.page = page;
    }

    // Helper function for waiting and clicking
    async waitAndClick(locator, description = '') {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(500);
        await locator.click();
        console.log(`✓ Clicked: ${description}`);
    }

    async waitAndFill(locator, text, description = '') {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(300);
        await locator.clear();
        await locator.fill(text);
        console.log(`✓ Filled: ${description} with "${text}"`);
    }


    // KRA Configuration Methods
    async navigateToKraConfiguration() {
        console.log('⚙️ Navigating to KRA Configuration...');
        await this.waitAndClick(this.page.getByTestId('menu-item-kra-management'), 'KRA Management menu');
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.getByTestId('submenu-item-kra-configuration'), 'KRA Configuration submenu');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    async applyConfig() {
        await this.waitAndClick(this.page.getByTestId('KM-KT-Apply-Config-Button'), 'Apply Config button');
        await this.page.waitForTimeout(1500);
    }

    async turnToggleOff() {
        console.log('🔧 Checking Toggle state...');
        const toggleLocator = this.page.locator('div:nth-child(4) > .relative > .absolute');

        // Wait for it to be visible
        await toggleLocator.waitFor({ state: 'visible', timeout: 10000 });

        // Check if toggle is ON (using classes or state)
        // Common indicator is bg-blue or bg-green on the parent or itself
        const isToggleOn = await toggleLocator.evaluate(el => {
            // Check computed style or classes
            return el.classList.contains('bg-green-500') ||
                el.classList.contains('bg-blue-500') ||
                el.classList.contains('bg-blue-600') ||
                el.getAttribute('aria-checked') === 'true';
        }).catch(() => true); // Default to true if unsure

        if (isToggleOn) {
            console.log('✓ Toggle is ON - turning it OFF...');
            await toggleLocator.click();
            await this.page.waitForTimeout(800);
        } else {
            console.log('✓ Toggle is already OFF - no action needed');
        }

        // Always save as per request
        await this.waitAndClick(this.page.getByTestId('KM-KC-CS-Save-Button'), 'Save Config button');
        await this.page.waitForTimeout(2000);
        console.log('✓ Configuration saved');
    }

    // Template Creation Methods
    async createTemplate(templateName) {
        console.log('📝 Creating New Template...');
        await this.waitAndClick(this.page.getByTestId('KM-KT-Add-Template-Button'), 'Add Template button');
        await this.page.waitForTimeout(2000);

        await this.waitAndClick(this.page.getByTestId('KM-KC-CNT-TN'), 'Template name field');
        await this.waitAndFill(this.page.getByTestId('KM-KC-CNT-TN'), templateName, 'Template name');
    }

    async selectCategory(categoryName) {
        await this.page.waitForTimeout(800);
        await this.waitAndClick(this.page.locator('.css-15ol6m4').first(), 'Category dropdown');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.getByRole('option', { name: categoryName }), 'Category option');
    }

    async selectEndDate(day) {
        await this.page.waitForTimeout(800);
        await this.waitAndClick(this.page.getByTestId('KM-KC-CNT-End-Date'), 'End date picker');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.getByRole('button', { name: day }), `Date ${day}`);
    }

    async selectDepartment(departmentName) {
        await this.page.waitForTimeout(800);
        await this.waitAndClick(this.page.locator('div').filter({ hasText: /^Select Department$/ }).nth(2), 'Department dropdown');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.getByRole('option', { name: departmentName }), 'Department option');
    }

    async fillTemplateDescription(description) {
        await this.page.waitForTimeout(800);
        await this.waitAndClick(this.page.getByTestId('KM-KT-Description-Input'), 'Template description');
        await this.waitAndFill(this.page.getByTestId('KM-KT-Description-Input'), description, 'Template description');
    }

    async addMilestone(title, weightage, description) {
        console.log('🎯 Adding Milestone...');
        await this.page.waitForTimeout(1000);
        await this.waitAndClick(this.page.getByTestId('KM-KT-Add-Milestone-Button'), 'Add Milestone button');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.getByTestId('KM-KC-KTM-K-title'), 'Milestone title');
        await this.waitAndFill(this.page.getByTestId('KM-KC-KTM-K-title'), title, 'Milestone title');

        await this.waitAndClick(this.page.getByTestId('KM-KC-KTM-weightage'), 'Milestone weightage');
        await this.waitAndFill(this.page.getByTestId('KM-KC-KTM-weightage'), weightage, 'Milestone weightage');

        await this.waitAndClick(this.page.getByTestId('KM-KC-KTM-Description'), 'Milestone description');
        await this.waitAndFill(this.page.getByTestId('KM-KC-KTM-Description'), description, 'Milestone description');
    }

    async addTask(title, description) {
        console.log('✅ Adding Task...');
        await this.page.waitForTimeout(1000);
        await this.waitAndClick(this.page.getByTestId('KM-KT-Add-Task-Button'), 'Add Task button');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.getByTestId('KM-KT-Task-Title-0'), 'Task title');
        await this.waitAndFill(this.page.getByTestId('KM-KT-Task-Title-0'), title, 'Task title');

        await this.waitAndClick(this.page.getByTestId('KM-KT-Task-Description-0'), 'Task description');
        await this.waitAndFill(this.page.getByTestId('KM-KT-Task-Description-0'), description, 'Task description');
    }

    async saveTemplate() {
        await this.page.waitForTimeout(1200);
        await this.waitAndClick(this.page.getByTestId('KM-KC-CNT-Save-button'), 'Save Template button');
        await this.page.waitForTimeout(3000);
    }

    // Navigation Methods
    async navigateToMyKra() {
        console.log('📊 Navigating to My KRA...');
        await this.waitAndClick(this.page.getByTestId('submenu-item--assign-kra'), 'Assign KRA submenu');
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.getByTestId('menu-item-kra-management'), 'KRA Management menu');
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.getByTestId('menu-item-performance'), 'Performance menu');
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.getByTestId('submenu-item-my-kra'), 'My KRA submenu');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2500);
    }

    // KRA Operations
    async addKraFromTemplate() {
        console.log('➕ Adding KRA from Template...');
        await this.waitAndClick(this.page.getByTestId('PM-MKL-Add-Kra'), 'Add KRA button');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.getByTestId('PM-MKL-Add-Copy-Template'), 'Copy from Template');
        await this.page.waitForTimeout(2000);

        await this.waitAndClick(this.page.getByTestId('KM-KTC-Checkbox-0'), 'Template checkbox');
        await this.page.waitForTimeout(600);

        await this.waitAndClick(this.page.getByTestId('KM-KTC-Copy-Multiple-Button'), 'Copy Multiple button');
        await this.page.waitForTimeout(1200);

        await this.waitAndClick(this.page.getByRole('button', { name: 'Copy', exact: true }), 'Confirm Copy');
        await this.page.waitForTimeout(4000);
    }

    async editKra() {
        console.log('✏️ Editing KRA...');
        await this.waitAndClick(this.page.getByTestId('PM-MKL-Year-Clear'), 'Clear year filter');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2500);
    }

    async clickEditButton() {
        const editButton = this.page.getByTestId('PM-MKL-Edit-0');
        await editButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(1500);
        await editButton.click();
        console.log('✓ Clicked Edit button');
        await this.page.waitForTimeout(2500);
    }

    async selectYear(year) {
        await this.page.waitForTimeout(1000);
        await this.waitAndClick(this.page.locator('.react-select__input-container').first(), 'Year dropdown');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.getByRole('option', { name: year }), `Year ${year}`);
    }

    async selectTargetDate(day) {
        await this.page.waitForTimeout(1000);
        await this.waitAndClick(this.page.getByRole('textbox', { name: 'Target Date' }).first(), 'First target date');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.getByRole('button', { name: day, exact: true }), `Date ${day}`);
    }

    async addAdditionalTask(day) {
        console.log('➕ Adding Additional Task...');
        await this.page.waitForTimeout(1200);
        await this.waitAndClick(this.page.getByTestId('PM-ACK-Milestone-Add-Task-0'), 'Add Task to Milestone');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.locator('.text-\\[var\\(--secondary-text-color\\)\\].transition'), 'Task field');
        await this.page.waitForTimeout(800);

        await this.waitAndClick(this.page.getByRole('textbox', { name: 'Target Date' }).nth(1), 'Task target date');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.getByRole('button', { name: day }), `Date ${day}`);
    }

    async publishKraValidation() {
        await this.page.waitForTimeout(1500);
        await this.waitAndClick(this.page.getByTestId('PM-ACK-Publish-Button'), 'Publish button (validation)');
        await this.page.waitForTimeout(2000);
    }

    async addTaskDetails(taskName, targetDay, description) {
        console.log('📝 Adding Task Details...');
        await this.waitAndClick(this.page.getByTestId('PM-ACK-Milestone-Add-Task-0'), 'Add Task again');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.getByTestId('PM-ACK-Milestone-Task-Title-0-0'), 'Dynamic task title');
        await this.waitAndFill(this.page.getByTestId('PM-ACK-Milestone-Task-Title-0-0'), taskName, 'Dynamic task title');

        await this.page.waitForTimeout(800);
        await this.waitAndClick(this.page.getByRole('textbox', { name: 'Target Date' }).nth(1), 'Dynamic task target date');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.getByRole('button', { name: targetDay, exact: true }), `Date ${targetDay}`);

        await this.page.waitForTimeout(800);
        await this.waitAndClick(this.page.getByTestId('PM-ACK-Milestone-Task-Description-0-0'), 'Dynamic task description');
        await this.waitAndFill(this.page.getByTestId('PM-ACK-Milestone-Task-Description-0-0'), description, 'Dynamic task description');
    }

    async publishKraFinal() {
        await this.page.waitForTimeout(1500);
        await this.waitAndClick(this.page.getByTestId('PM-ACK-Publish-Button'), 'Publish KRA (Final)');
        await this.page.waitForTimeout(4000);
    }

    // Approval Workflow
    async processApprovals() {
        console.log('✅ Processing Approvals...');
        await this.waitAndClick(this.page.getByTestId('PM-MK-Tab-MyApproval'), 'My Approval tab');
        await this.page.waitForTimeout(2000);

        await this.waitAndClick(this.page.getByTestId('PM-KW-Row-0'), 'KRA workflow row');
        await this.page.waitForTimeout(2000);

        await this.waitAndClick(this.page.getByTestId('PM-KWD-Tab-workflow'), 'Workflow tab');
        await this.page.waitForTimeout(1500);

        // Approve Level 0
        await this.waitAndClick(this.page.getByTestId('am_ar_ard_w_level_header_0'), 'Level 0 header');
        await this.page.waitForTimeout(800);
        await this.waitAndClick(this.page.getByTestId('AM-AR-ARD-W-approve-button-0-0'), 'Approve Level 0');
        await this.page.waitForTimeout(2000);

        // Approve Level 1
        await this.waitAndClick(this.page.getByTestId('am_ar_ard_w_level_header_1'), 'Level 1 header');
        await this.page.waitForTimeout(800);
        await this.waitAndClick(this.page.getByTestId('AM-AR-ARD-W-approve-button-1-0'), 'Approve Level 1');
        await this.page.waitForTimeout(2000);

        // Go back
        await this.waitAndClick(this.page.getByTestId('PM-KWD-Tab-kra-details'), 'KRA Details tab');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.getByTestId('PM-KWD-Back-Button'), 'Back button');
        await this.page.waitForTimeout(2000);
    }

    // Progress Update
    async updateProgress() {
        console.log('📈 Updating Progress...');
        await this.waitAndClick(this.page.getByTestId('PM-MK-Tab-PerformanceKra'), 'Performance KRA tab');
        await this.page.waitForTimeout(2500);

        await this.waitAndClick(this.page.getByTestId('PM-KP-CheckIn-0'), 'Check-in button');
        await this.page.waitForTimeout(2500);

        await this.waitAndClick(this.page.locator('div').filter({ hasText: /^Status$/ }).nth(1), 'Status dropdown');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.getByText('On Track').last(), 'On Track status');

        await this.page.waitForTimeout(1000);
        await this.waitAndClick(this.page.locator('div').filter({ hasText: /^Not Started$/ }).first(), 'Milestone header');
        await this.page.waitForTimeout(800);

        await this.waitAndClick(this.page.getByRole('button', { name: 'Expand milestone' }), 'Expand milestone');
        await this.page.waitForTimeout(1500);

        const slider = this.page.getByRole('slider');
        await slider.waitFor({ state: 'visible' });
        await slider.fill('86');
        console.log('✓ Set progress to 86%');
        await this.page.waitForTimeout(1000);

        // Update task statuses
        await this.waitAndClick(this.page.locator('div').filter({ hasText: /^Not Started$/ }).nth(3), 'Task status 1');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.locator('.text-green-600').first(), 'Select status 1');
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.locator('div').filter({ hasText: /^Not Started$/ }).nth(1), 'Task status 2');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.locator('.text-green-600').first(), 'Select status 2');
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.locator('div').filter({ hasText: /^Not Started$/ }).nth(1), 'Task status 3');
        await this.page.waitForTimeout(600);
        await this.waitAndClick(this.page.locator('.px-3.py-2 > .text-green-600'), 'Select status 3');
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.getByTestId('PM-KPS-Save-Button'), 'Save progress');
        await this.page.waitForTimeout(3000);
    }

    // Submit KRA
    async submitKra() {
        console.log('📤 Submitting KRA...');
        const checkbox1 = this.page.getByRole('row', { name: 'Sr.No KRA Category KRA Type' }).getByRole('checkbox');
        await checkbox1.waitFor({ state: 'visible', timeout: 10000 });
        await checkbox1.check();
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.getByRole('button', { name: 'Submit' }), 'Submit button');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.getByRole('button', { name: 'Confirm' }), 'Confirm submit');
        await this.page.waitForTimeout(3000);
    }

    // Rating
    async ratePerformance(comment) {
        console.log('⭐ Rating Performance...');
        await this.waitAndClick(this.page.getByTestId('PM-KP-Rating-0'), 'Rating button');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.getByTestId('PM-RP-Star-5'), 'Star 5');
        await this.page.waitForTimeout(600);

        await this.waitAndClick(this.page.getByTestId('PM-RP-Comment-Textarea'), 'Comment textarea');
        await this.waitAndFill(this.page.getByTestId('PM-RP-Comment-Textarea'), comment, 'Rating comment');
        await this.page.waitForTimeout(600);

        await this.waitAndClick(this.page.getByTestId('PM-RP-Save-Button'), 'Save rating');
        await this.page.waitForTimeout(2500);
    }

    async submitRating() {
        const checkbox2 = this.page.getByRole('row', { name: 'Sr.No KRA Category KRA Type' }).getByRole('checkbox');
        await checkbox2.waitFor({ state: 'visible', timeout: 10000 });
        await checkbox2.check();
        await this.page.waitForTimeout(1000);

        await this.waitAndClick(this.page.getByRole('button', { name: 'Submit' }), 'Submit rating');
        await this.page.waitForTimeout(1500);

        await this.waitAndClick(this.page.getByRole('button', { name: 'Confirm' }), 'Confirm rating submit');
        await this.page.waitForTimeout(3000);
    }

    // Team KRA
    async checkTeamKra() {
        console.log('👥 Checking Team KRA...');
        await this.waitAndClick(this.page.getByTestId('submenu-item-team-kra'), 'Team KRA submenu');
        await this.page.waitForTimeout(2500);

        await this.waitAndClick(this.page.getByTestId('PM-TK-Kra-Count-0'), 'KRA count');
        await this.page.waitForTimeout(2000);

        await this.waitAndClick(this.page.getByTestId('PM-VTK-Rating-0'), 'View team rating');
        await this.page.waitForTimeout(2000);

        await this.waitAndClick(this.page.locator('.flex.items-center.justify-between > button'), 'Expand button');
        await this.page.waitForTimeout(1000);

        // Go back - Try standard ID first, then fallback to generic
        console.log('Clicking Back button...');
        const backButton = this.page.getByTestId('PM-TWD-Back-Button');
        try {
            await backButton.waitFor({ state: 'visible', timeout: 5000 });
            await backButton.click();
        } catch (e) {
            console.log('Standard back button ID not found, trying fallback...');
            // Fallback: Click the first button in the main content area which usually behaves as back/close
            await this.page.locator('button').first().click();
        }
        await this.page.waitForTimeout(2000);
    }

    async returnToMyKra() {
        console.log('🏁 Completing Test...');
        await this.waitAndClick(this.page.getByTestId('submenu-item-my-kra'), 'My KRA submenu');
        await this.page.waitForTimeout(2000);

        await this.waitAndClick(this.page.getByTestId('menu-item-performance'), 'Performance menu');
        await this.page.waitForTimeout(1500);
    }
}

export default KraApproveToggleOffPage;
