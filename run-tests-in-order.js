
const { execSync } = require('child_process');

const testFiles = [
    'tests/AdmissionQa.spec.js',
    'tests/AdmissionQaUpdate.spec.js',
    'tests/AdmissionQaZDelete.spec.js',
    'tests/AdmissionFeesTamplateDelete.spec.js',
    'tests/HostelModule.spec.js',
    'tests/HostelMembershipDetails.spec.js'
];

console.log('\n🚀 Starting Sequential Test Execution...\n');
console.log('═'.repeat(60));

let totalPassed = 0;
let totalFailed = 0;
const startTime = Date.now();

testFiles.forEach((file, index) => {
    console.log(`\n📝 [${index + 1}/${testFiles.length}] Running: ${file}`);
    console.log('─'.repeat(60));

    try {
        execSync(`npx playwright test ${file} --headed`, {
            stdio: 'inherit',
            cwd: process.cwd()
        });
        console.log(`✅ PASSED: ${file}\n`);
        totalPassed++;
    } catch (error) {
        console.log(`❌ FAILED: ${file}\n`);
        totalFailed++;
  
    }
});

const endTime = Date.now();
const duration = ((endTime - startTime) / 1000).toFixed(2);

console.log('\n' + '═'.repeat(60));
console.log('📊 TEST SUMMARY');
console.log('═'.repeat(60));
console.log(`✅ Passed: ${totalPassed}`);
console.log(`❌ Failed: ${totalFailed}`);
console.log(`⏱️  Duration: ${duration}s`);
console.log('═'.repeat(60) + '\n');

// Exit with error code if any tests failed
if (totalFailed > 0) {
    process.exit(1);
}
