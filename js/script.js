// Die Harfe — shared behavior

var iconCounter = 0;

function harpIconSVG() {
  iconCounter += 1;
  var uid = '-card' + iconCounter;
  var seed = iconCounter * 3 + 1;
  var hatch = '';
  for (var x = -30; x < 140; x += 7) {
    hatch += '<line x1="' + x + '" y1="-15" x2="' + (x - 70) + '" y2="127"/>';
  }
  return (
    '<svg class="harp-icon" viewBox="0 0 90 112" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">' +
      '<defs>' +
        '<filter id="pencil' + uid + '" x="-20%" y="-20%" width="140%" height="140%">' +
          '<feTurbulence type="fractalNoise" baseFrequency="0.05 0.09" numOctaves="2" seed="' + seed + '" result="n"/>' +
          '<feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G"/>' +
        '</filter>' +
        '<clipPath id="bodyShadow' + uid + '">' +
          '<path d="M52,32 C70,38 84,52 82,74 C79,90 63,101 50,106 C61,95 71,80 71,58 C71,42 62,35 52,32 Z"/>' +
        '</clipPath>' +
        '<clipPath id="holeShadow' + uid + '">' +
          '<ellipse cx="52" cy="60" rx="12" ry="13"/>' +
        '</clipPath>' +
        '<g id="hatch' + uid + '">' + hatch + '</g>' +
      '</defs>' +
      '<g transform="rotate(-9 45 56) scale(0.97,1)" filter="url(#pencil' + uid + ')">' +
        '<path d="M18,29 C4,35 3,59 8,73 C13,87 25,101 38,104 C41,105.5 49,105.5 52,104 C65,101 77,87 82,73 C87,59 86,35 72,29 C58,36 32,36 18,29 Z" stroke-width="1.8" opacity="0.9"/>' +
        '<path d="M18,29 C4,35 3,59 8,73 C13,87 25,101 38,104 C41,105.5 49,105.5 52,104 C65,101 77,87 82,73 C87,59 86,35 72,29 C58,36 32,36 18,29 Z" stroke-width="1.1" opacity="0.3" transform="translate(1.1,0.7)"/>' +
        '<path d="M20,27 C8,27 4,17 8,9 C11,3 20,3 22,10 C23,14 19,17 16,14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>' +
        '<path d="M70,27 C82,27 86,17 82,9 C79,3 70,3 68,10 C67,14 71,17 74,14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>' +
        '<rect x="14" y="21" width="62" height="12" rx="6" stroke-width="1.6" opacity="0.85"/>' +
        '<ellipse cx="45" cy="53" rx="22" ry="24" stroke-width="1.4" opacity="0.8"/>' +
        '<g stroke-width="0.7" opacity="0.55">' +
          '<line x1="22" y1="33" x2="27" y2="89"/>' +
          '<line x1="28" y1="33" x2="32" y2="89"/>' +
          '<line x1="34" y1="33" x2="37" y2="89"/>' +
          '<line x1="40" y1="33" x2="42" y2="89"/>' +
          '<line x1="45" y1="33" x2="45" y2="89"/>' +
          '<line x1="50" y1="33" x2="48" y2="89"/>' +
          '<line x1="56" y1="33" x2="53" y2="89"/>' +
          '<line x1="62" y1="33" x2="58" y2="89"/>' +
          '<line x1="68" y1="33" x2="63" y2="89"/>' +
        '</g>' +
        '<g stroke-width="1" opacity="0.75">' +
          '<circle cx="22" cy="21" r="1.5"/>' +
          '<circle cx="28" cy="21" r="1.5"/>' +
          '<circle cx="34" cy="21" r="1.5"/>' +
          '<circle cx="40" cy="21" r="1.5"/>' +
          '<circle cx="45" cy="21" r="1.5"/>' +
          '<circle cx="50" cy="21" r="1.5"/>' +
          '<circle cx="56" cy="21" r="1.5"/>' +
          '<circle cx="62" cy="21" r="1.5"/>' +
          '<circle cx="68" cy="21" r="1.5"/>' +
        '</g>' +
        '<rect x="24" y="86" width="42" height="6" rx="3" stroke-width="1.4" opacity="0.85"/>' +
        '<use href="#hatch' + uid + '" clip-path="url(#bodyShadow' + uid + ')" stroke-width="1" opacity="0.32"/>' +
        '<use href="#hatch' + uid + '" clip-path="url(#holeShadow' + uid + ')" stroke-width="0.8" opacity="0.3"/>' +
      '</g>' +
    '</svg>'
  );
}

function escapeHTML(str) {
  var div = document.createElement('div');
  div.textContent = str == null ? '' : str;
  return div.innerHTML;
}

function productCardHTML(product, opts) {
  opts = opts || {};
  var linkHref = opts.linkToMerchandise ? ' href="merchandise.html#' + product.id + '"' : '';
  var idAttr = opts.assignId ? ' id="' + product.id + '"' : '';
  var image = product.image || 'images/placeholder.svg';

  return (
    '<a' + idAttr + linkHref + ' class="tag-card" data-category="' + escapeHTML(product.category) + '" style="text-decoration:none; scroll-margin-top:90px;">' +
      '<span class="price-sticker">' + escapeHTML(product.price) + '</span>' +
      '<div class="punch-hole"></div>' +
      '<div class="brand-mark">' + harpIconSVG() + ' Die Harfe</div>' +
      '<div class="product-name">' + escapeHTML(product.name) + '</div>' +
      '<div class="art-wrap">' +
        '<img src="' + escapeHTML(image) + '" alt="' + escapeHTML(product.name) + '" onerror="this.onerror=null;this.src=\'images/placeholder.svg\';">' +
      '</div>' +
      '<p class="desc">' + escapeHTML(product.desc) + '</p>' +
    '</a>'
  );
}

function loadProducts() {
  return fetch('data/products.json')
    .then(function (res) { return res.json(); })
    .catch(function (err) {
      console.error('Could not load data/products.json', err);
      return [];
    });
}

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Home page "Our Story" reveal
  var storyToggle = document.getElementById('story-toggle');
  var storySection = document.querySelector('.story-section');

  if (storyToggle && storySection) {
    storyToggle.addEventListener('click', function () {
      var isOpen = storySection.classList.toggle('open');
      if (isOpen) {
        storySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Home page featured products
  var featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    loadProducts().then(function (products) {
      var featured = products.filter(function (p) { return p.featured; });
      if (!featured.length) featured = products.slice(0, 3);
      featuredGrid.innerHTML = featured
        .map(function (p) { return productCardHTML(p, { linkToMerchandise: true }); })
        .join('');
    });
  }

  // Merchandise page product grid
  var productGrid = document.getElementById('product-grid');
  if (productGrid) {
    loadProducts().then(function (products) {
      var html = products
        .map(function (p) { return productCardHTML(p, { assignId: true }); })
        .join('');
      productGrid.insertAdjacentHTML('afterbegin', html);
      initFilters();
    });
  }

  function initFilters() {
    var chips = document.querySelectorAll('.filter-chip');
    var cards = document.querySelectorAll('.tag-card[data-category]');

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');

        var category = chip.getAttribute('data-filter');

        cards.forEach(function (card) {
          var cardCategories = (card.getAttribute('data-category') || '').split(' ');
          var match = category === 'all' || cardCategories.indexOf(category) !== -1;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }
});
