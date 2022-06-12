const newBookForm = document.querySelector('.new-book-modal > div > form');
const newBookModal = document.querySelector('.new-book-modal');
const openModalButton = document.querySelector('.new-book-modal-button');
const closeModalButton = document.querySelector('#new-book-close-modal');
const submitModalButton = document.querySelector('#new-book-modal-submit');

let library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const getNewBookModalInfo = () => {
  const formData = new FormData(newBookForm);
  let dataList = {};
  for (const [key, value] of formData) {
    dataList[key] = value;
  }
  return dataList;
};

const addBookToLibrary = (title, author, pages, isRead) => {
  const newBook = new Book(title, author, pages, isRead);
  library = [...library, newBook];
};

const toggleBookReadStatus = () => {
  const toggleButtons = document.querySelectorAll(
    '.book-card > div:last-child > input'
  );
  for (let i = 0; i < library.length; i++) {
    const button = toggleButtons[i];
    button.addEventListener('click', () => {
      if (button.checked) library[i].isRead = 'yes';
      else library[i].isRead = 'no';
    });
  }
};

const displayBooks = () => {
  const bookGrid = document.querySelector('.book-grid');

  while (bookGrid.firstChild) {
    bookGrid.removeChild(bookGrid.firstChild);
  }

  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    const bookCardContainer = document.createElement('div');

    const titleTag = document.createElement('p');
    const authorTag = document.createElement('p');
    const pagesTag = document.createElement('p');

    const isReadLabel = document.createElement('label');
    const isReadCheckbox = document.createElement('input');

    const isBookReadDiv = document.createElement('div');

    isBookReadDiv.append(isReadCheckbox, isReadLabel);

    isReadLabel.textContent = 'Read';
    isReadLabel.setAttribute('for', `book-is-read-checkbox-${i}`);
    isReadLabel.setAttribute('name', 'is_book_read');

    isReadCheckbox.type = 'checkbox';
    isReadCheckbox.id = `book-is-read-checkbox-${i}`;

    if (book.isRead === 'yes') isReadCheckbox.checked = true;

    titleTag.textContent = book.title;
    authorTag.textContent = book.author;
    pagesTag.textContent = parseInt(book.pages);

    bookCardContainer.classList.add('book-card');

    bookCardContainer.append(titleTag, authorTag, pagesTag, isBookReadDiv);
    bookGrid.append(bookCardContainer);
  }
  toggleBookReadStatus();
};

openModalButton.addEventListener('click', () => {
  newBookForm.reset();
  newBookModal.showModal();
});

closeModalButton.addEventListener('click', () => {
  newBookModal.close();
});

const addBookToGrid = () => {
  const newBookInfo = getNewBookModalInfo();
  addBookToLibrary(
    newBookInfo.book_title,
    newBookInfo.book_author,
    newBookInfo.book_pages,
    newBookInfo.is_book_read
  );
  displayBooks();
};

addBookToLibrary('Shoe Dog', 'Phil Knight', 400, 'yes');
addBookToLibrary(
  'The Almanack of Naval Ravikant',
  'Eric Jorgenson',
  241,
  'yes'
);
addBookToLibrary('Meditations', 'Marcus Aurelius', 254, 'no');
addBookToLibrary('The Shining', 'Stephen King', 497, 'yes');

displayBooks();
