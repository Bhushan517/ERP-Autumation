import { test, expect } from '@playwright/test';
import LoginQaPage from '../pages/login/LoginQaPage.js';
import BuildingPage from '../pages/hostel/BuildingPage.js';
import FloorPage from '../pages/hostel/FloorPage.js';
import RoomPage from '../pages/hostel/RoomPage.js';
import FeesTemplatePage from '../pages/hostel/FeesTemplatePage.js';
import MembershipPage from '../pages/hostel/MembershipPage.js';
import HostelNavigationPage from '../pages/hostel/HostelNavigationPage.js';

test('Hostel - Create building/floor/room/template/member with unique data', async ({ page }) => {
  // प्रत्येक run ला वेगळा suffix - duplicate data टाळण्यासाठी
  const uniqueId = Date.now();
  const buildingName = `rox building ${uniqueId}`;
  const floorName = `rox floor ${uniqueId}`;
  const roomName = `rox room ${uniqueId}`;
  const templateName = `rox template ${uniqueId}`;
  const componentName = `rozz ${uniqueId}`;
  const location = 'Baap company';

  // Initialize page objects
  const loginQaPage = new LoginQaPage(page);
  const buildingPage = new BuildingPage(page);
  const floorPage = new FloorPage(page);
  const roomPage = new RoomPage(page);
  const feesTemplatePage = new FeesTemplatePage(page);
  const membershipPage = new MembershipPage(page);
  const hostelNavigationPage = new HostelNavigationPage(page);

  // Login
  await loginQaPage.login('9699342811+2', 'Ritesh@123');
  await page.waitForTimeout(2000);

  // Create Building
  await buildingPage.navigateToBuildings();
  await buildingPage.createBuilding({
    name: buildingName,
    type: 'Room',
    capacity: '5',
    address: 'talegon dighe',
    location: location,
    incharge: 'Bhushan Rahut'
  });

  // Create Floor
  await floorPage.navigateToFloors();
  await floorPage.clickAddFloor();
  await floorPage.createFloor({
    name: floorName,
    capacity: '2',
    buildingName: buildingName,
    location: location
  });

  // Create Room
  await roomPage.navigateToRooms();
  await roomPage.clickAddRoom();
  await roomPage.createRoom({
    name: roomName,
    buildingName: buildingName,
    location: location,
    capacity: '2'
  });

  // Create Fees Template
  await feesTemplatePage.navigateToFeesTemplate();
  await feesTemplatePage.clickAddTemplate();
  await feesTemplatePage.createTemplate({
    name: templateName,
    paymentType: 'smart',
    componentName: componentName,
    amount: '3000',
    addSubComponent: true
  });

  // Create Membership
  await membershipPage.navigateToMemberships();
  await membershipPage.clickAddMember();
  await membershipPage.createMembership({
    userName: 'Bhushan Rahut',
    buildingName: buildingName,
    startDate: '1',
    endDate: '13'
  });

  // Navigation checks
  await hostelNavigationPage.navigateToAttendance();
  await hostelNavigationPage.navigateToGatepassRequests();
  await hostelNavigationPage.navigateToGatepassApprovals();
});
