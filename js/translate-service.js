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
