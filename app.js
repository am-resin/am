/* =============================================================================
   A.M Resin Adventure — site behaviour
   No build step, no dependencies. All rendering uses text nodes / attributes,
   never innerHTML, so product and user data can never become markup.
   ========================================================================== */

/* ★★★ EDIT THIS — YOUR DETAILS ★★★
   whatsappNumber: country code + number, digits only (India: 91 + 10 digits).
   callDisplay / callLink: what the Call buttons show and dial.
   Prices are intentionally not stored: every piece is quoted in chat.       */
const CONFIG = {
  shopName: 'A.M Resin Adventure',
  owner: 'Afifa Memon',
  whatsappNumber: '918160776905',
  callDisplay: '+91 81607 76905',
  callLink: 'tel:+918160776905',
  email: 'afifa.mfa@proton.me',
  address: '205, London Heights, Ring Road, Navsari 396445, Gujarat',
  hours: '10am – 9pm, all days',
  // Copy shown wherever a price would normally appear.
  priceLabel: 'Contact for price',
};
/* ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ */

/* Categories, in display order. */
const CATEGORIES = [
  { id: 'decor', label: 'Décor & coasters' },
  { id: 'gifts', label: 'Keychains & gifts' },
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'phone', label: 'Phone covers' },
  { id: 'pens', label: 'Pens' },
];

const PRODUCTS = [
  {
    id: 'coaster-set',
    name: 'Pressed Flower Coaster Set of 4',
    cat: 'decor',
    badge: 'Bestseller',
    img: 'assets/img/coaster-set.webp',
    width: 583,
    height: 920,
    alt: 'Four scalloped resin coasters with pressed blue flowers and gold-gilded rims',
    tags: 'coaster coasters set four table chai coffee pressed flower blue gold rim gift housewarming decor',
    desc: 'Four scalloped coasters on an ivory pour, each holding a different real pressed bloom and finished with a hand-gilded gold rim.',
    specs: {
      Finish: 'Scalloped, gold-gilded rim',
      Detail: 'Real pressed flowers',
      Personalise: 'Colour palette or name',
      Order: 'Made to order',
    },
  },
  {
    id: 'geode-frame',
    name: 'Geode Photo Frame with Easel',
    cat: 'decor',
    badge: 'Display piece',
    img: 'assets/img/geode-frame.webp',
    width: 566,
    height: 920,
    alt: 'Round ivory geode resin frame scattered with gold leaf, resting on a wooden easel stand',
    tags: 'frame photo geode gold leaf easel stand table decor picture keepsake',
    desc: 'A round geode pour in warm ivory, scattered with gold leaf and set on the wooden easel stand included with it.',
    specs: {
      Finish: 'Gold leaf on ivory geode',
      Stand: 'Wooden easel included',
      Personalise: 'Photo, names or dates',
      Order: 'Made to order',
    },
  },
  {
    id: 'bloom-keychain',
    name: 'Black & Ivory Bloom Keychain',
    cat: 'gifts',
    badge: 'Personalise it',
    img: 'assets/img/keychain.webp',
    width: 422,
    height: 510,
    alt: 'Two round resin keychains split black and ivory with gold foil, a dried bloom and a black tassel',
    tags: 'keychain keyring bag charm tassel gold foil dried flower initial name return gift bulk',
    desc: 'A black-and-ivory pour split with real gold foil, one dried bloom and a silk tassel. Add an initial or a name on request.',
    specs: {
      Detail: 'Gold foil and real bloom',
      Hardware: 'Steel ring, silk tassel',
      Personalise: 'Initial or name',
      Order: 'Made to order',
    },
  },
  {
    id: 'memory-pendant',
    name: 'Pebble & Petal Memory Pendant',
    cat: 'jewelry',
    badge: 'Keepsake',
    img: 'assets/img/pendant.webp',
    width: 340,
    height: 591,
    alt: 'Round clear resin pendant holding small river pebbles, a pressed flower and a twig, on a dark cord',
    tags: 'pendant necklace jewelry jewellery keepsake memory pebbles flower cord gift for her',
    desc: 'Small river pebbles and a pressed flower suspended in clear resin on a faux-leather cord — a tiny landscape to wear.',
    specs: {
      Detail: 'Pebbles, twig and petal',
      Cord: 'Adjustable faux leather',
      Personalise: 'Your own keepsakes',
      Order: 'Made to order',
    },
  },
  {
    id: 'resin-pens',
    name: 'Gold Leaf Resin Pen',
    cat: 'pens',
    badge: 'Gift favourite',
    img: 'assets/img/pens.webp',
    width: 519,
    height: 767,
    alt: 'Two clear resin pens filled with gold and silver leaf and small dried petals',
    tags: 'pen pens stationery gold leaf silver petals refill gift office desk return gift',
    desc: 'A clear resin pen scattered with gold and silver leaf and tiny dried petals. Refillable, and a favourite in gifting sets.',
    specs: {
      Detail: 'Gold and silver leaf',
      Type: 'Refillable ballpoint',
      Personalise: 'Colour palette',
      Order: 'Made to order',
    },
  },
  {
    id: 'daisy-cover',
    name: 'Pressed Daisy Phone Cover',
    cat: 'phone',
    badge: 'Made to fit',
    img: 'assets/img/phone-cover-daisies.webp',
    width: 415,
    height: 770,
    alt: 'Black phone case covered with real pressed white daisies and gold flakes set in resin',
    tags: 'phone cover case mobile daisy daisies flower gold flakes custom model iphone',
    desc: 'Real pressed daisies and gold flakes on a deep black case, sealed in resin and poured to fit your phone model.',
    specs: {
      Detail: 'Real daisies, gold flakes',
      Fit: 'Poured for your model',
      Personalise: 'Flowers or initials',
      Order: 'Send your model first',
    },
  },
  {
    id: 'stained-glass-cover',
    name: 'Stained Glass Floral Phone Cover',
    cat: 'phone',
    badge: 'New',
    img: 'assets/img/phone-cover-stained-glass.webp',
    width: 363,
    height: 598,
    alt: 'Phone cover with a stained-glass floral pattern in soft pastels and metallic outlines',
    tags: 'phone cover case mobile stained glass floral pastel floral new model custom',
    desc: 'A stained-glass floral pattern in soft pastels with metallic outlines, poured over a clear case for your model.',
    specs: {
      Finish: 'Stained-glass floral',
      Fit: 'Poured for your model',
      Personalise: 'Palette on request',
      Order: 'Send your model first',
    },
  },
];

/* ---------------------------------------------------------------- helpers */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? 'Resin art';

/** Digits-only phone, so the wa.me URL can never be manipulated by config typos. */
const WA_PHONE = String(CONFIG.whatsappNumber).replace(/\D/g, '');
const CALL_LINK = /^tel:[+0-9()\-\s]{3,25}$/.test(CONFIG.callLink)
  ? CONFIG.callLink
  : `tel:+${WA_PHONE}`;

/**
 * Build a WhatsApp deep link with a plain-text, length-limited message.
 * Control characters are stripped (tab kept as a space, newlines kept so the
 * message stays readable) and the whole thing is percent-encoded, so the value
 * can never break out of the query string.
 */
function waLink(message) {
  const text = String(message)
    .replace(/\t/g, ' ')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 1600);
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Open a same-window-external URL in a new tab without window.open().
 * A real <a rel="noopener noreferrer"> click is not popup-blocked and cannot
 * reach back into this page through window.opener.
 */
function openExternal(url) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.hidden = true;
  document.body.append(a);
  a.click();
  a.remove();
}

const GENERAL_MESSAGE =
  `Hi ${CONFIG.shopName}! I would like to know more about your resin pieces. ` +
  `Could you share the prices, personalisation options and delivery time?`;

const orderMessage = (p) =>
  `Hi ${CONFIG.shopName}!\nI am interested in:\n` +
  `• ${p.name}\n• Qty: 1\n` +
  `• Personalisation (name / colour / photo): \n• My city: \n\n` +
  `Could you share the price and delivery time? Thank you!`;

/** Small DOM builder. Anything passed as a string becomes a text node. */
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value === true) node.setAttribute(key, '');
    else node.setAttribute(key, String(value));
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

/** External + WhatsApp links always carry noopener/noreferrer. */
function externalLink(attrs, ...children) {
  return el('a', { target: '_blank', rel: 'noopener noreferrer', ...attrs }, ...children);
}

function productImage(p, { className = '', sizes = '', lazy = true } = {}) {
  return el('img', {
    class: className,
    src: p.img,
    alt: p.alt,
    width: p.width,
    height: p.height,
    loading: lazy ? 'lazy' : 'eager',
    decoding: 'async',
  });
}

const askPrice = () => el('span', { class: 'ask' },
  el('span', { class: 'ask-dot', 'aria-hidden': 'true' }),
  CONFIG.priceLabel,
);

/* --------------------------------------------------------------- elements */
const grid = $('#grid');
const filters = $('#filters');
const searchInput = $('#search');
const sortSelect = $('#sort');
const resultCount = $('#resultCount');
const dialog = $('#dialog');
const dialogBody = $('#dialogBody');
const toastEl = $('#toast');

let activeCat = 'all';
let query = '';
let sortBy = 'featured';
let lastFocused = null;
let searchTimer;

/* ------------------------------------------------------------------ toast */
let toastTimer;
function toast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;
  requestAnimationFrame(() => toastEl.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => { toastEl.hidden = true; }, 220);
  }, 3200);
}

/* ---------------------------------------------------------------- product */
function buildCard(p) {
  const media = el('div', { class: 'card-media' },
    productImage(p, { className: 'card-img' }),
  );
  if (p.badge) media.append(el('span', { class: 'badge', text: p.badge }));
  media.append(el('button', {
    class: 'quick', type: 'button',
    'data-quick': p.id,
    'aria-label': `Quick view: ${p.name}`,
  }, 'Quick view'));

  return el('article', { class: 'card' },
    media,
    el('div', { class: 'card-body' },
      el('span', { class: 'cat', text: catLabel(p.cat) }),
      el('h3', {}, el('button', {
        class: 'card-title-btn', type: 'button',
        'data-quick': p.id,
        text: p.name,
      })),
      el('p', { class: 'desc', text: p.desc }),
      el('div', { class: 'price-row' }, askPrice()),
      el('div', { class: 'card-actions' },
        externalLink({
          class: 'btn btn-wa',
          href: waLink(orderMessage(p)),
          'aria-label': `Enquire about ${p.name} on WhatsApp`,
        }, 'Enquire on WhatsApp'),
        el('div', { class: 'row' },
          el('button', {
            class: 'btn btn-quiet', type: 'button',
            'data-quick': p.id,
            'aria-label': `Details for ${p.name}`,
          }, 'Details'),
          el('a', { class: 'btn btn-quiet', href: CALL_LINK, 'aria-label': `Call about ${p.name}` }, '☎ Call'),
        ),
      ),
    ),
  );
}

function applyFilters() {
  const q = query.trim().toLowerCase();
  let list = PRODUCTS.filter((p) => {
    const inCat = activeCat === 'all' || p.cat === activeCat;
    const haystack = `${p.name} ${p.desc} ${p.tags} ${catLabel(p.cat)}`.toLowerCase();
    return inCat && (!q || haystack.includes(q));
  });

  if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === 'category') {
    list = [...list].sort((a, b) =>
      CATEGORIES.findIndex((c) => c.id === a.cat) - CATEGORIES.findIndex((c) => c.id === b.cat)
      || a.name.localeCompare(b.name));
  }

  return list;
}

function render() {
  const list = applyFilters();
  grid.setAttribute('aria-busy', 'true');
  grid.replaceChildren();

  if (!list.length) {
    grid.append(el('div', { class: 'empty' },
      el('h3', { text: 'Nothing matched that search' }),
      el('p', { text: 'Try “coaster”, “keychain” or “cover” — or ask us to make something custom.' }),
      el('button', {
        class: 'btn btn-quiet', type: 'button', id: 'resetFilters',
      }, 'Clear filters'),
    ));
  } else {
    const frag = document.createDocumentFragment();
    list.forEach((p) => frag.append(buildCard(p)));
    grid.append(frag);
  }

  const total = PRODUCTS.length;
  const noun = list.length === 1 ? 'piece' : 'pieces';
  resultCount.textContent = list.length === total
    ? `Showing all ${total} ${noun}`
    : `Showing ${list.length} of ${total} ${noun}${query ? ` for “${query.trim()}”` : ''}`;

  grid.setAttribute('aria-busy', 'false');
}

/* --------------------------------------------------------------- controls */
filters.addEventListener('click', (event) => {
  const chip = event.target.closest('button[data-cat]');
  if (!chip) return;
  activeCat = chip.dataset.cat;
  $$('button[data-cat]', filters).forEach((c) => {
    const on = c === chip;
    c.classList.toggle('is-active', on);
    c.setAttribute('aria-pressed', String(on));
  });
  render();
});

sortSelect.addEventListener('change', () => {
  sortBy = sortSelect.value;
  render();
});

searchInput.addEventListener('input', () => {
  query = searchInput.value.slice(0, 60);
  clearTimeout(searchTimer);
  searchTimer = setTimeout(render, 160);
});

/* Clear filters from the empty state (delegated, survives re-render). */
grid.addEventListener('click', (event) => {
  if (event.target.id !== 'resetFilters') return;
  query = '';
  searchInput.value = '';
  activeCat = 'all';
  sortBy = 'featured';
  sortSelect.value = 'featured';
  $$('button[data-cat]', filters).forEach((c) => {
    const on = c.dataset.cat === 'all';
    c.classList.toggle('is-active', on);
    c.setAttribute('aria-pressed', String(on));
  });
  render();
  searchInput.focus();
});

/* ------------------------------------------------------------ quick view */
function similarTo(p, count = 3) {
  const sameCat = PRODUCTS.filter((x) => x.id !== p.id && x.cat === p.cat);
  const others = PRODUCTS.filter((x) => x.id !== p.id && x.cat !== p.cat);
  return [...sameCat, ...others].slice(0, count);
}

function openQuick(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;

  const alreadyOpen = dialog.open;
  if (!alreadyOpen) lastFocused = document.activeElement;

  const art = el('div', { class: 'modal-art' },
    productImage(p, { className: 'modal-img', lazy: false }),
  );
  if (p.badge) art.append(el('span', { class: 'badge', text: p.badge }));
  art.append(el('button', {
    class: 'modal-close', type: 'button', 'data-close': true, 'aria-label': 'Close quick view',
  }, '✕'));

  const specs = el('dl', { class: 'specs' });
  for (const [label, value] of Object.entries(p.specs)) {
    specs.append(el('div', {}, el('dt', { text: label }), el('dd', { text: value })));
  }

  const related = el('ul', { class: 'related-list' });
  similarTo(p).forEach((r) => {
    related.append(el('li', {},
      el('button', {
        class: 'related-item', type: 'button',
        'data-quick': r.id,
        'aria-label': `View ${r.name}`,
      },
        productImage(r, { className: 'related-img' }),
        el('span', { class: 'related-name', text: r.name }),
      ),
    ));
  });

  dialogBody.replaceChildren(
    art,
    el('div', { class: 'modal-body' },
      el('span', { class: 'cat', text: catLabel(p.cat) }),
      el('h2', { id: 'dlgTitle', text: p.name }),
      el('p', { class: 'desc', text: p.desc }),
      el('div', { class: 'modal-price' }, askPrice(), el('span', { class: 'modal-price-note', text: 'Quote shared in chat' })),
      specs,
      el('p', { class: 'modal-perks', text: '✓ Personalisation available · ✓ Photo approval before dispatch · ✓ Tracked pan-India shipping' }),
      externalLink({ class: 'btn btn-wa btn-block', href: waLink(orderMessage(p)) }, 'Ask for price on WhatsApp'),
      el('a', { class: 'btn btn-quiet btn-block', href: CALL_LINK }, `☎ Call ${CONFIG.callDisplay}`),
      el('div', { class: 'related' },
        el('h3', { text: 'Similar pieces' }),
        related,
      ),
    ),
  );

  if (!alreadyOpen) {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    $('.modal-close', dialogBody)?.focus();
  } else {
    $('.modal-body', dialogBody).scrollTop = 0;
    $('.modal-close', dialogBody)?.focus();
  }
}

function closeQuick() {
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-quick]');
  if (trigger) {
    openQuick(trigger.dataset.quick);
    return;
  }
  if (event.target.closest('[data-close]')) closeQuick();
});

/* Scroll locking is handled in CSS via body:has(dialog[open]). This listener
   only restores focus in browsers that do not do it natively. */
dialog.addEventListener('close', () => {
  if (lastFocused && document.contains(lastFocused) && document.activeElement === document.body) {
    lastFocused.focus();
  }
});

/* Backdrop click: the dialog box itself is the only hit target outside .modal-inner */
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  const inside =
    event.clientX >= rect.left && event.clientX <= rect.right &&
    event.clientY >= rect.top && event.clientY <= rect.bottom;
  if (!inside) closeQuick();
});

/* ------------------------------------------------------------- phone / wa */
$$('[data-call]').forEach((a) => {
  a.href = CALL_LINK;
  if (a.textContent.trim().startsWith('+91')) a.textContent = CONFIG.callDisplay;
});

$$('[data-wa]').forEach((a) => {
  a.href = waLink(GENERAL_MESSAGE);
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

/* ------------------------------------------------------------ quote form */
const form = $('#customForm');

const FIELDS = [
  { id: 'cfItem', label: 'what you would like made', min: 3, max: 120 },
  { id: 'cfName', label: 'your name', min: 2, max: 60 },
  { id: 'cfCity', label: 'your city', min: 2, max: 60 },
  { id: 'cfMsg', label: 'details', min: 0, max: 500, optional: true },
];

function setFieldError(field, message) {
  const input = document.getElementById(field.id);
  const err = document.getElementById(`${field.id}Err`);
  if (!input || !err) return;
  if (message) {
    input.setAttribute('aria-invalid', 'true');
    err.textContent = message;
    err.hidden = false;
  } else {
    input.removeAttribute('aria-invalid');
    err.textContent = '';
    err.hidden = true;
  }
}

function validateField(field) {
  const input = document.getElementById(field.id);
  if (!input) return true;
  const value = input.value.trim();

  if (!value) {
    if (field.optional) { setFieldError(field, ''); return true; }
    setFieldError(field, `Please add ${field.label}.`);
    return false;
  }
  if (value.length < field.min) {
    setFieldError(field, `Please use at least ${field.min} characters.`);
    return false;
  }
  if (value.length > field.max) {
    setFieldError(field, `Please keep this under ${field.max} characters.`);
    return false;
  }
  setFieldError(field, '');
  return true;
}

FIELDS.forEach((field) => {
  const input = document.getElementById(field.id);
  if (!input) return;
  input.addEventListener('blur', () => {
    if (input.value.trim() || input.getAttribute('aria-invalid') === 'true') validateField(field);
  });
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validateField(field);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const invalid = FIELDS.filter((field) => !validateField(field));
  if (invalid.length) {
    document.getElementById(invalid[0].id)?.focus();
    toast('Please check the highlighted fields.');
    return;
  }

  const value = (id) => document.getElementById(id).value.trim();
  const message =
    `Hi ${CONFIG.shopName}! I would like a custom quote:\n` +
    `• Item: ${value('cfItem')}\n` +
    `• Name: ${value('cfName')}\n` +
    `• City: ${value('cfCity')}\n` +
    `• Details: ${value('cfMsg') || '—'}\n\n` +
    `Please share the price and timeline. Thank you!`;

  openExternal(waLink(message));
  toast('Opening WhatsApp with your request…');
});

/* ------------------------------------------------------------- mobile nav */
const menuBtn = $('#menuBtn');
const mobileNav = $('#mobileNav');

function setMenu(open) {
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.hidden = !open;
}

menuBtn.addEventListener('click', () => {
  setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
});
mobileNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuBtn.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 980 && !mobileNav.hidden) setMenu(false);
});

/* ---------------------------------------------------------- active nav link */
const navLinks = $$('a[data-nav]');
const sections = navLinks
  .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach((s) => spy.observe(s));
}

/* -------------------------------------------------------------- reveal */
if ('IntersectionObserver' in window && !reduceMotion()) {
  const targets = $$('.sec-head, .step, .rev, .svc');
  targets.forEach((t) => t.classList.add('reveal'));
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  targets.forEach((t) => revealer.observe(t));
}

/* ------------------------------------------------------------------ init */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
render();
