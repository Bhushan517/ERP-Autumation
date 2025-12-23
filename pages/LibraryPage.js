class LibraryPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLibraryModule() {
    await this.page.getByRole('button', { name: 'Library' }).click();
  }

  // Publisher
  async navigateToPublisher() {
    await this.page.getByRole('link', { name: 'Publisher' }).click();
  }

  async addPublisher(publisherData) {
    await this.page.getByRole('button', { name: 'Add Publisher' }).click();

    await this.page.getByRole('textbox', { name: 'Enter publisher name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter publisher name' }).fill(publisherData.name);

    await this.page.getByRole('textbox', { name: 'Enter phone number' }).click();
    await this.page.getByRole('textbox', { name: 'Enter phone number' }).fill(publisherData.phone);

    await this.page.getByRole('textbox', { name: 'Enter description' }).click();
    await this.page.getByRole('textbox', { name: 'Enter description' }).fill(publisherData.description);

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Shelf
  async navigateToBookShelf() {
    await this.page.getByRole('link', { name: 'Book Shelf' }).click();
  }

  async addShelf(shelfData) {
    await this.page.getByRole('button', { name: 'Add Shelf' }).click();

    await this.page.getByRole('textbox', { name: 'Enter shelf name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter shelf name' }).fill(shelfData.name);

    await this.page.getByRole('button', { name: 'Select shelf type' }).click();
    await this.page.getByRole('listitem').filter({ hasText: shelfData.type }).click();

    await this.page.getByRole('textbox', { name: 'Search department' }).click();
    await this.page.getByRole('listitem').filter({ hasText: shelfData.department }).click();

    await this.page.getByRole('textbox', { name: 'Enter capacity' }).click();
    await this.page.getByRole('textbox', { name: 'Enter capacity' }).fill(shelfData.capacity);

    await this.page.getByRole('textbox', { name: 'Search or select location' }).click();
    await this.page.getByRole('listitem').filter({ hasText: shelfData.location }).click();

    await this.page.getByRole('textbox', { name: 'Enter description here' }).click();
    await this.page.getByRole('textbox', { name: 'Enter description here' }).fill(shelfData.description);

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Rack
  async navigateToBookRack() {
    await this.page.getByRole('link', { name: 'Book Rack' }).click();
  }

  async addRack(rackData) {
    await this.page.getByRole('button', { name: 'Add Rack' }).click();

    await this.page.getByRole('textbox', { name: 'Enter rack name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter rack name' }).fill(rackData.name);

    await this.page.getByRole('textbox', { name: 'Search shelf' }).click();
    await this.page.getByText(rackData.shelfName).click();

    await this.page.getByRole('textbox', { name: 'Enter capacity' }).click();
    await this.page.getByRole('textbox', { name: 'Enter capacity' }).fill(rackData.capacity);

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Books
  async navigateToBooks() {
    await this.page.getByRole('link', { name: 'Books', exact: true }).click();
  }

  async addBook(bookData) {
    await this.page.getByRole('button', { name: 'Add Book' }).click();

    await this.page.getByRole('textbox', { name: 'Enter book name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter book name' }).fill(bookData.name);

    await this.page.getByRole('textbox', { name: 'Enter author name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter author name' }).fill(bookData.author);

    await this.page.getByRole('textbox', { name: 'Enter total copies' }).click();
    await this.page.getByRole('textbox', { name: 'Enter total copies' }).fill(bookData.totalCopies);

    await this.page.getByRole('textbox', { name: 'Enter ISBN' }).click();
    await this.page.getByRole('textbox', { name: 'Enter ISBN' }).fill(bookData.isbn);

    await this.page.getByRole('textbox', { name: 'Select shelf name' }).click();
    await this.page.getByText(bookData.shelfName).click();

    await this.page.getByRole('textbox', { name: 'Search publisher' }).click();
    await this.page.getByText(bookData.publisherName).click();

    if (bookData.updatedTotalCopies) {
      await this.page.getByRole('textbox', { name: 'Enter total copies' }).click();
      await this.page.getByRole('textbox', { name: 'Enter total copies' }).fill(bookData.updatedTotalCopies);
    }

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

 
  async issueBook(issueData) {
    await this.page.locator('div:nth-child(3) > .block > .text-\\[var\\(--secondary-text-color\\)\\]').first().click();
    await this.page.locator('.css-15ol6m4').click();
    await this.page.getByRole('option', { name: issueData.memberName }).click();
    await this.page.getByRole('button', { name: 'Issue' }).click();
  }

  async navigateToIssueBooks() {
    await this.page.getByRole('link', { name: 'Issue Books' }).click();
  }

  async navigateToIssuedBooks() {
    await this.page.getByRole('link', { name: 'Issued Books' }).click();
  }

  async updateIssuedBook(updateData) {
    await this.page.locator('.text-blue-400').first().click();
    await this.page.getByRole('textbox', { name: 'Select date' }).click();
    await this.page.getByRole('button', { name: updateData.returnDay }).click();
    await this.page.getByRole('button', { name: 'Update' }).first().click();
  }

  async recordCashPayment() {
    await this.page.getByRole('button', { name: 'Make Payment' }).first().click();
    await this.page.getByRole('checkbox', { name: 'Cash' }).check();
    await this.page.getByRole('button', { name: 'Record Cash Payment ₹' }).click();
  }

  // Reserve Books
  async navigateToReserveBooks() {
    await this.page.getByRole('link', { name: 'Reserve Books' }).click();
  }

  async reserveBook(bookName) {
    await this.page.getByRole('button', { name: 'Reserve' }).first().click();
    await this.page.getByRole('searchbox', { name: 'Search book' }).click();
    await this.page.getByText(bookName).click();
  }
}

export default LibraryPage;



