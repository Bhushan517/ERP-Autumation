import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import LibraryPage from '../pages/LibraryPage.js';

test('library flow using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const libraryPage = new LibraryPage(page);

  await loginPage.login('9699342811+2', 'Ritesh@123');

  await libraryPage.navigateToLibraryModule();

  await libraryPage.navigateToPublisher();
  await libraryPage.addPublisher({
    name: 'bhushan raut',
    phone: '8767629834',
    description: 'no',
  });

  await libraryPage.navigateToBookShelf();
  await libraryPage.addShelf({
    name: 'bhushan raut',
    type: 'Regular',
    department: 'Accounts',
    capacity: '10',
    location: 'The Baap Company',
    description: 'no',
  });

  await libraryPage.navigateToBookRack();
  await libraryPage.addRack({
    name: 'bhushan rack',
    shelfName: 'bhushan raut',
    capacity: '2',
  });

  await libraryPage.navigateToBooks();
  await libraryPage.addBook({
    name: 'bagira',
    author: 'sowmi',
    totalCopies: '50',
    isbn: '2342123212343',
    shelfName: 'bhushan raut',
    publisherName: 'bhushan raut',
    updatedTotalCopies: '2',
  });

  await libraryPage.issueBook({
    memberName: 'Raman Bhalla',
  });

  await libraryPage.navigateToIssueBooks();
  await libraryPage.navigateToIssuedBooks();
  await libraryPage.updateIssuedBook({
    returnDay: '27',
  });
  await libraryPage.recordCashPayment();

  await libraryPage.navigateToReserveBooks();
  await libraryPage.reserveBook('bagira');
});