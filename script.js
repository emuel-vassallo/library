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
  library.push(newBook);
};

const newBookInfo = getBookInfoInput();
console.table(newBookInfo);

addBookToLibrary(
  newBookInfo['title'],
  newBookInfo['author'],
  newBookInfo['pages'],
  newBookInfo['isRead']
);


// addBookToLibrary('Shoe Dog', 'Phil Knight', 400, true);
// addBookToLibrary('The Shining', 'Stephen King', 497, true);

console.table(library);
