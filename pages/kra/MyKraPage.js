class MyKraPage {
    constructor(page) {
        this.page = page;
    }

    // Navigation
    async navigateToPerformance() {
        console.log('Navigating to Performance menu...');
        await this.page.getByTestId('menu-item-performance').click();
        await this.page.waitForTimeout(800);
    }

    async navigateToMyKra() {
        console.log('Navigating to My KRA...');
        await this.page.getByTestId('submenu-item-my-kra').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    async navigateToAssignKra() {
        console.log('Navigating to Assign KRA...');
        await this.page.getByTestId('submenu-item--assign-kra').click();
        await this.page.waitForTimeout(800);
    }

    // Add KRA from Template
    async clickAddKra() {
        console.log('Clicking Add KRA...');
        await this.page.getByTestId('PM-MKL-Add-Kra').click();
        await this.page.waitForTimeout(1000);
    }

    async clickCopyFromTemplate() {
        console.log('Clicking Copy from Template...');
        await this.page.getByTestId('PM-MKL-Add-Copy-Template').click();
        await this.page.waitForTimeout(1500);
    }

    async selectTemplateCheckbox(index = 0) {
        console.log(`Selecting Template Checkbox ${index}...`);
        await this.page.getByTestId(`KM-KTC-Checkbox-${index}`).click();
        await this.page.waitForTimeout(500);
    }

    async clickCopyMultiple() {
        console.log('Clicking Copy Multiple...');
        await this.page.getByTestId('KM-KTC-Copy-Multiple-Button').click();
        await this.page.waitForTimeout(1000);
    }

    async confirmCopy() {
        console.log('Confirming Copy...');
        await this.page.getByRole('button', { name: 'Copy', exact: true }).click();
        await this.page.waitForTimeout(3000);
        console.log('✅ KRA Copied from Template');
    }

    // Filter and Edit
    async clearYearFilter() {
        console.log('Clearing Year Filter...');
        await this.page.getByTestId('PM-MKL-Year-Clear').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    async clickEditKra(index = 0) {
        console.log(`Clicking Edit KRA ${index}...`);
        const editButton = this.page.getByTestId(`PM-MKL-Edit-${index}`);
        await editButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(1000);
        await editButton.click();
        await this.page.waitForTimeout(2000);
        console.log('✅ Edit KRA Clicked');
    }

    // Edit KRA Details
    async selectYear(year) {
        console.log(`Selecting Year: ${year}...`);
        await this.page.waitForTimeout(800);
        await this.page.locator('.react-select__input-container').first().click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('option', { name: year }).click();
    }

    async selectTargetDate(index, day) {
        console.log(`Selecting Target Date ${index}: ${day}...`);
        await this.page.waitForTimeout(800);
        await this.page.getByRole('textbox', { name: 'Target Date' }).nth(index).click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: day, exact: true }).click();
    }

    // Add Tasks to Milestones
    async addTaskToMilestone(milestoneIndex, taskTitle, targetDate1, targetDate2) {
        console.log(`Adding Task to Milestone ${milestoneIndex}: ${taskTitle}...`);
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId(`PM-ACK-Milestone-Add-Task-${milestoneIndex}`).click();
        await this.page.waitForTimeout(1000);

        await this.page.getByTestId(`PM-ACK-Milestone-Task-Title-${milestoneIndex}-0`).click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId(`PM-ACK-Milestone-Task-Title-${milestoneIndex}-0`).fill(taskTitle);

        // Target dates are relative to all textboxes on page
        const dateIndex1 = milestoneIndex === 0 ? 1 : 3;
        const dateIndex2 = milestoneIndex === 0 ? 2 : 4;

        await this.page.waitForTimeout(800);
        await this.page.getByRole('textbox', { name: 'Target Date' }).nth(dateIndex1).click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: targetDate1, exact: true }).click();

        await this.page.waitForTimeout(800);
        await this.page.getByRole('textbox', { name: 'Target Date' }).nth(dateIndex2).click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: targetDate2, exact: true }).click();

        console.log('✅ Task Added to Milestone');
    }

    async publishKra() {
        console.log('Publishing KRA...');
        await this.page.waitForTimeout(1500);
        await this.page.getByTestId('PM-ACK-Publish-Button').click();
        await this.page.waitForTimeout(3000);
        console.log('✅ KRA Published');
    }

    // Check-in KRA
    async clickCheckIn(index = 0) {
        console.log(`Clicking Check-in ${index}...`);
        await this.page.getByTestId(`PM-MKL-CheckIn-${index}`).click();
        await this.page.waitForTimeout(2000);
    }

    async expandMilestone() {
        console.log('Expanding Milestone...');
        await this.page.getByRole('button', { name: 'Expand milestone' }).first().click();
        await this.page.waitForTimeout(1000);
    }

    async setMilestoneProgress(value) {
        console.log(`Setting Milestone Progress: ${value}%...`);
        const slider = this.page.getByRole('slider').first();
        await slider.waitFor({ state: 'visible' });
        await slider.fill(value);
        await this.page.waitForTimeout(500);
    }

    async selectTaskStatus() {
        console.log('Selecting Task Status...');
        await this.page.locator('.flex.items-center.justify-between.gap-3 > .relative > .border > .lucide').first().click();
        await this.page.waitForTimeout(500);
        await this.page.locator('.text-green-600').first().click();
        await this.page.waitForTimeout(800);
    }

    async saveProgress() {
        console.log('Saving Progress...');
        await this.page.getByTestId('PM-KPS-Save-Button').click();
        await this.page.waitForTimeout(3000);
        console.log('✅ Progress Saved');
    }

    // Performance KRA Tab
    async navigateToPerformanceKraTab() {
        console.log('Navigating to Performance KRA Tab...');
        await this.page.getByTestId('PM-MK-Tab-PerformanceKra').click();
        await this.page.waitForTimeout(1500);
    }

    async clickRating(index = 0) {
        console.log(`Clicking Rating ${index}...`);
        await this.page.getByTestId(`PM-KP-Rating-${index}`).click();
        await this.page.waitForTimeout(1000);
    }

    async selectStarRating(stars) {
        console.log(`Selecting ${stars} Stars...`);
        await this.page.getByTestId(`PM-RP-Star-${stars}`).click();
        await this.page.waitForTimeout(500);
    }

    async fillRatingComment(comment) {
        console.log('Filling Rating Comment...');
        await this.page.getByTestId('PM-RP-Comment-Textarea').click();
        await this.page.waitForTimeout(200);
        await this.page.getByTestId('PM-RP-Comment-Textarea').fill(comment);
        await this.page.waitForTimeout(500);
    }

    async saveRating() {
        console.log('Saving Rating...');
        await this.page.getByTestId('PM-RP-Save-Button').click();
        await this.page.waitForTimeout(2000);
        console.log('✅ Rating Saved');
    }

    // Submit KRA
    async selectAllKras() {
        console.log('Selecting All KRAs...');
        const checkbox = this.page.getByRole('row', { name: 'Sr.No KRA Category KRA Type' }).getByRole('checkbox');
        await checkbox.waitFor({ state: 'visible', timeout: 10000 });
        await checkbox.check();
        await this.page.waitForTimeout(1000);
    }

    async clickSubmit() {
        console.log('Clicking Submit...');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForTimeout(1500);
    }

    async confirmSubmit() {
        console.log('Confirming Submit...');
        await this.page.getByRole('button', { name: 'Confirm' }).click();
        await this.page.waitForTimeout(3000);
        console.log('✅ KRA Submitted');
    }

    // Verify
    async navigateToAllKraTab() {
        console.log('Navigating to All KRA Tab...');
        await this.page.getByTestId('PM-MK-Tab-AllKra').click();
        await this.page.waitForTimeout(2000);
    }
}

export default MyKraPage;
