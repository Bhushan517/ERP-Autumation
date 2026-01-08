class UserManagementPage {
    constructor(page) {
        this.page = page;
    }

    // Navigate to User Management
    async navigateToUsers() {
        await this.page.getByTestId('menu-item-user-management').click();
        await this.page.getByTestId('submenu-item-users').click();
        await this.page.waitForTimeout(1000);
    }

    // Click Add Employee button
    async clickAddEmployee() {
        await this.page.getByTestId('UM-emp-list-add-btn').click();
        await this.page.waitForTimeout(500);
    }

    // Fill Personal Information
    async fillPersonalInfo(firstName, lastName, email, phone) {
        await this.page.getByTestId('UM-AE-First Name').fill(firstName);
        await this.page.getByTestId('UM-AE-Last Name').fill(lastName);
        await this.page.getByTestId('UM-AE-Email').fill(email);
        await this.page.getByTestId('UM-AE-FaCheckCircle icon3').click();
        await this.page.waitForTimeout(800);

        await this.page.getByTestId('UM-AE-Phone number').fill(phone);
        await this.page.locator('.flex.items-center.gap-2.w-full > .cursor-pointer > path').click();
        await this.page.waitForTimeout(800);
    }

    // Fill Official Information
    async fillOfficialInfo(email, designation, currentDate) {
        await this.page.getByTestId('UM-AE-Official Email').fill(email);

        // Select Manager
        await this.page.getByTestId('UM-AE-Manager').click();
        await this.page.locator('.p-2.text-\\[var\\(--text-color\\)\\].hover\\:bg-\\[var\\(--secondary-background-color\\)\\]').first().click();

        // Select Role
        await this.page.getByTestId('UM-AE-Role').click();
        await this.page.getByText('Admin', { exact: true }).click();

        // Fill Designation
        await this.page.getByTestId('UM-AE-Designation').fill(designation);

        // Select Joining Date
        await this.page.getByTestId('UM-AE-Joining Date').click();
        await this.page.waitForTimeout(500);
        await this.page.locator('button.h-5.w-5').filter({ hasText: new RegExp(`^${currentDate}$`) }).click();
    }

    // Fill Emergency Contact
    async fillEmergencyContact(contactName, relationship, phone) {
        await this.page.getByTestId('UM-AE-Emergency Contact Name').fill(contactName);

        await this.page.getByTestId('UM-AE-Relationship').click();
        await this.page.getByText(relationship).click();

        await this.page.locator('#emergency_contact_phone').fill(phone);
    }

    // Select Location and Department
    async selectLocationAndDepartment(location) {
        await this.page.getByTestId('UM-AE-Search Location').click();
        await this.page.getByText(location, { exact: true }).click();

        await this.page.getByTestId('UM-AE-Search Department').first().click();
        // Department selection commented as per original code
    }

    // Set Attendance Type
    async setAttendanceType() {
        await this.page.getByTestId('UM-AE-Geofencing').check();
    }

    // Save User
    async saveUser() {
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(2000);
    }

    // View User Details
    async viewUserDetails(firstName, lastName) {
        const fullName = `Mr ${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;
        await this.page.getByText(fullName).first().click();
        await this.page.waitForTimeout(1000);
    }

    // Navigate through user detail tabs
    async navigateToTab(tabName) {
        await this.page.getByRole('button', { name: tabName }).click();
        await this.page.waitForTimeout(500);
    }

    // Close user details
    async closeUserDetails() {
        await this.page.locator('.cursor-pointer > path').click();
        await this.page.waitForTimeout(500);
    }

    // Navigate to Roles
    async navigateToRoles() {
        await this.page.getByTestId('submenu-item-roles').click();
    }

    // Complete user creation flow
    async createUser(userData) {
        await this.clickAddEmployee();
        await this.fillPersonalInfo(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.phone
        );
        await this.fillOfficialInfo(
            userData.officialEmail,
            userData.designation,
            userData.joiningDate
        );
        await this.fillEmergencyContact(
            userData.emergencyContactName,
            userData.relationship,
            userData.emergencyPhone
        );
        await this.selectLocationAndDepartment(userData.location);
        await this.setAttendanceType();
        await this.saveUser();
    }

    // View all user detail tabs
    async viewAllUserTabs() {
        await this.navigateToTab('Official Details');
        await this.navigateToTab('Security Settings');
        await this.navigateToTab('Leave Config');
        await this.navigateToTab('Security Settings');
        await this.navigateToTab('Official Details');
        await this.navigateToTab('Personal Details');
    }
}

export default UserManagementPage;
