import { test, expect } from '@playwright/test';

test('KRA Complete Workflow with Auto-generated Data', async ({ page }) => {
  // Set slower timeout for stability
  test.setTimeout(240000); // 4 minutes

  // Generate unique identifiers using timestamp
  const timestamp = Date.now();
  const templateName = `KRA_Template_${timestamp}`;
  const milestoneTitle = `Milestone_Core_${timestamp}`;
  const taskTitle = `Task_Primary_${timestamp}`;
  const dynamicTaskName = `DynamicTask_Add_${timestamp}`;

  // Helper function for waiting and clicking
  const waitAndClick = async (locator, description = '') => {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(200); // Reduced from 500ms
    await locator.click();
    console.log(`✓ Clicked: ${description}`);
  };

  const waitAndFill = async (locator, text, description = '') => {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(150); // Reduced from 300ms
    await locator.clear();
    await locator.fill(text);
    console.log(`✓ Filled: ${description} with "${text}"`);
  };

  // Login
  console.log('🔐 Starting Login...');
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('SI-username-input-password'), 'Username field');
  await waitAndFill(page.getByTestId('SI-username-input-password'), 'ritesh@gmail.com', 'Username');

  await waitAndClick(page.getByTestId('SI-password-input-password'), 'Password field');
  await waitAndFill(page.getByTestId('SI-password-input-password'), 'Ritesh@123', 'Password');

  await waitAndClick(page.getByTestId('SI-submit-button-show'), 'Submit button');
  await page.waitForTimeout(2500);

  // Select Organization
  console.log('🏢 Selecting Organization...');
  await waitAndClick(page.getByTestId('CG-org-card-571bf643-60d5-4e9c-9c99-b8a52ca1832a'), 'Organization card');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Navigate to KRA Configuration
  console.log('⚙️ Navigating to KRA Configuration...');
  await waitAndClick(page.getByTestId('menu-item-kra-management'), 'KRA Management menu');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('submenu-item-kra-configuration'), 'KRA Configuration submenu');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  await waitAndClick(page.getByTestId('KM-KT-Apply-Config-Button'), 'Apply Config button');
  await page.waitForTimeout(1500);

  // Configure settings
  await waitAndClick(page.locator('div:nth-child(4) > .relative > .absolute'), 'Configuration option');
  await page.waitForTimeout(800);

  await waitAndClick(page.getByTestId('KM-KC-CS-Save-Button'), 'Save Config button');
  await page.waitForTimeout(2000);

  // Add New Template
  console.log('📝 Creating New Template...');
  await waitAndClick(page.getByTestId('KM-KT-Add-Template-Button'), 'Add Template button');
  await page.waitForTimeout(2000);

  await waitAndClick(page.getByTestId('KM-KC-CNT-TN'), 'Template name field');
  await waitAndFill(page.getByTestId('KM-KC-CNT-TN'), templateName, 'Template name');

  // Select Category
  await page.waitForTimeout(800);
  await waitAndClick(page.locator('.css-15ol6m4').first(), 'Category dropdown');
  await page.waitForTimeout(600);
  await waitAndClick(page.getByRole('option', { name: 'ewfew' }), 'Category option');

  // Set End Date
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('KM-KC-CNT-End-Date'), 'End date picker');
  await page.waitForTimeout(600);
  await waitAndClick(page.getByRole('button', { name: '22' }), 'Date 22');

  // Select Department
  await page.waitForTimeout(800);
  await waitAndClick(page.locator('div').filter({ hasText: /^Select Department$/ }).nth(2), 'Department dropdown');
  await page.waitForTimeout(600);
  await waitAndClick(page.getByRole('option', { name: 'Developer' }), 'Developer option');

  // Add Description
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('KM-KT-Description-Input'), 'Template description');
  await waitAndFill(page.getByTestId('KM-KT-Description-Input'), 'Comprehensive template for automated testing and performance evaluation', 'Template description');

  // Add Milestone
  console.log('🎯 Adding Milestone...');
  await page.waitForTimeout(1000);
  await waitAndClick(page.getByTestId('KM-KT-Add-Milestone-Button'), 'Add Milestone button');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('KM-KC-KTM-K-title'), 'Milestone title');
  await waitAndFill(page.getByTestId('KM-KC-KTM-K-title'), milestoneTitle, 'Milestone title');

  await waitAndClick(page.getByTestId('KM-KC-KTM-weightage'), 'Milestone weightage');
  await waitAndFill(page.getByTestId('KM-KC-KTM-weightage'), '30', 'Milestone weightage');

  await waitAndClick(page.getByTestId('KM-KC-KTM-Description'), 'Milestone description');
  await waitAndFill(page.getByTestId('KM-KC-KTM-Description'), 'Core milestone for primary objectives and deliverables', 'Milestone description');

  // Add Task
  console.log('✅ Adding Task...');
  await page.waitForTimeout(1000);
  await waitAndClick(page.getByTestId('KM-KT-Add-Task-Button'), 'Add Task button');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('KM-KT-Task-Title-0'), 'Task title');
  await waitAndFill(page.getByTestId('KM-KT-Task-Title-0'), taskTitle, 'Task title');

  await waitAndClick(page.getByTestId('KM-KT-Task-Description-0'), 'Task description');
  await waitAndFill(page.getByTestId('KM-KT-Task-Description-0'), 'Initial task for baseline setup and requirements', 'Task description');

  // Save Template
  await page.waitForTimeout(1200);
  await waitAndClick(page.getByTestId('KM-KC-CNT-Save-button'), 'Save Template button');
  await page.waitForTimeout(3000);

  // Navigate to Performance > My KRA
  console.log('📊 Navigating to My KRA...');
  await waitAndClick(page.getByTestId('submenu-item--assign-kra'), 'Assign KRA submenu');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('menu-item-kra-management'), 'KRA Management menu');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('menu-item-performance'), 'Performance menu');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('submenu-item-my-kra'), 'My KRA submenu');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2500);

  // Add KRA from Template
  console.log('➕ Adding KRA from Template...');
  await waitAndClick(page.getByTestId('PM-MKL-Add-Kra'), 'Add KRA button');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('PM-MKL-Add-Copy-Template'), 'Copy from Template');
  await page.waitForTimeout(2000);

  await waitAndClick(page.getByTestId('KM-KTC-Checkbox-0'), 'Template checkbox');
  await page.waitForTimeout(600);

  await waitAndClick(page.getByTestId('KM-KTC-Copy-Multiple-Button'), 'Copy Multiple button');
  await page.waitForTimeout(1200);

  await waitAndClick(page.getByRole('button', { name: 'Copy', exact: true }), 'Confirm Copy');
  await page.waitForTimeout(4000);

  // Clear year filter and edit
  console.log('✏️ Editing KRA...');
  await waitAndClick(page.getByTestId('PM-MKL-Year-Clear'), 'Clear year filter');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2500);

  // Wait for Edit button to be enabled
  const editButton = page.getByTestId('PM-MKL-Edit-0');
  await editButton.waitFor({ state: 'visible', timeout: 10000 });
  await expect(editButton).toBeEnabled({ timeout: 15000 });
  await page.waitForTimeout(1500);
  await editButton.click();
  console.log('✓ Clicked Edit button');
  await page.waitForTimeout(2500);

  // Set Year
  await page.waitForTimeout(1000);
  await waitAndClick(page.locator('.react-select__input-container').first(), 'Year dropdown');
  await page.waitForTimeout(600);
  await waitAndClick(page.getByRole('option', { name: '-2026' }), 'Year 2026');

  // Set Target Date
  await page.waitForTimeout(1000);
  await waitAndClick(page.getByRole('textbox', { name: 'Target Date' }).first(), 'First target date');
  await page.waitForTimeout(600);
  await waitAndClick(page.getByRole('button', { name: '8', exact: true }), 'Date 8');

  // Add Task to Milestone
  console.log('➕ Adding Additional Task...');
  await page.waitForTimeout(1200);
  await waitAndClick(page.getByTestId('PM-ACK-Milestone-Add-Task-0'), 'Add Task to Milestone');
  await page.waitForTimeout(1500);

  await waitAndClick(page.locator('.text-\\[var\\(--secondary-text-color\\)\\].transition'), 'Task field');
  await page.waitForTimeout(800);

  await waitAndClick(page.getByRole('textbox', { name: 'Target Date' }).nth(1), 'Task target date');
  await page.waitForTimeout(600);
  await waitAndClick(page.getByRole('button', { name: '14' }), 'Date 14');

  // Publish KRA (First attempt - will show validation)
  await page.waitForTimeout(1500);
  await waitAndClick(page.getByTestId('PM-ACK-Publish-Button'), 'Publish button (validation)');
  await page.waitForTimeout(2000);

  // Add proper task details
  console.log('📝 Adding Task Details...');
  await waitAndClick(page.getByTestId('PM-ACK-Milestone-Add-Task-0'), 'Add Task again');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('PM-ACK-Milestone-Task-Title-0-0'), 'Dynamic task title');
  await waitAndFill(page.getByTestId('PM-ACK-Milestone-Task-Title-0-0'), dynamicTaskName, 'Dynamic task title');

  await page.waitForTimeout(800);
  await waitAndClick(page.getByRole('textbox', { name: 'Target Date' }).nth(1), 'Dynamic task target date');
  await page.waitForTimeout(600);
  await waitAndClick(page.getByRole('button', { name: '6', exact: true }), 'Date 6');

  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('PM-ACK-Milestone-Task-Description-0-0'), 'Dynamic task description');
  await waitAndFill(page.getByTestId('PM-ACK-Milestone-Task-Description-0-0'), 'Additional task for milestone completion and tracking', 'Dynamic task description');

  // Publish KRA (Final)
  await page.waitForTimeout(1500);
  await waitAndClick(page.getByTestId('PM-ACK-Publish-Button'), 'Publish KRA (Final)');
  await page.waitForTimeout(4000);

  // Navigate to My Approval
  console.log('✅ Processing Approvals...');
  await waitAndClick(page.getByTestId('PM-MK-Tab-MyApproval'), 'My Approval tab');
  await page.waitForTimeout(2000);

  await waitAndClick(page.getByTestId('PM-KW-Row-0'), 'KRA workflow row');
  await page.waitForTimeout(2000);

  await waitAndClick(page.getByTestId('PM-KWD-Tab-workflow'), 'Workflow tab');
  await page.waitForTimeout(1500);

  // Approve Level 0
  await waitAndClick(page.getByTestId('am_ar_ard_w_level_header_0'), 'Level 0 header');
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('AM-AR-ARD-W-approve-button-0-0'), 'Approve Level 0');
  await page.waitForTimeout(2000);

  // Approve Level 1
  await waitAndClick(page.getByTestId('am_ar_ard_w_level_header_1'), 'Level 1 header');
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('AM-AR-ARD-W-approve-button-1-0'), 'Approve Level 1');
  await page.waitForTimeout(2000);

  // Go back to KRA details
  await waitAndClick(page.getByTestId('PM-KWD-Tab-kra-details'), 'KRA Details tab');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('PM-KWD-Back-Button'), 'Back button');
  await page.waitForTimeout(2000);

  // Navigate to Performance KRA
  console.log('📈 Updating Progress...');
  await waitAndClick(page.getByTestId('PM-MK-Tab-PerformanceKra'), 'Performance KRA tab');
  await page.waitForTimeout(2500);

  // Check-in KRA
  await waitAndClick(page.getByTestId('PM-KP-CheckIn-0'), 'Check-in button');
  await page.waitForTimeout(2500);

  // Set Status
  await waitAndClick(page.locator('div').filter({ hasText: /^Status$/ }).nth(1), 'Status dropdown');
  await page.waitForTimeout(600);
  await waitAndClick(page.getByText('On Track'), 'On Track status');

  // Expand milestone
  await page.waitForTimeout(1000);
  await waitAndClick(page.locator('div').filter({ hasText: /^Not Started$/ }).first(), 'Milestone header');
  await page.waitForTimeout(800);

  await waitAndClick(page.getByRole('button', { name: 'Expand milestone' }), 'Expand milestone');
  await page.waitForTimeout(1500);

  // Update progress slider
  const slider = page.getByRole('slider');
  await slider.waitFor({ state: 'visible' });
  await slider.fill('86');
  console.log('✓ Set progress to 86%');
  await page.waitForTimeout(1000);

  // Update task statuses
  await waitAndClick(page.locator('div').filter({ hasText: /^Not Started$/ }).nth(3), 'Task status 1');
  await page.waitForTimeout(600);
  await waitAndClick(page.locator('.text-green-600').first(), 'Select status 1');
  await page.waitForTimeout(1000);

  await waitAndClick(page.locator('div').filter({ hasText: /^Not Started$/ }).nth(1), 'Task status 2');
  await page.waitForTimeout(600);
  await waitAndClick(page.locator('.text-green-600').first(), 'Select status 2');
  await page.waitForTimeout(1000);

  await waitAndClick(page.locator('div').filter({ hasText: /^Not Started$/ }).nth(1), 'Task status 3');
  await page.waitForTimeout(600);
  await waitAndClick(page.locator('.px-3.py-2 > .text-green-600'), 'Select status 3');
  await page.waitForTimeout(1000);

  // Save Progress
  await waitAndClick(page.getByTestId('PM-KPS-Save-Button'), 'Save progress');
  await page.waitForTimeout(3000);

  // Submit KRA
  console.log('📤 Submitting KRA...');
  const checkbox1 = page.getByRole('row', { name: 'Sr.No KRA Category KRA Type' }).getByRole('checkbox');
  await checkbox1.waitFor({ state: 'visible', timeout: 10000 });
  await checkbox1.check();
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByRole('button', { name: 'Submit' }), 'Submit button');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByRole('button', { name: 'Confirm' }), 'Confirm submit');
  await page.waitForTimeout(3000);

  // Rate Performance
  console.log('⭐ Rating Performance...');
  await waitAndClick(page.getByTestId('PM-KP-Rating-0'), 'Rating button');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('PM-RP-Star-5'), 'Star 5');
  await page.waitForTimeout(600);

  await waitAndClick(page.getByTestId('PM-RP-Comment-Textarea'), 'Comment textarea');
  await waitAndFill(page.getByTestId('PM-RP-Comment-Textarea'), 'Outstanding performance with exceptional results and strong execution', 'Rating comment');
  await page.waitForTimeout(600);

  await waitAndClick(page.getByTestId('PM-RP-Save-Button'), 'Save rating');
  await page.waitForTimeout(2500);

  // Submit final rating
  const checkbox2 = page.getByRole('row', { name: 'Sr.No KRA Category KRA Type' }).getByRole('checkbox');
  await checkbox2.waitFor({ state: 'visible', timeout: 10000 });
  await checkbox2.check();
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByRole('button', { name: 'Submit' }), 'Submit rating');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByRole('button', { name: 'Confirm' }), 'Confirm rating submit');
  await page.waitForTimeout(3000);

  // Navigate to Team KRA
  console.log('👥 Checking Team KRA...');
  await waitAndClick(page.getByTestId('submenu-item-team-kra'), 'Team KRA submenu');
  await page.waitForTimeout(2500);

  await waitAndClick(page.getByTestId('PM-TK-Kra-Count-0'), 'KRA count');
  await page.waitForTimeout(2000);

  await waitAndClick(page.getByTestId('PM-VTK-Rating-0'), 'View team rating');
  await page.waitForTimeout(2000);

  // Expand sections
  await waitAndClick(page.locator('.flex.items-center.justify-between > button'), 'Expand button');
  await page.waitForTimeout(1000);

 

  console.log('✅ Test completed successfully!');
});