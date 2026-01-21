import { test } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import KraConfigurationPage from '../pages/kra/KraConfigurationPage.js';
import MyKraPage from '../pages/kra/MyKraPage.js';

test('KRA Management with New Dataset', async ({ page }) => {
  // Set timeout for long test
  test.setTimeout(180000); // 3 minutes

  // Generate unique identifiers using timestamp
  const timestamp = Date.now();
  const categoryName = `Category_${timestamp}`;
  const templateName = `Template_AutoTest_${timestamp}`;
  const milestone1Title = `Milestone_Primary_${timestamp}`;
  const milestone2Title = `Milestone_Secondary_${timestamp}`;
  const taskTitle = `Task_Initial_${timestamp}`;
  const dynamicTaskName1 = `DynamicTask_M1_${timestamp}`;
  const dynamicTaskName2 = `DynamicTask_M2_${timestamp}`;

  // Initialize Page Objects
  const loginPage = new LoginQaPage(page);
  const kraConfigPage = new KraConfigurationPage(page);
  const myKraPage = new MyKraPage(page);

  // Login
  await loginPage.navigateToLogin();
  await loginPage.fillUsername('ritesh@gmail.com');
  await loginPage.fillPassword('Ritesh@123');
  await loginPage.submitLogin();

  // Select Organization
  await loginPage.selectOrganization('571bf643-60d5-4e9c-9c99-b8a52ca1832a');

  // Navigate to KRA Configuration
  await kraConfigPage.navigateToKraManagement();
  await kraConfigPage.navigateToKraConfiguration();

  // Apply and Exit Config
  await kraConfigPage.applyConfig();
  await kraConfigPage.exitConfig();

  // Add New Category
  await kraConfigPage.navigateToCategoriesTab();
  await kraConfigPage.addCategory(
    categoryName,
    'Auto-generated category for testing purposes'
  );

  // Add New Template
  await kraConfigPage.navigateToTemplatesTab();
  await kraConfigPage.clickAddTemplate();
  await kraConfigPage.fillTemplateName(templateName);
  await kraConfigPage.selectCategory('ewfew');
  await kraConfigPage.selectEndDate('22');
  await kraConfigPage.selectRole('Developer');
  await kraConfigPage.fillTemplateDescription(
    'Automated test template with comprehensive milestones and tasks for performance tracking'
  );

  // Add Milestones
  await kraConfigPage.addFirstMilestone(
    milestone1Title,
    '40',
    'Primary milestone focused on core deliverables and key objectives'
  );

  await kraConfigPage.addSecondMilestone(
    milestone2Title,
    '35',
    'Secondary milestone for supporting activities and quality metrics'
  );

  // Add Task
  await kraConfigPage.addTask(
    taskTitle,
    'Initial task setup for baseline activities and requirement analysis'
  );

  // Save Template
  await kraConfigPage.saveTemplate();

  // Navigate to My KRA
  await myKraPage.navigateToAssignKra();
  await kraConfigPage.navigateToKraManagement();
  await myKraPage.navigateToPerformance();
  await myKraPage.navigateToMyKra();

  // Add KRA from Template
  await myKraPage.clickAddKra();
  await myKraPage.clickCopyFromTemplate();
  await myKraPage.selectTemplateCheckbox(0);
  await myKraPage.clickCopyMultiple();
  await myKraPage.confirmCopy();

  // Edit KRA
  await myKraPage.clearYearFilter();
  await myKraPage.clickEditKra(0);

  // Set Year and Target Date
  await myKraPage.selectYear('-2026');
  await myKraPage.selectTargetDate(0, '17');

  // Add Tasks to Milestones
  await myKraPage.addTaskToMilestone(0, dynamicTaskName1, '7', '7');
  await myKraPage.addTaskToMilestone(1, dynamicTaskName2, '5', '8');

  // Publish KRA
  await myKraPage.publishKra();

  // Check-in KRA
  await myKraPage.clickCheckIn(0);

  // Update Progress
  await myKraPage.expandMilestone();
  await myKraPage.setMilestoneProgress('53');
  await myKraPage.selectTaskStatus();
  await myKraPage.saveProgress();

  // Rate Performance
  await myKraPage.navigateToPerformanceKraTab();
  await myKraPage.clickRating(0);
  await myKraPage.selectStarRating(4);
  await myKraPage.fillRatingComment('Excellent progress with strong execution on key deliverables');
  await myKraPage.saveRating();

  // Submit KRA
  await myKraPage.selectAllKras();
  await myKraPage.clickSubmit();
  await myKraPage.confirmSubmit();

  // Verify in All KRA tab
  await myKraPage.navigateToAllKraTab();

  console.log('✅ Test completed successfully!');
});