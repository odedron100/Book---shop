'use strict';
function init() {
  renderBooks();
}

function renderBooks() {
  var books = getbooks();
  var readButtontxt = (gCurrLang === 'en') ? 'Read' : 'קריאה';
  var updateButtontxt = (gCurrLang === 'en') ? 'Update' : 'עדכון';
  var deleteButtontxt = (gCurrLang === 'en') ? 'Delete' : 'מחיקה';
  var strHtmls = books.map(function (book) {
    var price = (gCurrLang === 'en') ? `${book.price}$` : (formatCurrency(dollarToShekel(book.price)))
    return `
        <div class="book-row row">
              <div id="title" class="cell book-title-cell" onclick="onSetSort(this)">${book.title} (${book.id})</div>
              <div id="price" class="cell price-cell" onclick="onSetSort(this)">${price}</div>
              <div class="actions">
                <div class="cell"><div class="button read-button" data-trans="read" onclick="onReadBook('${book.id}')">${readButtontxt}</div></div>
                <div class="cell"><div class="button update-button" data-trans="update" onclick="onUpdateBook('${book.id}')">${updateButtontxt}</div></div>
                <div class="cell"><div class="button delete-button" data-trans="delete" onclick="onDeleteBook('${book.id}')">${deleteButtontxt}</div></div>
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
  var bookName = (gCurrLang === 'en') ? prompt('Enter name') : prompt('הכנס שם לספר')
  var price = (gCurrLang === 'en') ? +prompt('Enter new price (dollar)') : +prompt('הכנס מחיר חדש (דולר)')
  if (!bookName || !price) return;
  addBook(bookName, price);
  renderBooks();
}

function onUpdateBook(bookId) {
  var bookPrice = (gCurrLang === 'en') ? +prompt('Enter new price (dollar)') : +prompt('הכנס מחיר חדש (דולר)')
  updateBook(bookId, bookPrice);
  renderBooks();
}

function onReadBook(bookId) {
  var ratingMessage = (gCurrLang === 'en') ? 'rating :' : ': ציון';
  var book = getBookById(bookId);
  var price = (gCurrLang === 'en') ? `${book.price}$` : (formatCurrency(dollarToShekel(book.price)))
  gCurrReadBook = bookId;
  var currRate = loadFromStorage(gCurrReadBook) || 0;
  var elModal = document.querySelector('.modal-overlay');
  elModal.querySelector('h2').innerHTML = book.title;
  var elRateCount = document.querySelector('.rate-count');
  elRateCount.innerHTML = ` ${ratingMessage} ${currRate} ⭐️`;
  elModal.querySelector('h4').innerHTML = `price : ${price}`;
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

function onNextPage() {
  nextPage();
  renderBooks();
}
