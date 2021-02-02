'use strict';
const KEY = 'Books';
var gBooks;
var gSortBy = 'title';
var gCurrReadBook = null
var gRate = 0;
const PAGE_SIZE = 5;
var gPageIdx = 0;

_createBooks();

function getbooks() {
  var startIdx = gPageIdx * PAGE_SIZE;
  return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0;
  }
}

function _createBook(name, price) {
  var book = {
    id: getRandomIntInclusive(1, 100),
    title: name,
    price: price,
    imgUrl: 'gBooks.jpeg',
    summery: getLorem()
  }
  return book;
}

function _createBooks() {
  var books = loadFromStorage(KEY);
  if (!books || !books.length) {
    books = []
    books.push(_createBook('titanic', 45))
  }
  gBooks = books;
  _saveToLocalStorage();
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return +bookId === book.id
  })
  gBooks.splice(bookIdx, 1)
  _saveToLocalStorage();
}

function addBook(name, price) {
  var book = _createBook(name, price)
  gBooks.push(book)
  _saveToLocalStorage();
}

function updateBook(bookId, price) {
  var bookToUpdate = gBooks.find(function (book) {
    return +bookId === book.id;
  })
  bookToUpdate.price = price;
  _saveToLocalStorage();
}

function raiseRateValue() {
  var currRate = loadFromStorage(gCurrReadBook) || 0;
  if (currRate === 10) {
    return alert('The maximum rate is 10')
  }
  currRate++;
  var elRateCount = document.querySelector('.rate-count');
  elRateCount.innerHTML = ` rating : ${currRate} ⭐️`;
  _saveRatingToLocalStorage(gCurrReadBook, currRate);
}

function dropRateValue() {
  var currRate = loadFromStorage(gCurrReadBook) || 0;
  if (currRate === 0) {
    return alert('The minimum rate is 0')
  }
  currRate--;
  var elRateCount = document.querySelector('.rate-count');
  elRateCount.innerHTML = ` rating : ${currRate} ⭐️`;
  _saveRatingToLocalStorage(gCurrReadBook, currRate);
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return +bookId === book.id;
  })
  return book;
}

function _saveToLocalStorage() {
  saveToStorage(KEY, gBooks);
}

function _saveRatingToLocalStorage(key, rate) {
  saveToStorage(key, rate);
}


function onSetSort(elSortBy) {
  console.log('elSortBy', elSortBy);
  var sortBy = elSortBy.id;
  gSortBy = sortBy;
  console.log('gSortBy', gSortBy);
  if (gSortBy === 'title') {
    var books = gBooks.sort(function (book1, book2) {
      return (book1.title.localeCompare(book2.title));
    })
    gBooks = books;
  }
  else {
    var books = gBooks.sort(function (book1, book2) {
      return (book1.price - book2.price);
    })
    gBooks = books;
  }
  renderBooks();
}
