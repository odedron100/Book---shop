'use strict';
function init() {
  renderBooks();
}

function renderBooks() {
  var books = gBooks;
  var strHtmls = books.map(function (book) {
    return `
        <div class="book-row row">
              <div id="title" class="cell book-title-cell" onclick="onSetSort(this)">${book.title} (${book.id})</div>
              <div id="price" class="cell price-cell" onclick="onSetSort(this)">$${book.price}</div>
              <div class="actions">
                <div class="cell"><div class="button read-button" data-trans="read" onclick="onReadBook('${book.id}')">Read</div></div>
                <div class="cell"><div class="button update-button" data-trans="update" onclick="onUpdateBook('${book.id}')">Update</div></div>
                <div class="cell"><div class="button delete-button" data-trans="delete" onclick="onDeleteBook('${book.id}')">Delete</div></div>
              </div>
        </div>`;
  })
  var elTbody = document.querySelector('.table-body');
  elTbody.innerHTML = strHtmls.join('')
}

function onDeleteBook(bookId) {
  removeBook(bookId);
  renderBooks();
}

function onAddBook() {
  var bookName = prompt('Enter name');
  var price = +prompt('Enter price');
  if (!bookName || !price) return;
  addBook(bookName, price);
  renderBooks();
}

function onUpdateBook(bookId) {
  var bookPrice = +prompt('Enter new price');
  updateBook(bookId, bookPrice);
  renderBooks();
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  gCurrReadBook = bookId;
  var currRate = loadFromStorage(gCurrReadBook) || 0;
  var elModal = document.querySelector('.modal-overlay');
  // elModal.querySelector('img').src = ;
  elModal.querySelector('h2').innerHTML = book.title;
  var elRateCount = document.querySelector('.rate-count');
  elRateCount.innerHTML = ` rating : ${currRate} ⭐️`;
  elModal.querySelector('h4').innerHTML = `price : ${book.price} $`;
  elModal.querySelector('p').innerHTML = book.summery;
  elModal.hidden = false;
  elModal.classList.add('visible');
  renderBooks();
}

function closeModal() {
  var elModal = document.querySelector('.modal-overlay');
  elModal.classList.remove('visible');
  renderBooks();
}

function onClickRate(btn) {
  if (btn.value === '+') {
    raiseRateValue();
  } else if (btn.value === '-') {
    dropRateValue();
  }
}

function onSetLang(language) {
  setLang(language);
  doTrans();
  renderBooks();
}
