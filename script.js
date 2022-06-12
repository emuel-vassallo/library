let library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const getNewBookModalInfo = () => {
  const form = document.querySelector('.new-book-modal > div > form');
  const formData = new FormData(form);
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

// TODO: Make this function cleaner and more efficient.
const displayBooks = () => {
  const bookGrid = document.querySelector('.book-grid');

  while (bookGrid.firstChild) {
    bookGrid.removeChild(bookGrid.firstChild);
  }

  library.forEach((book) => {
    const titleTag = document.createElement('p');
    const authorTag = document.createElement('p');
    const pagesTag = document.createElement('p');
    const isReadTag = document.createElement('p');

    const bookDivTag = document.createElement('div');
    bookDivTag.classList.add('book-card');

    titleTag.textContent = book.title;
    authorTag.textContent = book.author;
    pagesTag.textContent = book.pages;
    isReadTag.textContent = book.isRead;

    bookDivTag.append(titleTag, authorTag, pagesTag, isReadTag);
    bookGrid.append(bookDivTag);
  });
};

const modal = document.querySelector('.new-book-modal');
const openModalButton = document.querySelector('.new-book-modal-button');
const closeModalButton = document.querySelector('#new-book-close-modal');
const modalSubmitButton = document.querySelector('#new-book-modal-submit');

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  modal.close();
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
