import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import KraApproveToggleOffPage from '../pages/kra/KraApproveToggleOffPage.js';

test('KRA Complete Workflow with Auto-generated Data', async ({ page }) => {
  // Set timeout for long test
  test.setTimeout(240000); // 4 minutes

  // Generate unique identifiers using timestamp
  const timestamp = Date.now();
  const templateName = `KRA_Template_${timestamp}`;
  const milestoneTitle = `Milestone_Core_${timestamp}`;
  const taskTitle = `Task_Primary_${timestamp}`;
  const dynamicTaskName = `DynamicTask_Add_${timestamp}`;

  // Initialize Page Objects
  const loginPage = new LoginQaPage(page);
  const kraOffPage = new KraApproveToggleOffPage(page);

  // Login
  await loginPage.navigateToLogin();
  await loginPage.fillUsername('ritesh@gmail.com');
  await loginPage.fillPassword('Ritesh@123');
  await loginPage.submitLogin();

  // Select Organization
  await loginPage.selectOrganization('571bf643-60d5-4e9c-9c99-b8a52ca1832a');

  // Navigate to KRA Configuration
  await kraOffPage.navigateToKraConfiguration();
  await kraOffPage.applyConfig();
  await kraOffPage.turnToggleOff();

  // Create Template
  await kraOffPage.createTemplate(templateName);
  await kraOffPage.selectCategory('ewfew');
  await kraOffPage.selectEndDate('22');
  await kraOffPage.selectDepartment('Developer');
  await kraOffPage.fillTemplateDescription('Comprehensive template for automated testing and performance evaluation');

  // Add Milestone and Task
  await kraOffPage.addMilestone(
    milestoneTitle,
    '30',
    'Core milestone for primary objectives and deliverables'
  );
  await kraOffPage.addTask(
    taskTitle,
    'Initial task for baseline setup and requirements'
  );
  await kraOffPage.saveTemplate();

  // Navigate to My KRA
  await kraOffPage.navigateToMyKra();

  // Add KRA from Template
  await kraOffPage.addKraFromTemplate();

  // Edit KRA
  await kraOffPage.editKra();
  await kraOffPage.clickEditButton();
  await kraOffPage.selectYear('-2026');
  await kraOffPage.selectTargetDate('8');

  // Add Additional Task
  await kraOffPage.addAdditionalTask('14');
  await kraOffPage.publishKraValidation();

  // Add Task Details
  await kraOffPage.addTaskDetails(
    dynamicTaskName,
    '6',
    'Additional task for milestone completion and tracking'
  );
  await kraOffPage.publishKraFinal();

  // Process Approvals
  await kraOffPage.processApprovals();

  // Update Progress
  await kraOffPage.updateProgress();

  // Submit KRA
  await kraOffPage.submitKra();

  // Rate Performance
  await kraOffPage.ratePerformance('Outstanding performance with exceptional results and strong execution');
  await kraOffPage.submitRating();

  // Check Team KRA
  await kraOffPage.checkTeamKra();

  // Return to My KRA
  // await kraOffPage.returnToMyKra();

  console.log('✅ Test completed successfully!');
});