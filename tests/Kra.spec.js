import { test, expect } from '@playwright/test';

test('KRA Management with New Dataset', async ({ page }) => {
  // Set slower timeout for stability
  test.setTimeout(180000); // 3 minutes

  // Generate unique identifiers using timestamp
  const timestamp = Date.now();
  const categoryName = `Category_${timestamp}`;
  const templateName = `Template_AutoTest_${timestamp}`;
  const milestone1Title = `Milestone_Primary_${timestamp}`;
  const milestone2Title = `Milestone_Secondary_${timestamp}`;
  const taskTitle = `Task_Initial_${timestamp}`;

  // Helper function for waiting
  const waitAndClick = async (locator, description = '') => {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(200); // Small delay for stability
    await locator.click();
    console.log(`Clicked: ${description}`);
  };

  const waitAndFill = async (locator, text, description = '') => {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(150);
    await locator.clear();
    await locator.fill(text);
    console.log(`Filled: ${description} with "${text}"`);
  };

  // Login
  await page.goto('https://qa.d3kq8oy4csoq2n.amplifyapp.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('SI-username-input-password'), 'Username field');
  await waitAndFill(page.getByTestId('SI-username-input-password'), 'ritesh@gmail.com', 'Username');

  await waitAndClick(page.getByTestId('SI-password-input-password'), 'Password field');
  await waitAndFill(page.getByTestId('SI-password-input-password'), 'Ritesh@123', 'Password');

  await page.getByTestId('SI-password-input-password').press('Enter');
  await page.waitForTimeout(2000);

  // Select Organization
  await waitAndClick(page.getByTestId('CG-org-card-571bf643-60d5-4e9c-9c99-b8a52ca1832a'), 'Organization card');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Navigate to KRA Configuration
  await waitAndClick(page.getByTestId('menu-item-kra-management'), 'KRA Management menu');
  await page.waitForTimeout(800);

  await waitAndClick(page.getByTestId('submenu-item-kra-configuration'), 'KRA Configuration submenu');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('KM-KT-Apply-Config-Button'), 'Apply Config button');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('KM-KC-CS-exit'), 'Exit config');
  await page.waitForTimeout(800);

  // Add New Category with unique name
  await waitAndClick(page.getByTestId('KM-KC-Tab-Categories'), 'Categories tab');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('KM-KC-Add-Category-Button'), 'Add Category button');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('KM-KC-ANC-CN'), 'Category name field');
  await waitAndFill(page.getByTestId('KM-KC-ANC-CN'), categoryName, 'Category name');

  await waitAndClick(page.getByTestId('KM-KC-ANC-Description'), 'Category description');
  await waitAndFill(page.getByTestId('KM-KC-ANC-Description'), 'Auto-generated category for testing purposes', 'Category description');

  await waitAndClick(page.getByTestId('KM-KC-ANC-close btn'), 'Close category dialog');
  await page.waitForTimeout(1000);

  // Add New Template with unique data
  await waitAndClick(page.getByTestId('KM-KC-Tab-Templates'), 'Templates tab');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('KM-KT-Add-Template-Button'), 'Add Template button');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('KM-KC-CNT-TN'), 'Template name field');
  await waitAndFill(page.getByTestId('KM-KC-CNT-TN'), templateName, 'Template name');

  // Select Category
  await page.waitForTimeout(800);
  await waitAndClick(page.locator('.css-15ol6m4').first(), 'Category dropdown');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('option', { name: 'ewfew' }), 'Category option');

  // Set End Date
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('KM-KC-CNT-End-Date'), 'End date picker');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('button', { name: '22' }), 'Date 22');

  // Select Role
  await page.waitForTimeout(800);
  await waitAndClick(page.locator('.grid.grid-cols-1.md\\:grid-cols-2.gap-6 > div > .w-full > .css-p25h17-control > .css-hlgwow > .css-15ol6m4').first(), 'Role dropdown');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('option', { name: 'Developer' }), 'Developer role');

  // Add Description
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('KM-KT-Description-Input'), 'Template description');
  await waitAndFill(page.getByTestId('KM-KT-Description-Input'), 'Automated test template with comprehensive milestones and tasks for performance tracking', 'Template description');

  // Add First Milestone
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('KM-KT-Add-Milestone-Button'), 'Add Milestone button');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('KM-KC-KTM-K-title'), 'Milestone 1 title');
  await waitAndFill(page.getByTestId('KM-KC-KTM-K-title'), milestone1Title, 'Milestone 1 title');

  await waitAndClick(page.getByTestId('KM-KC-KTM-weightage'), 'Milestone 1 weightage');
  await waitAndFill(page.getByTestId('KM-KC-KTM-weightage'), '40', 'Milestone 1 weightage');

  await waitAndClick(page.getByTestId('KM-KC-KTM-Description'), 'Milestone 1 description');
  await waitAndFill(page.getByTestId('KM-KC-KTM-Description'), 'Primary milestone focused on core deliverables and key objectives', 'Milestone 1 description');

  // Add Second Milestone
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('KM-KT-Add-Milestone-Small-Button'), 'Add second milestone');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('KM-KC-KTM-K-title').nth(1), 'Milestone 2 title');
  await waitAndFill(page.getByTestId('KM-KC-KTM-K-title').nth(1), milestone2Title, 'Milestone 2 title');

  await waitAndClick(page.getByTestId('KM-KC-KTM-weightage').nth(1), 'Milestone 2 weightage');
  await waitAndFill(page.getByTestId('KM-KC-KTM-weightage').nth(1), '35', 'Milestone 2 weightage');

  await waitAndClick(page.getByTestId('KM-KC-KTM-Description').nth(1), 'Milestone 2 description');
  await waitAndFill(page.getByTestId('KM-KC-KTM-Description').nth(1), 'Secondary milestone for supporting activities and quality metrics', 'Milestone 2 description');

  // Add Task
  await page.waitForTimeout(800);
  await waitAndClick(page.getByTestId('KM-KT-Add-Task-Button'), 'Add Task button');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('KM-KT-Task-Title-0'), 'Task title');
  await waitAndFill(page.getByTestId('KM-KT-Task-Title-0'), taskTitle, 'Task title');

  await waitAndClick(page.getByTestId('KM-KT-Task-Description-0'), 'Task description');
  await waitAndFill(page.getByTestId('KM-KT-Task-Description-0'), 'Initial task setup for baseline activities and requirement analysis', 'Task description');

  // Save Template
  await page.waitForTimeout(1000);
  await waitAndClick(page.getByTestId('KM-KC-CNT-Save-button'), 'Save template');
  await page.waitForTimeout(2000);

  // Navigate to Performance > My KRA
  await waitAndClick(page.getByTestId('submenu-item--assign-kra'), 'Assign KRA submenu');
  await page.waitForTimeout(800);

  await waitAndClick(page.getByTestId('menu-item-kra-management'), 'KRA Management menu');
  await page.waitForTimeout(800);

  await waitAndClick(page.getByTestId('menu-item-performance'), 'Performance menu');
  await page.waitForTimeout(800);

  await waitAndClick(page.getByTestId('submenu-item-my-kra'), 'My KRA submenu');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Add KRA from Template
  await waitAndClick(page.getByTestId('PM-MKL-Add-Kra'), 'Add KRA button');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('PM-MKL-Add-Copy-Template'), 'Copy from Template');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('KM-KTC-Checkbox-0'), 'Template checkbox');
  await page.waitForTimeout(500);

  await waitAndClick(page.getByTestId('KM-KTC-Copy-Multiple-Button'), 'Copy Multiple button');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByRole('button', { name: 'Copy', exact: true }), 'Confirm Copy');
  await page.waitForTimeout(3000); // Wait for KRA to be created

  // Clear year filter and edit
  await waitAndClick(page.getByTestId('PM-MKL-Year-Clear'), 'Clear year filter');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Wait for Edit button to be enabled and click
  const editButton = page.getByTestId('PM-MKL-Edit-0');
  await editButton.waitFor({ state: 'visible', timeout: 10000 });
  await expect(editButton).toBeEnabled({ timeout: 10000 });
  await page.waitForTimeout(1000);
  await editButton.click();
  console.log('Clicked Edit button');
  await page.waitForTimeout(2000);

  // Set Year
  await page.waitForTimeout(800);
  await waitAndClick(page.locator('.react-select__input-container').first(), 'Year dropdown');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('option', { name: '-2026' }), 'Year 2026');

  // Set Target Dates
  await page.waitForTimeout(800);
  await waitAndClick(page.getByRole('textbox', { name: 'Target Date' }).first(), 'First target date');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('button', { name: '17' }), 'Date 17');

  // Add tasks to milestones with unique names
  const dynamicTaskName1 = `DynamicTask_M1_${timestamp}`;
  await page.waitForTimeout(1000);
  await waitAndClick(page.getByTestId('PM-ACK-Milestone-Add-Task-0'), 'Add task to Milestone 1');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('PM-ACK-Milestone-Task-Title-0-0'), 'Task 1 title');
  await waitAndFill(page.getByTestId('PM-ACK-Milestone-Task-Title-0-0'), dynamicTaskName1, 'Task 1 title');

  await page.waitForTimeout(800);
  await waitAndClick(page.getByRole('textbox', { name: 'Target Date' }).nth(1), 'Task 1 target date 1');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('button', { name: '7', exact: true }), 'Date 7');

  await page.waitForTimeout(800);
  await waitAndClick(page.getByRole('textbox', { name: 'Target Date' }).nth(2), 'Task 1 target date 2');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('button', { name: '7', exact: true }), 'Date 7');

  const dynamicTaskName2 = `DynamicTask_M2_${timestamp}`;
  await page.waitForTimeout(1000);
  await waitAndClick(page.getByTestId('PM-ACK-Milestone-Add-Task-1'), 'Add task to Milestone 2');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('PM-ACK-Milestone-Task-Title-1-0'), 'Task 2 title');
  await waitAndFill(page.getByTestId('PM-ACK-Milestone-Task-Title-1-0'), dynamicTaskName2, 'Task 2 title');

  await page.waitForTimeout(800);
  await waitAndClick(page.getByRole('textbox', { name: 'Target Date' }).nth(3), 'Task 2 target date 1');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('button', { name: '5', exact: true }), 'Date 5');

  await page.waitForTimeout(800);
  await waitAndClick(page.getByRole('textbox', { name: 'Target Date' }).nth(4), 'Task 2 target date 2');
  await page.waitForTimeout(500);
  await waitAndClick(page.getByRole('button', { name: '8', exact: true }), 'Date 8');

  // Publish KRA
  await page.waitForTimeout(1500);
  await waitAndClick(page.getByTestId('PM-ACK-Publish-Button'), 'Publish KRA');
  await page.waitForTimeout(3000); // Wait for publishing to complete

  // Check-in KRA
  //   await page.waitForTimeout(1000);
  //   const templateLink = page.getByText(templateName).first();
  //   await templateLink.waitFor({ state: 'visible', timeout: 10000 });
  //   await templateLink.click();
  //   await page.waitForTimeout(500);
  //   await templateLink.click(); // Double click
  //   await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('PM-MKL-CheckIn-0'), 'Check-in button');
  await page.waitForTimeout(2000);

  // Update Progress
  await waitAndClick(page.getByRole('button', { name: 'Expand milestone' }).first(), 'Expand Milestone 1');
  await page.waitForTimeout(1000);

  const slider1 = page.getByRole('slider').first();
  await slider1.waitFor({ state: 'visible' });
  await slider1.fill('53');
  await page.waitForTimeout(500);

  await waitAndClick(page.locator('.flex.items-center.justify-between.gap-3 > .relative > .border > .lucide').first(), 'Task dropdown 1');
  await page.waitForTimeout(500);
  await waitAndClick(page.locator('.text-green-600').first(), 'Select status 1');
  await page.waitForTimeout(800);

  //   await waitAndClick(page.getByRole('button', { name: 'Expand milestone' }).nth(1), 'Expand Milestone 2');
  //   await page.waitForTimeout(1000);

  //   const slider2 = page.getByRole('slider').nth(1);
  //   await slider2.waitFor({ state: 'visible' });
  //   await slider2.fill('38');
  //   await page.waitForTimeout(500);

  //   await waitAndClick(page.locator('div:nth-child(3) > .pl-6 > .flex.items-center.justify-between.gap-3 > .relative > .border > .lucide'), 'Task dropdown 2');
  //   await page.waitForTimeout(500);
  //   await waitAndClick(page.locator('.px-3.py-2 > .text-green-600').first(), 'Select status 2');
  //   await page.waitForTimeout(800);

  //   await waitAndClick(page.locator('div').filter({ hasText: /^Not Started$/ }).nth(5), 'Task status dropdown');
  //   await page.waitForTimeout(500);
  //   await waitAndClick(page.locator('.px-3.py-2 > .text-green-600').first(), 'Select status 3');
  //   await page.waitForTimeout(1000);

  // Save Progress
  await waitAndClick(page.getByTestId('PM-KPS-Save-Button'), 'Save progress');
  await page.waitForTimeout(3000);

  // Rate Performance
  await waitAndClick(page.getByTestId('PM-MK-Tab-PerformanceKra'), 'Performance KRA tab');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByTestId('PM-KP-Rating-0'), 'Rating button');
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByTestId('PM-RP-Star-4'), 'Star 4');
  await page.waitForTimeout(500);

  await waitAndClick(page.getByTestId('PM-RP-Comment-Textarea'), 'Comment textarea');
  await waitAndFill(page.getByTestId('PM-RP-Comment-Textarea'), 'Excellent progress with strong execution on key deliverables', 'Rating comment');
  await page.waitForTimeout(500);

  await waitAndClick(page.getByTestId('PM-RP-Save-Button'), 'Save rating');
  await page.waitForTimeout(2000);

  // Submit KRA
  const checkbox = page.getByRole('row', { name: 'Sr.No KRA Category KRA Type' }).getByRole('checkbox');
  await checkbox.waitFor({ state: 'visible', timeout: 10000 });
  await checkbox.check();
  await page.waitForTimeout(1000);

  await waitAndClick(page.getByRole('button', { name: 'Submit' }), 'Submit button');
  await page.waitForTimeout(1500);

  await waitAndClick(page.getByRole('button', { name: 'Confirm' }), 'Confirm submit');
  await page.waitForTimeout(3000);

  // Verify in All KRA tab
  await waitAndClick(page.getByTestId('PM-MK-Tab-AllKra'), 'All KRA tab');
  await page.waitForTimeout(2000);

//   const finalTemplateLink = page.getByText(templateName).first();
//   await finalTemplateLink.waitFor({ state: 'visible', timeout: 10000 });
//   await finalTemplateLink.click();
//   await page.waitForTimeout(1000);

  console.log('✅ Test completed successfully!');
});