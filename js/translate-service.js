var gTrans = {
  title: {
    en: 'Book shop',
    he: 'חנות ספרים',
  },
  'book-list': {
    en: 'Book List',
    he: 'רשימת ספרים',
  },
  rating: {
    en: 'Rating',
    he: 'ציון',
  },
  read: {
    en: 'Read',
    he: 'קריאה',
  },
  update: {
    en: 'Update',
    he: 'עדכון',
  },
  delete: {
    en: 'Delete',
    he: 'מחיקה',
  },
  'next-page': {
    en: 'Next page',
    he: 'עמוד הבא',
  }
}

var gCurrLang = 'en';

function setLang(lang) {
  gCurrLang = lang;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach(function (el) {
    var transKey = el.dataset.trans
    el.innerText = transKey;
    var txt = getTrans(transKey);
    if (gCurrLang === 'he') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    el.innerText = txt;
  })
}


function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';
  var txt = keyTrans[gCurrLang];

  // if not found return en
  if (!txt) txt = keyTrans['en'];
  return txt;
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL',
    { style: 'currency', currency: 'ILS' }).format(num);
}

function dollarToShekel(pricr) {
  return pricr * 3.29;
}
