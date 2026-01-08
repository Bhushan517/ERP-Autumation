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

    // --- New Methods for Edit, Filter, Delete ---

    async selectManager(managerName) {
        await this.page.getByTestId('UM-AE-Manager').click();
        await this.page.waitForTimeout(800);
        await this.page.getByTestId('UM-AE-Manager').fill(managerName);
        await this.page.waitForTimeout(1000);
        await this.page.locator('div[role="listbox"], .absolute, .z-50').getByText(managerName, { exact: false }).first().click();
    }

    async clickEditUser(rowIndex = 1) {
        await this.page.getByRole('row').nth(rowIndex).getByTestId('UM-emp-list-edit-btn').click();
        await this.page.waitForTimeout(1500);
    }

    async clickUpdateUser() {
        await this.page.getByRole('button', { name: 'Update' }).click();
        await this.page.waitForTimeout(2000);
    }

    async openFilter() {
        await this.page.getByTestId('UM-emp-list-filter-btn').click();
        await this.page.waitForTimeout(800);
    }

    async applyFilter(filterData) {
        // filterData = { manager, department, location, status }
        if (filterData.manager) {
            await this.page.getByTestId('UM-user-filter-manager-search').click();
            await this.page.getByTestId('UM-user-filter-manager-search').fill(filterData.manager);
            await this.page.waitForTimeout(1000);
            await this.page.locator('div[role="listbox"], .absolute, .z-50').getByText(filterData.manager, { exact: false }).first().click();
            await this.page.waitForTimeout(800);
        }
        if (filterData.department) {
            await this.page.getByTestId('UM-user-filter-dept-search').click();
            await this.page.waitForTimeout(800);
            await this.page.getByText(filterData.department, { exact: true }).last().click();
            await this.page.waitForTimeout(800);
        }
        if (filterData.location) {
            await this.page.getByTestId('UM-user-filter-loc-search').click();
            await this.page.waitForTimeout(800);
            await this.page.getByText(filterData.location, { exact: true }).click();
            await this.page.waitForTimeout(800);
        }
        if (filterData.status) {
            await this.page.getByTestId('UM-user-filter-status').click();
            await this.page.waitForTimeout(800);
            await this.page.getByText(filterData.status, { exact: true }).click();
            await this.page.waitForTimeout(1000);
        }

        await this.page.getByTestId('UM-user-filter-apply-btn').click();
        await this.page.waitForTimeout(2000);
    }

    async resetFilterButtons() {
        await this.page.getByTestId('UM-user-filter-reset-btn').click();
        await this.page.waitForTimeout(2000);
        await this.page.getByTestId('UM-user-filter-apply-btn').click();
        await this.page.waitForTimeout(2000);
    }

    async deleteUser(rowIndex = 1) {
        await this.page.getByRole('row').nth(rowIndex).getByTestId('UM-emp-list-delete-btn').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByTestId('UM-emp-list-delete-popup-confirm').click();
        await this.page.waitForTimeout(2000);
    }

    async selectDepartment(departmentName) {
        await this.page.getByTestId('UM-AE-Search Department').click();
        await this.page.waitForTimeout(800);
        await this.page.getByText(departmentName, { exact: true }).last().click();
    }

    async selectJoiningDate(day) {
        await this.page.getByTestId('UM-AE-Joining Date').click();
        await this.page.waitForTimeout(800);
        // Using robust selector scoped to calendar
        await this.page.locator('button.h-5.w-5').filter({ hasText: new RegExp(`^${day}$`) }).click();
    }

    async updateBasicInfo(firstName, lastName) {
        await this.page.getByTestId('UM-AE-First Name').fill(firstName);
        await this.page.waitForTimeout(300);
        await this.page.getByTestId('UM-AE-Last Name').fill(lastName);
        await this.page.waitForTimeout(500);
    }
}

export default UserManagementPage;
