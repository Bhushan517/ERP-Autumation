import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import HostelPage from '../pages/HostelPage.js';

test('hostel flow using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const hostelPage = new HostelPage(page);

  await loginPage.login('9699342811+2', 'Ritesh@123');

  await hostelPage.navigateToHostelModule();
  await hostelPage.navigateToPremises();

  await hostelPage.addBuilding({
    name: 'tushar building 6',
    type: 'Room',
    capacity: '50',
    address: 'talegon dighe',
    location: 'The Baap Company',
    managerName: 'Raman Bhalla',
  });

  await hostelPage.navigateToFloors();
  await hostelPage.addFloor({
    name: 'floor tushar 6',
    capacity: '10',
    buildingOption: 'tushar building 6 (The Baap',
  });

  await hostelPage.navigateToRooms();
  await hostelPage.addRoom({
    name: 'tushars room 6',
    buildingOption: 'tushar building 6 (The Baap',
    capacity: '4',
  });

  await hostelPage.navigateToHostelFeesTemplate();
  await hostelPage.addHostelTemplate({
    name: 'tushar tamplate 6',
    paymentTypeOption: 'Demo creds',
    feesName: 'tushar',
    amount: '3000',
  });

  await hostelPage.navigateToMemberships();
  await hostelPage.addMember({
    studentName: undefined, // selects first option
    buildingOption: 'tushar building 6',
    startDay: '22',
    endDay: '25',
    roomOption: undefined,
    managerApproval: true,
  });

  // await hostelPage.navigateToGatepassRequests();
  // await hostelPage.createGatepass({
  //   startDay: '22',
  //   endDay: '23',
  //   reason: 'i want to go ',
  // });
  // await hostelPage.navigateToGatepassApprovals();
});