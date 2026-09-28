/* ==========================================================
   Pure Dairy – script.js
   Data, rendering, cart, search/filter/sort, UI behaviours
   ========================================================== */
'use strict';

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => '₹' + n.toFixed(2);
const TAX_RATE = 0.05;
// Free keyword-based dairy photos; if an image fails, the gradient behind it shows.
const img = (kw, lock, w = 500, h = 380) => `https://loremflickr.com/${w}/${h}/${kw}?lock=${lock}`;
const imgTag = (src, alt) => `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.style.display='none'">`;
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
};

/* ---------- Data ---------- */
const CATEGORIES = [
  { name: 'Milk', kw: 'milk,glass' }, { name: 'Curd', kw: 'curd,yogurt,bowl' },
  { name: 'Paneer', kw: 'paneer,cheese' }, { name: 'Butter', kw: 'butter' },
  { name: 'Cheese', kw: 'cheese' }, { name: 'Ghee', kw: 'ghee,butter,jar' },
  { name: 'Yogurt', kw: 'yogurt,fruit' }, { name: 'Ice Cream', kw: 'icecream' }
];

const PRODUCTS = [
  { id: 1, name: 'Full Cream Milk 1L', cat: 'Milk', price: 68, rating: 4.8, reviews: 412, desc: 'Rich, creamy milk with 6% fat, bottled the morning it is milked.', kw: 'milk,bottle' },
  { id: 2, name: 'Toned Milk 500ml', cat: 'Milk', price: 30, rating: 4.5, reviews: 268, desc: 'Light everyday milk for tea, coffee and cereal.', kw: 'milk,glass' },
  { id: 3, name: 'Fresh Set Curd 400g', cat: 'Curd', price: 45, rating: 4.7, reviews: 305, desc: 'Thick, mildly tangy curd set naturally in earthen-style cups.', kw: 'curd,bowl' },
  { id: 4, name: 'Probiotic Dahi 1kg', cat: 'Curd', price: 92, rating: 4.6, reviews: 190, desc: 'Live cultures for gut health, perfect for raita and lassi.', kw: 'yogurt,bowl' },
  { id: 5, name: 'Soft Malai Paneer 200g', cat: 'Paneer', price: 85, rating: 4.9, reviews: 521, desc: 'Melt-in-mouth paneer, made fresh every day, no additives.', kw: 'paneer' },
  { id: 6, name: 'Cubed Paneer Block 500g', cat: 'Paneer', price: 195, rating: 4.6, reviews: 143, desc: 'Firm, high-protein paneer that holds its shape in curries.', kw: 'cottage,cheese' },
  { id: 7, name: 'Salted Table Butter 100g', cat: 'Butter', price: 58, rating: 4.7, reviews: 376, desc: 'Churned from fresh cream, golden and lightly salted.', kw: 'butter,toast' },
  { id: 8, name: 'Unsalted Butter 500g', cat: 'Butter', price: 265, rating: 4.4, reviews: 98, desc: 'Baker-favourite butter with clean, sweet cream flavour.', kw: 'butter,block' },
  { id: 9, name: 'Mozzarella Cheese 200g', cat: 'Cheese', price: 140, rating: 4.8, reviews: 289, desc: 'Stretchy, milky mozzarella made for pizza and pasta.', kw: 'mozzarella' },
  { id: 10, name: 'Aged Cheddar 200g', cat: 'Cheese', price: 210, rating: 4.5, reviews: 117, desc: 'Sharp, nutty cheddar matured for six months.', kw: 'cheddar' },
  { id: 11, name: 'Pure Desi Cow Ghee 500ml', cat: 'Ghee', price: 425, rating: 4.9, reviews: 640, desc: 'Slow-cooked bilona ghee with a granular texture and warm aroma.', kw: 'ghee,jar' },
  { id: 12, name: 'Buffalo Ghee 1L', cat: 'Ghee', price: 760, rating: 4.6, reviews: 205, desc: 'Rich, creamy ghee for parathas, sweets and tempering.', kw: 'clarified,butter' },
  { id: 13, name: 'Strawberry Yogurt 100g', cat: 'Yogurt', price: 30, rating: 4.7, reviews: 332, desc: 'Creamy yogurt swirled with real strawberry pulp.', kw: 'strawberry,yogurt' },
  { id: 14, name: 'Greek Yogurt 200g', cat: 'Yogurt', price: 70, rating: 4.8, reviews: 254, desc: 'Strained, protein-packed and free from added sugar.', kw: 'greek,yogurt' },
  { id: 15, name: 'Vanilla Bean Ice Cream 500ml', cat: 'Ice Cream', price: 220, rating: 4.7, reviews: 301, desc: 'Classic vanilla flecked with real vanilla beans.', kw: 'vanilla,icecream' },
  { id: 16, name: 'Kesar Pista Kulfi 4-pack', cat: 'Ice Cream', price: 180, rating: 4.9, reviews: 187, desc: 'Traditional kulfi with saffron and crushed pistachios.', kw: 'kulfi,dessert' }
];
PRODUCTS.forEach(p => p.image = img(p.kw, p.id + 20));

const WHY = [
  ['🥛', '100% Fresh Products', 'Milked at dawn, processed within hours, never stored for days.'],
  ['🚜', 'Farm to Home Delivery', 'No middlemen. Our own cold-chain vans bring it from farm to your door.'],
  ['🔬', 'Quality Tested', 'Every batch passes 27 lab checks for purity and safety.'],
  ['🌱', 'Organic Feed', 'Our cows eat pesticide-free fodder and graze on open pasture.'],
  ['⚡', 'Fast Delivery', 'Choose a morning or evening slot, delivered in under 60 minutes on demand.'],
  ['💰', 'Affordable Prices', 'Farm-direct pricing keeps premium dairy within everyday budgets.']
];

const TESTIMONIALS = [
  { n: 'Simran Kaur', r: 'Ludhiana', s: 5, t: 'The ghee smells exactly like my grandmother’s kitchen. We have not bought any other brand in two years.', p: 21 },
  { n: 'Rahul Mehta', r: 'Chandigarh', s: 5, t: 'Milk arrives before 6 AM, still cold, and the bottle is dated. Reliable every single day.', p: 32 },
  { n: 'Anita Sharma', r: 'Amritsar', s: 4, t: 'The paneer is soft and never rubbery. My kids also love the strawberry yogurt.', p: 45 }
];

const FAQS = [
  ['Where do you deliver?', 'We currently deliver across Ludhiana, Chandigarh, Jalandhar and Amritsar, and we add new areas every month.'],
  ['What time will my order arrive?', 'Morning slots run from 5 AM to 8 AM and evening slots from 5 PM to 7 PM. On-demand orders arrive within 60 minutes.'],
  ['Is your milk pasteurised and preservative-free?', 'Yes. Milk is gently pasteurised and never contains preservatives, detergents or added water.'],
  ['Can I pause or cancel a subscription?', 'Yes. Pause, skip or cancel any day before 10 PM the previous night from your account.'],
  ['What is your refund policy?', 'If any product is not fresh, message us within 12 hours with a photo and we will refund or replace it at once.']
];

/* ---------- State ---------- */
let cart = store.get('pd_cart', []);          // [{id, qty}]
let wishlist = store.get('pd_wish', []);      // [id]
const qtyPick = {};                           // quantity chosen on each card

/* ---------- Render: categories, filter, footer ---------- */
$('#categoryGrid').innerHTML = CATEGORIES.map((c, i) => `
  <div class="cat reveal" data-cat="${c.name}" tabindex="0" role="button" aria-label="Show ${c.name}">
    ${imgTag(img(c.kw, i + 60, 400, 400), c.name)}<span>${c.name}</span>
  </div>`).join('');
$('#filter').innerHTML = '<option value="All">All categories</option>' + CATEGORIES.map(c => `<option>${c.name}</option>`).join('');
$('#footCats').innerHTML = CATEGORIES.map(c => `<a href="#products" data-cat="${c.name}">${c.name}</a>`).join('');

/* ---------- Render: Why, testimonials, FAQ ---------- */
$('#whyGrid').innerHTML = WHY.map(w => `<div class="why reveal"><div class="ic">${w[0]}</div><h3>${w[1]}</h3><p>${w[2]}</p></div>`).join('');
const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
$('#testiGrid').innerHTML = TESTIMONIALS.map(t => `
  <div class="testi reveal"><div class="stars">${stars(t.s)}</div><p>“${t.t}”</p>
  <div class="who">${imgTag(`https://i.pravatar.cc/100?img=${t.p}`, t.n)}<div><b>${t.n}</b><small>${t.r}</small></div></div></div>`).join('');
$('#faqList').innerHTML = FAQS.map(f => `
  <div class="faq-item"><button class="faq-q" aria-expanded="false">${f[0]}</button><div class="faq-a"><p>${f[1]}</p></div></div>`).join('');

/* ---------- FAQ accordion ---------- */
$('#faqList').addEventListener('click', e => {
  const q = e.target.closest('.faq-q'); if (!q) return;
  const item = q.parentElement, open = !item.classList.contains('open');
  $$('.faq-item').forEach(i => { i.classList.remove('open'); $('.faq-a', i).style.maxHeight = null; $('.faq-q', i).setAttribute('aria-expanded', 'false'); });
  if (open) { item.classList.add('open'); $('.faq-a', item).style.maxHeight = $('.faq-a', item).scrollHeight + 'px'; q.setAttribute('aria-expanded', 'true'); }
});

/* ---------- Products: search, filter, sort ---------- */
function renderProducts() {
  const term = $('#search').value.trim().toLowerCase();
  const cat = $('#filter').value, sort = $('#sort').value;
  let list = PRODUCTS.filter(p => (cat === 'All' || p.cat === cat) &&
    (p.name + p.desc + p.cat).toLowerCase().includes(term));
  const sorters = {
    low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating, name: (a, b) => a.name.localeCompare(b.name)
  };
  if (sorters[sort]) list.sort(sorters[sort]);
  $('#noResults').hidden = list.length > 0;
  $('#productGrid').innerHTML = list.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="pic">${imgTag(p.image, p.name)}
        <button class="wish ${wishlist.includes(p.id) ? 'on' : ''}" aria-label="Add ${p.name} to wishlist">${wishlist.includes(p.id) ? '♥' : '♡'}</button></div>
      <div class="body">
        <h3>${p.name}</h3><p>${p.desc}</p>
        <div class="stars">${stars(p.rating)} <small>${p.rating} (${p.reviews})</small></div>
        <div class="price">${money(p.price)}</div>
        <div class="buy">
          <div class="qty"><button data-act="dec" aria-label="Decrease">−</button><span>${qtyPick[p.id] || 1}</span><button data-act="inc" aria-label="Increase">+</button></div>
          <button class="btn primary" data-act="add">Add to Cart</button>
        </div>
      </div>
    </article>`).join('');
}
['input', 'change'].forEach(ev => { $('#search').addEventListener(ev, renderProducts); $('#filter').addEventListener(ev, renderProducts); $('#sort').addEventListener(ev, renderProducts); });

function setCategory(name) {
  $('#filter').value = name; $('#search').value = ''; renderProducts();
  $('#products').scrollIntoView({ behavior: 'smooth' });
}
document.addEventListener('click', e => {
  const c = e.target.closest('[data-cat]'); if (c) { e.preventDefault(); setCategory(c.dataset.cat); }
});
$('#categoryGrid').addEventListener('keydown', e => { if (e.key === 'Enter') e.target.click(); });

/* Product card actions (quantity, add, wishlist) */
$('#productGrid').addEventListener('click', e => {
  const card = e.target.closest('.card'); if (!card) return;
  const id = +card.dataset.id, span = $('.qty span', card);
  if (e.target.closest('.wish')) {
    wishlist = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id];
    store.set('pd_wish', wishlist);
    const on = wishlist.includes(id), b = e.target.closest('.wish');
    b.classList.toggle('on', on); b.textContent = on ? '♥' : '♡';
    toast(on ? 'Added to wishlist' : 'Removed from wishlist'); return;
  }
  const act = e.target.dataset.act; if (!act) return;
  if (act === 'inc') span.textContent = qtyPick[id] = Math.min(10, (qtyPick[id] || 1) + 1);
  if (act === 'dec') span.textContent = qtyPick[id] = Math.max(1, (qtyPick[id] || 1) - 1);
  if (act === 'add') { addToCart(id, qtyPick[id] || 1); span.textContent = qtyPick[id] = 1; }
});

/* ---------- Shopping cart ---------- */
function addToCart(id, qty) {
  const it = cart.find(c => c.id === id);
  it ? it.qty += qty : cart.push({ id, qty });
  saveCart(); toast('Added to cart');
}
function saveCart() { store.set('pd_cart', cart); renderCart(); }
function renderCart() {
  const box = $('#cartItems');
  box.innerHTML = cart.length ? cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    return `<div class="ci" data-id="${p.id}">${imgTag(p.image, p.name)}
      <div><h4>${p.name}</h4><small>${money(p.price)} each</small>
        <div class="qty"><button data-act="dec" aria-label="Decrease">−</button><span>${c.qty}</span><button data-act="inc" aria-label="Increase">+</button></div></div>
      <div><b>${money(p.price * c.qty)}</b><br><button class="rm" data-act="rm" aria-label="Remove ${p.name}">🗑</button></div></div>`;
  }).join('') : '<p class="empty">Your cart is empty. Add something fresh!</p>';
  const sub = cart.reduce((s, c) => s + PRODUCTS.find(x => x.id === c.id).price * c.qty, 0);
  const tax = sub * TAX_RATE;
  $('#subtotal').textContent = money(sub); $('#tax').textContent = money(tax); $('#total').textContent = money(sub + tax);
  $('#cartCount').textContent = cart.reduce((s, c) => s + c.qty, 0);
}
$('#cartItems').addEventListener('click', e => {
  const row = e.target.closest('.ci'), act = e.target.dataset.act; if (!row || !act) return;
  const id = +row.dataset.id, it = cart.find(c => c.id === id);
  if (act === 'inc') it.qty++;
  if (act === 'dec') it.qty--;
  if (act === 'rm' || it.qty < 1) cart = cart.filter(c => c.id !== id);
  saveCart();
});
const toggleCart = open => { $('#cart').classList.toggle('open', open); $('#overlay').classList.toggle('show', open); };
$('#cartBtn').onclick = () => toggleCart(true);
$('#closeCart').onclick = $('#overlay').onclick = () => toggleCart(false);
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleCart(false); });
$('#checkout').onclick = () => {
  if (!cart.length) return toast('Your cart is empty');
  cart = []; saveCart(); toggleCart(false); toast('Order placed! Thank you 💚');
};

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Form validation ---------- */
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = $('#newsEmail').value.trim(), m = $('#newsMsg');
  const ok = emailOk(v);
  m.className = ok ? 'ok' : 'err';
  m.textContent = ok ? 'Thanks for subscribing! Check your inbox.' : 'Enter a valid email address, like name@example.com.';
  if (ok) e.target.reset();
});
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const rules = [
    ['cName', v => v.length >= 2, 'Enter your name (at least 2 characters).'],
    ['cEmail', emailOk, 'Enter a valid email address.'],
    ['cPhone', v => /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')), 'Enter a valid 10-digit mobile number.'],
    ['cMsg', v => v.length >= 10, 'Write a message of at least 10 characters.']
  ];
  let valid = true;
  rules.forEach(([id, test, msg]) => {
    const f = $('#' + id), ok = test(f.value.trim());
    f.parentElement.querySelector('small').textContent = ok ? '' : msg;
    if (!ok) valid = false;
  });
  const out = $('#formMsg');
  out.className = valid ? 'ok' : 'err';
  out.textContent = valid ? 'Message sent! We will reply within one working day.' : 'Please fix the highlighted fields.';
  if (valid) e.target.reset();
});

/* ---------- Theme toggle (persisted) ---------- */
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  $('#themeToggle').textContent = t === 'dark' ? '☀️' : '🌙';
  store.set('pd_theme', t);
}
setTheme(store.get('pd_theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
$('#themeToggle').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');

/* ---------- Mobile menu, sticky nav, scroll-to-top ---------- */
$('#burger').onclick = () => { const o = $('#menu').classList.toggle('open'); $('#burger').textContent = o ? '✕' : '☰'; };
$$('#menu a').forEach(a => a.addEventListener('click', () => { $('#menu').classList.remove('open'); $('#burger').textContent = '☰'; }));
addEventListener('scroll', () => {
  $('#navbar').classList.toggle('sticky', scrollY > 40);
  $('#toTop').classList.toggle('show', scrollY > 500);
}, { passive: true });
$('#toTop').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));

/* ---------- Init ---------- */
$('#year').textContent = new Date().getFullYear();
renderProducts();
renderCart();
addEventListener('load', () => setTimeout(() => $('#loader').classList.add('hide'), 700));