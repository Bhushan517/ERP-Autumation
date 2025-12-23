import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import HostelPage from '../pages/HostelPage.js';

test('hostel flow using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const hostelPage = new HostelPage(page);

  const uniqueId = `${Date.now()}`;
  const buildingName = `tushar building ${uniqueId}`;
  const floorName = `floor tushar ${uniqueId}`;
  const roomName = `tushars room ${uniqueId}`;
  const templateName = `tushar template ${uniqueId}`;
  const feesName = `tushar fees ${uniqueId}`;

  await loginPage.login('9699342811+2', 'Ritesh@123');

  await hostelPage.navigateToHostelModule();
  await hostelPage.navigateToPremises();

  await hostelPage.addBuilding({
    name: buildingName,
    type: 'Room',
    capacity: '50',
    address: 'talegon dighe',
    location: 'The Baap Company',
    managerName: 'Raman Bhalla',
  });

  await hostelPage.navigateToFloors();
  await hostelPage.addFloor({
    name: floorName,
    capacity: '10',
    buildingOption: `${buildingName} (The Baap`,
  });

  await hostelPage.navigateToRooms();
  await hostelPage.addRoom({
    name: roomName,
    buildingOption: `${buildingName} (The Baap`,
    capacity: '4',
  });

  await hostelPage.navigateToHostelFeesTemplate();
  await hostelPage.addHostelTemplate({
    name: templateName,
    paymentTypeOption: 'Demo creds',
    feesName: feesName,
    amount: '3000',
  });

  await hostelPage.navigateToMemberships();
  await hostelPage.addMember({
    studentName: undefined, // selects first option
    buildingOption: buildingName,
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