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

    const titleSpanTag = document.createElement('span');
    const authorSpanTag = document.createElement('span');
    const pagesSpanTag = document.createElement('span');
    const isReadSpanTag = document.createElement('span');

    const bookDiv = document.createElement('div');
    
    bookDiv.classList.add('book-card');

    titleTag.textContent = 'Title: ';
    authorTag.textContent = 'Author: ';
    pagesTag.textContent = 'Pages: ';
    isReadTag.textContent = 'Read: ';

    titleSpanTag.textContent = book.title;
    authorSpanTag.textContent = book.author;
    pagesSpanTag.textContent = book.pages;
    isReadSpanTag.textContent = book.isRead;

    titleTag.append(titleSpanTag);
    authorTag.append(authorSpanTag);
    pagesTag.append(pagesSpanTag);
    isReadTag.append(isReadSpanTag);


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
