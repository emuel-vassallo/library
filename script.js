let library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const getBookInfoInput = () => {
  return {
    title: prompt('Title'),
    author: prompt('Author'),
    pages: prompt('Pages'),
    isRead: prompt('Read? (true/false)'),
  };
};

const addBookToLibrary = (title, author, pages, isRead) => {
  const newBook = new Book(title, author, pages, isRead);
  library = [...library, newBook];
  console.table(library);
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

    const bookDiv = document.createElement('div');

    titleTag.textContent = book.title;
    authorTag.textContent = book.author;
    pagesTag.textContent = book.pages;
    isReadTag.textContent = book.isRead;

    bookDiv.classList.add('book-card');

    bookDiv.append(titleTag);
    bookDiv.append(authorTag);
    bookDiv.append(pagesTag);
    bookDiv.append(isReadTag);

    bookGrid.append(bookDiv);
  });
};

const addBookButton = document.querySelector('.add-book');

addBookButton.addEventListener('click', () => {
  const newBookInfo = getBookInfoInput();
  addBookToLibrary(
    newBookInfo.title,
    newBookInfo.author,
    newBookInfo.pages,
    newBookInfo.isRead
  );
  displayBooks();
});

addBookToLibrary('Shoe Dog', 'Phil Knight', 400, true);
addBookToLibrary('The Shining', 'Stephen King', 497, true);
addBookToLibrary('The Almanack of Naval Ravikant', 'Eric Jorgenson', 241, true);
addBookToLibrary('Meditations', 'Marcus Aurelius', 254, false);

displayBooks();
