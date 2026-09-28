// Database of Products including Ghee Variants
const products = [
  {
    id: "ghee-a2",
    name: "A2 Vedic Bilona Desi Cow Ghee",
    category: "ghee",
    price: 850,
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80",
    desc: "Hand-churned from organic A2 cow curd using traditional earthen pots in Jalandhar Cantt."
  },
  {
    id: "ghee-cow",
    name: "Pure Desi Cow Ghee",
    category: "ghee",
    price: 650,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    desc: "Rich golden ghee made from pure cow milk, packed with natural rich flavor and essential fats."
  },
  {
    id: "ghee-buffalo",
    name: "Traditional Buffalo Ghee",
    category: "ghee",
    price: 700,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
    desc: "Creamy white ghee ideal for sweets, high heat cooking, and daily energy."
  },
  {
    id: "milk-full",
    name: "Farm Fresh Whole Milk",
    category: "milk",
    price: 66,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
    desc: "Pure pasteurized whole cow milk delivered before 6 AM daily."
  },
  {
    id: "paneer-fresh",
    name: "Soft Malai Paneer",
    category: "paneer",
    price: 120,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    desc: "Fresh, extra soft cottage cheese made every morning."
  },
  {
    id: "butter-yellow",
    name: "Cultured White Butter (Makhan)",
    category: "butter",
    price: 90,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    desc: "Traditional unsalted white butter hand-churned from fresh cream."
  },
  {
    id: "curd-dahi",
    name: "Thick Natural Dahi (Curd)",
    category: "curd",
    price: 45,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    desc: "Set curd with balanced mild tartness and thick probiotic texture."
  },
  {
    id: "icecream-vanilla",
    name: "Real Milk Vanilla Ice Cream",
    category: "icecream",
    price: 150,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80",
    desc: "Rich ice cream churned using pure whole cream and real vanilla beans."
  }
];

// Categories
const categories = [
  { id: "all", name: "All Products" },
  { id: "ghee", name: "Desi Ghee", img: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=400&q=80" },
  { id: "milk", name: "Fresh Milk", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80" },
  { id: "paneer", name: "Paneer", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80" },
  { id: "butter", name: "Butter & Makhan", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80" },
  { id: "curd", name: "Fresh Curd", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80" }
];

// Why Choose Us Cards
const whyUs = [
  { icon: "🌿", title: "100% Organic Fodder", text: "Our cows eat organic feed grown directly on our farms in Punjab." },
  { icon: "🧈", title: "Vedic Bilona Process", text: "Traditional curd churning method preserving rich nutrients in our Ghee." },
  { icon: "🚚", title: "Early Morning Delivery", text: "Delivered to your doorstep in Jalandhar Cantt before 6:00 AM." }
];

// Testimonials
const testimonials = [
  { name: "Gurpreet Kaur", location: "Sadar Bazar, Jalandhar Cantt", text: "The A2 Bilona Desi Ghee has the exact same golden granular texture my grandmother used to make at home!", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" },
  { name: "Amit Sharma", location: "Cantt Road, Jalandhar", text: "Timely delivery every morning. The milk and paneer are noticeably fresher than packet brands.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" }
];

// FAQ
const faqs = [
  { q: "Where is Koms Dairy located?", a: "We are located at Koms Dairy, Sadar Bazar, Cantt Road, Jalandhar Cantt, Punjab 144005." },
  { q: "How is your Desi Ghee prepared?", a: "Our Ghee is hand-churned using the traditional Vedic Bilona method from fresh cultured curd, preserving aroma and health benefits." },
  { q: "What time is morning delivery scheduled?", a: "All subscriptions in Jalandhar Cantt are delivered between 5:30 AM and 7:00 AM daily." }
];

// Cart State
let cart = [];

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Hide Loader
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if(loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 500);
    }
  }, 400);

  // Set Current Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Render Initial Components
  renderCategories();
  renderFilterOptions();
  renderProducts(products);
  renderWhyUs();
  renderTestimonials();
  renderFAQs();

  // Event Listeners
  setupEventListeners();
});

function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  const footGrid = document.getElementById("footCats");
  
  grid.innerHTML = categories.filter(c => c.id !== 'all').map(cat => `
    <div class="cat-card" onclick="filterByCategory('${cat.id}')">
      <img src="${cat.img}" alt="${cat.name}" loading="lazy">
      <div class="cat-card-body">
        <h3>${cat.name}</h3>
      </div>
    </div>
  `).join('');

  footGrid.innerHTML = categories.filter(c => c.id !== 'all').map(cat => `
    <a href="#products" onclick="filterByCategory('${cat.id}')">${cat.name}</a>
  `).join('');
}

function renderFilterOptions() {
  const select = document.getElementById("filter");
  select.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function renderProducts(items) {
  const grid = document.getElementById("productGrid");
  const noRes = document.getElementById("noResults");

  if(items.length === 0) {
    grid.innerHTML = "";
    noRes.hidden = false;
    return;
  }

  noRes.hidden = true;
  grid.innerHTML = items.map(p => `
    <div class="product-card">
      <div class="product-img" onclick="openProductModal('${p.id}')">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-bottom">
          <span class="price">₹${p.price}</span>
          <button class="btn primary" onclick="addToCart('${p.id}')">Add +</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderWhyUs() {
  const grid = document.getElementById("whyGrid");
  grid.innerHTML = whyUs.map(w => `
    <div class="feature-box">
      <div style="font-size:2rem;margin-bottom:10px">${w.icon}</div>
      <h3>${w.title}</h3>
      <p style="color:var(--text-muted);margin-top:6px">${w.text}</p>
    </div>
  `).join('');
}

function renderTestimonials() {
  const grid = document.getElementById("testiGrid");
  grid.innerHTML = testimonials.map(t => `
    <div class="testi-card">
      <div class="testi-header">
        <img src="${t.img}" alt="${t.name}">
        <div>
          <h4>${t.name}</h4>
          <small style="color:var(--text-muted)">${t.location}</small>
        </div>
      </div>
      <p>"${t.text}"</p>
    </div>
  `).join('');
}

function renderFAQs() {
  const list = document.getElementById("faqList");
  list.innerHTML = faqs.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-question" onclick="toggleFaq(${i})">
        <span>${f.q}</span>
        <span>+</span>
      </button>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join('');
}

function toggleFaq(index) {
  const item = document.getElementById(`faq-${index}`);
  item.classList.toggle("active");
}

function setupEventListeners() {
  // Dark Mode Toggle
  document.getElementById("themeToggle").addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    document.body.setAttribute("data-theme", isDark ? "light" : "dark");
    document.getElementById("themeToggle").textContent = isDark ? "🌙" : "☀️";
  });

  // Mobile Burger Menu Toggle
  document.getElementById("burger").addEventListener("click", () => {
    document.getElementById("menu").classList.toggle("show");
  });

  // Search Input
  document.getElementById("search").addEventListener("input", filterProducts);
  document.getElementById("filter").addEventListener("change", filterProducts);
  document.getElementById("sort").addEventListener("change", filterProducts);

  // Cart Drawer Listeners
  document.getElementById("cartBtn").addEventListener("click", toggleCart);
  document.getElementById("closeCart").addEventListener("click", toggleCart);
  document.getElementById("overlay").addEventListener("click", toggleCart);

  // Modal Listener
  document.getElementById("closeModal").addEventListener("click", closeModal);

  // Back to top button
  window.addEventListener("scroll", () => {
    const btn = document.getElementById("toTop");
    if (window.scrollY > 300) btn.classList.add("show");
    else btn.classList.remove("show");
  });

  document.getElementById("toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function filterByCategory(catId) {
  document.getElementById("filter").value = catId;
  filterProducts();
  document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
}

function filterProducts() {
  const query = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("filter").value;
  const sort = document.getElementById("sort").value;

  let result = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sort === "low") result.sort((a, b) => a.price - b.price);
  if (sort === "high") result.sort((a, b) => b.price - a.price);
  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

  renderProducts(result);
}

// Shopping Cart Functions
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if(!product) return;

  const existing = cart.find(item => item.id === id);
  if(existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`${product.name} added to cart!`);
}

function addToCartDirect(id, name, price) {
  addToCart(id);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if(item) {
    item.qty += delta;
    if(item.qty <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  }
}

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");
  const shipProgress = document.getElementById("shipProgress");

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  countEl.textContent = totalQty;
  subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
  taxEl.textContent = `₹${tax.toFixed(2)}`;
  totalEl.textContent = `₹${total.toFixed(2)}`;

  // Free delivery bar threshold ₹199
  const progressPercent = Math.min((subtotal / 199) * 100, 100);
  shipProgress.style.width = `${progressPercent}%`;

  if(cart.length === 0) {
    cartItems.innerHTML = `<p style="text-align:center;color:var(--text-muted);margin-top:40px;">Your basket is empty.</p>`;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div style="flex:1">
          <h4 style="font-size:0.95rem">${item.name}</h4>
          <span style="color:var(--primary);font-weight:bold">₹${item.price}</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button onclick="changeQty('${item.id}', -1)" class="icon-btn" style="width:28px;height:28px">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.id}', 1)" class="icon-btn" style="width:28px;height:28px">+</button>
        </div>
      </div>
    `).join('');
  }
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

function openProductModal(id) {
  const product = products.find(p => p.id === id);
  if(!product) return;

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <img src="${product.img}" alt="${product.name}" style="width:100%;height:250px;object-fit:cover;border-radius:12px;margin-bottom:16px;">
    <h2>${product.name}</h2>
    <p style="color:var(--text-muted);margin:10px 0;">${product.desc}</p>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;">
      <span style="font-size:1.6rem;font-weight:bold;color:var(--primary)">₹${product.price}</span>
      <button class="btn primary" onclick="addToCart('${product.id}');closeModal();">Add to Cart</button>
    </div>
  `;
  document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}