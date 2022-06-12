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
  console.table(library);
};

const addBookButton = document.querySelector('.add-book');

addBookButton.addEventListener('click', () => {
  const newBookInfo = getBookInfoInput();
  addBookToLibrary(
    newBookInfo['title'],
    newBookInfo['author'],
    newBookInfo['pages'],
    newBookInfo['isRead']
  );
});
