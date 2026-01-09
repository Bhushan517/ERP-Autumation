import { test } from '@playwright/test';
import { execSync } from 'child_process';

/**
 * Master Test Suite - Runs all tests in specific order
 * This ensures tests execute sequentially in the exact order specified
 */

test.describe.serial('Run All Tests In Order', () => {

    test('1. Run AdmissionQa.spec', async () => {
        console.log('\n🔄 Running: AdmissionQa.spec.js\n');
        execSync('npx playwright test tests/AdmissionQa.spec.js --headed', {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    });

    test('2. Run AdmissionQaUpdate.spec', async () => {
        console.log('\n🔄 Running: AdmissionQaUpdate.spec.js\n');
        execSync('npx playwright test tests/AdmissionQaUpdate.spec.js --headed', {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    });

    test('3. Run AdmissionQaZDelete.spec', async () => {
        console.log('\n🔄 Running: AdmissionQaZDelete.spec.js\n');
        execSync('npx playwright test tests/AdmissionQaZDelete.spec.js --headed', {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    });

    test('4. Run AdmissionFeesTamplateDelete.spec', async () => {
        console.log('\n🔄 Running: AdmissionFeesTamplateDelete.spec.js\n');
        execSync('npx playwright test tests/AdmissionFeesTamplateDelete.spec.js --headed', {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    });

    // test('5. Run HostelModule.spec', async () => {
    //     console.log('\n🔄 Running: HostelModule.spec.js\n');
    //     execSync('npx playwright test tests/HostelModule.spec.js --headed', {
    //         stdio: 'inherit',
    //         cwd: process.cwd()
    //     });
    // });

    // test('6. Run HostelMembershipDetails.spec', async () => {
    //     console.log('\n🔄 Running: HostelMembershipDetails.spec.js\n');
    //     execSync('npx playwright test tests/HostelMembershipDetails.spec.js --headed', {
    //         stdio: 'inherit',
    //         cwd: process.cwd()
    //     });
    // });

    test('7. Run UserManagement.spec', async () => {
        console.log('\n🔄 Running: UserManagement.spec.js\n');
        execSync('npx playwright test tests/UserManagement.spec.js --headed', {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    });

    test('8. Run UserEditAndFilterDelete.spec', async () => {
        console.log('\n🔄 Running: UserEditAndFilterDelete.spec.js\n');
        execSync('npx playwright test tests/UserEditAndFilterDelete.spec.js --headed', {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    });

    test('9. Run UserRole.spec', async () => {
        console.log('\n🔄 Running: UserRole.spec.js\n');
        execSync('npx playwright test tests/UserRole.spec.js --headed', {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    });

    test('10. Run Certificate.spec', async () => {
        console.log('\n🔄 Running: Certificate.spec.js\n');
        execSync('npx playwright test tests/Certificate.spec.js --headed', {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    });

});
