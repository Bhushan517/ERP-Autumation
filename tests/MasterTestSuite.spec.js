/**
 * Master Test Suite - Sequential Execution
 * 
 * This file orchestrates all tests to run in a specific order.
 * Run this file to execute all tests sequentially:
 * 
 * npx playwright test tests/MasterTestSuite.spec.js --headed
 * 
 * Test Execution Order:
 * 1. AdmissionQa.spec.js
 * 2. AdmissionQaUpdate.spec.js
 * 3. AdmissionQaZDelete.spec.js
 * 4. AdmissionFeesTamplateDelete.spec.js
 * 5. HostelModule.spec.js
 * 6. HostelMembershipDetails.spec.js
 * 7. UserManagement.spec.js
 */

import { test } from '@playwright/test';

// Import all test files
import './AdmissionQa.spec.js';
import './AdmissionQaUpdate.spec.js';
import './AdmissionQaZDelete.spec.js';
import './AdmissionFeesTamplateDelete.spec.js';
// import './HostelModule.spec.js';
// import './HostelMembershipDetails.spec.js';
import './UserManagement.spec.js';
import './UserEditAndFilterDelete.spec.js';
import './UserRole.spec.js';
import './Certificate.spec.js';

// This file serves as an orchestrator
// The actual tests are in the imported files above
// They will run in the order they are imported when fullyParallel is false
