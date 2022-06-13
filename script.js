const newBookModal = document.querySelector('.new-book-modal');
const newBookForm = document.querySelector('.new-book-form');
const submitFormButton = document.querySelector('#new-book-form-submit');
const openModalButton = document.querySelector('.new-book-modal-trigger');
const closeModalButton = document.querySelector('#new-book-close-modal');

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
  const readStatusLabels = document.querySelectorAll(
    '.book-card > div:last-child > label'
  );

  for (let i = 0; i < library.length; i++) {
    const button = toggleButtons[i];
    button.addEventListener('click', () => {
      if (button.checked) library[i].isRead = 'yes';
      else library[i].isRead = 'no';
    });
  }
};

const deleteBook = () => {
  const deleteButtons = document.querySelectorAll('.book-card > span');
  for (let i = 0; i < library.length; i++) {
    const button = deleteButtons[i];
    button.addEventListener('click', () => {
      library.splice(i, 1);
      displayBooks();
      return;
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

    const deleteButton = document.createElement('span');

    const isBookReadDiv = document.createElement('div');

    deleteButton.textContent = '×';

    isBookReadDiv.append(isReadCheckbox, isReadLabel);

    isReadLabel.setAttribute('for', `book-is-read-checkbox-${i}`);
    isReadLabel.setAttribute('name', 'is_book_read');

    isReadLabel.textContent = 'Read';
    isReadCheckbox.type = 'checkbox';
    isReadCheckbox.id = `book-is-read-checkbox-${i}`;

    if (book.isRead === 'yes') isReadCheckbox.checked = true;

    titleTag.textContent = book.title;
    authorTag.textContent = book.author;
    pagesTag.textContent = parseInt(book.pages);

    bookCardContainer.classList.add('book-card');

    bookCardContainer.append(
      deleteButton,
      titleTag,
      authorTag,
      pagesTag,
      isBookReadDiv
    );
    bookGrid.append(bookCardContainer);
  }
  deleteBook();
  toggleBookReadStatus();
};

const toggleModal = () => {
  newBookForm.reset();
  newBookModal.classList.toggle('show-modal');
};

const windowOnClick = (e) => {
  if (e.target === newBookModal) toggleModal();
};

const keyboardKeyPress = (e) => {
  if (e.key === 'Escape') toggleModal();
};

const addBookToGrid = () => {
  const newBookInfo = getNewBookModalInfo();
  addBookToLibrary(
    newBookInfo.book_title,
    newBookInfo.book_author,
    newBookInfo.book_pages,
    newBookInfo.is_book_read
  );
  displayBooks();
  toggleModal();
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

openModalButton.addEventListener('click', () => toggleModal());
window.addEventListener('click', windowOnClick);
closeModalButton.addEventListener('click', () => toggleModal());

document.body.addEventListener('keydown', (e) => {
  if (newBookModal.classList.contains('show-modal') && e.key == 'Escape')
    toggleModal();
});
