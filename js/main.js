// ==========================================================================
// LUMIÈRE & CO. - MAIN JAVASCRIPT CONTROLLER
// Complete Functionality for Retail, Services, Guide, Blog & Contact
// Includes Theme Toggling (Light/Dark) & Dynamic RTL Layout Engine
// ==========================================================================

// Global Quote / Wishlist State
let quoteItems = [];
const USD_TO_INR_RATE = 88;

function formatCurrency(amountInUsd) {
  const amountInInr = Math.round(amountInUsd * USD_TO_INR_RATE);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amountInInr);
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initThemeAndRtl();
  initStorage();
  initNavbar();
  initGlobalModals();
  initToastContainer();
  initPageSpecifics();
});

// 0. Theme & RTL Engine
function initThemeAndRtl() {
  // Theme check
  const savedTheme = localStorage.getItem("lumiere_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateThemeIcons();

  // RTL check
  const savedRtl = localStorage.getItem("lumiere_rtl");
  if (savedRtl === "true") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
  updateRtlButtons();

  // Bind theme toggle buttons
  const themeBtns = document.querySelectorAll(".theme-toggle-btn");
  themeBtns.forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });

  // Bind RTL toggle buttons
  const rtlBtns = document.querySelectorAll(".rtl-toggle-btn");
  rtlBtns.forEach(btn => {
    btn.addEventListener("click", toggleRtl);
  });
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("lumiere_theme", isDark ? "dark" : "light");
  updateThemeIcons();
  showToast(
    isDark ? "Dark Atmosphere Activated" : "Bright Luxury Mode Activated",
    isDark ? "Switched to deep obsidian & amber lighting theme." : "Switched to classic warm alabaster theme.",
    isDark ? "fa-moon" : "fa-sun"
  );
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains("dark");
  const themeBtns = document.querySelectorAll(".theme-toggle-btn");
  themeBtns.forEach(btn => {
    btn.innerHTML = isDark 
      ? '<i class="fa-solid fa-sun text-amber-400 text-sm"></i>' 
      : '<i class="fa-solid fa-moon text-stone-700 text-sm"></i>';
    btn.setAttribute("title", isDark ? "Switch to Light Theme" : "Switch to Dark Theme");
  });
}

function toggleRtl() {
  const isRtl = document.documentElement.getAttribute("dir") === "rtl";
  const newRtl = !isRtl;
  document.documentElement.setAttribute("dir", newRtl ? "rtl" : "ltr");
  localStorage.setItem("lumiere_rtl", newRtl ? "true" : "false");
  updateRtlButtons();
  showToast(
    newRtl ? "RTL Alignment Active" : "LTR Alignment Active",
    newRtl ? "Layout adapted to Right-to-Left orientation." : "Layout adapted to Left-to-Right orientation.",
    "fa-right-left"
  );
}

function updateRtlButtons() {
  const isRtl = document.documentElement.getAttribute("dir") === "rtl";
  const rtlBtns = document.querySelectorAll(".rtl-toggle-btn");
  rtlBtns.forEach(btn => {
    const textSpan = btn.querySelector(".rtl-btn-text");
    if (textSpan) {
      textSpan.textContent = isRtl ? "LTR" : "RTL";
    }
    btn.setAttribute("title", isRtl ? "Switch to LTR Layout" : "Switch to RTL Layout");
    if (isRtl) {
      btn.classList.add("bg-amber-500/10", "border-amber-500/40", "text-amber-500");
    } else {
      btn.classList.remove("bg-amber-500/10", "border-amber-500/40", "text-amber-500");
    }
  });
}

// 1. Local Storage for Quote / Wishlist
function initStorage() {
  try {
    const saved = localStorage.getItem("lumiere_quote");
    if (saved) {
      quoteItems = JSON.parse(saved);
    }
  } catch (e) {
    quoteItems = [];
  }
  updateQuoteUI();
}

function saveQuote() {
  try {
    localStorage.setItem("lumiere_quote", JSON.stringify(quoteItems));
  } catch (e) {}
  updateQuoteUI();
}

function addToQuote(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = quoteItems.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
    showToast("Quantity Updated", `Increased quantity of "${product.name}" in your quotation list.`);
  } else {
    quoteItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      dimensions: product.dimensions,
      finish: product.finish,
      quantity: 1
    });
    showToast("Added to Quotation", `"${product.name}" has been added to your quote list.`);
  }
  saveQuote();
  openQuoteDrawer();
}

function removeFromQuote(productId) {
  const index = quoteItems.findIndex(i => i.id === productId);
  if (index !== -1) {
    const name = quoteItems[index].name;
    quoteItems.splice(index, 1);
    saveQuote();
    showToast("Removed from Quote", `"${name}" removed from your list.`);
  }
}

function updateQuoteQuantity(productId, delta) {
  const item = quoteItems.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromQuote(productId);
    } else {
      saveQuote();
    }
  }
}

function updateQuoteUI() {
  const badgeCounts = document.querySelectorAll(".quote-count-badge");
  const totalCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  badgeCounts.forEach(el => {
    el.textContent = totalCount;
    if (totalCount > 0) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });

  const listEl = document.getElementById("quote-drawer-items");
  const subtotalEl = document.getElementById("quote-subtotal");
  const emptyStateEl = document.getElementById("quote-empty-state");
  const footerEl = document.getElementById("quote-drawer-footer");

  if (!listEl) return;

  if (quoteItems.length === 0) {
    listEl.innerHTML = "";
    if (emptyStateEl) emptyStateEl.classList.remove("hidden");
    if (footerEl) footerEl.classList.add("hidden");
    if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
    return;
  }

  if (emptyStateEl) emptyStateEl.classList.add("hidden");
  if (footerEl) footerEl.classList.remove("hidden");

  let total = 0;
  listEl.innerHTML = quoteItems.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div class="flex gap-4 items-center py-4 border-b border-stone-200 dark:border-stone-800">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg border border-stone-200 dark:border-stone-700" />
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">${item.name}</h4>
          <p class="text-xs text-stone-500 dark:text-stone-400 truncate">${item.dimensions} • ${item.finish}</p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs font-semibold text-amber-700 dark:text-amber-400">${formatCurrency(item.price)}</span>
            <div class="flex items-center border border-stone-300 dark:border-stone-700 rounded overflow-hidden">
              <button onclick="updateQuoteQuantity('${item.id}', -1)" class="px-2 py-0.5 text-xs bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition">-</button>
              <span class="px-2.5 py-0.5 text-xs text-stone-800 dark:text-stone-200 font-medium">${item.quantity}</span>
              <button onclick="updateQuoteQuantity('${item.id}', 1)" class="px-2 py-0.5 text-xs bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition">+</button>
            </div>
          </div>
        </div>
        <button onclick="removeFromQuote('${item.id}')" class="text-stone-400 hover:text-red-500 transition p-1" title="Remove">
          <i class="fa-solid fa-trash-can text-sm"></i>
        </button>
      </div>
    `;
  }).join("");

  if (subtotalEl) {
    subtotalEl.textContent = formatCurrency(total);
  }
}

function openQuoteDrawer() {
  const drawer = document.getElementById("quote-drawer");
  if (drawer) {
    drawer.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeQuoteDrawer() {
  const drawer = document.getElementById("quote-drawer");
  if (drawer) {
    drawer.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// 2. Navbar & Mobile Menu
function initNavbar() {
  // Sticky header elevation state on scroll
  const navbar = document.querySelector(".lux-navbar");
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        navbar.classList.add("is-scrolled");
      } else {
        navbar.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  const mobileBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu-drawer");
  const mobileClose = document.getElementById("mobile-menu-close");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  // Quote drawer triggers
  const quoteTriggers = document.querySelectorAll(".quote-drawer-trigger");
  quoteTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openQuoteDrawer();
    });
  });

  const quoteClose = document.getElementById("quote-drawer-close");
  const quoteBackdrop = document.getElementById("quote-drawer-backdrop");
  if (quoteClose) quoteClose.addEventListener("click", closeQuoteDrawer);
  if (quoteBackdrop) quoteBackdrop.addEventListener("click", closeQuoteDrawer);

  // Search Modal triggers
  const searchTriggers = document.querySelectorAll(".search-modal-trigger");
  const searchModal = document.getElementById("search-modal");
  const searchClose = document.getElementById("search-modal-close");
  const searchBackdrop = document.getElementById("search-modal-backdrop");
  const searchInput = document.getElementById("global-search-input");

  searchTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (searchModal) {
        searchModal.classList.add("active");
        if (searchInput) setTimeout(() => searchInput.focus(), 100);
      }
    });
  });

  if (searchClose && searchModal) {
    searchClose.addEventListener("click", () => searchModal.classList.remove("active"));
  }
  if (searchBackdrop && searchModal) {
    searchBackdrop.addEventListener("click", () => searchModal.classList.remove("active"));
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => handleGlobalSearch(e.target.value));
  }
}

function handleGlobalSearch(query) {
  const resultsContainer = document.getElementById("global-search-results");
  if (!resultsContainer) return;

  const q = (query || "").trim().toLowerCase();
  if (q.length < 2) {
    resultsContainer.innerHTML = `
      <div class="text-center py-8 text-stone-400">
        <i class="fa-solid fa-magnifying-glass text-2xl mb-2 text-stone-300 dark:text-stone-600"></i>
        <p class="text-sm">Type fixture name, room (e.g. "foyer", "dining"), or style...</p>
      </div>
    `;
    return;
  }

  const matchedProducts = PRODUCTS_DATA.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.categoryLabel.toLowerCase().includes(q) ||
    p.styleLabel.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q)
  );

  const matchedArticles = BLOG_POSTS.filter(b => 
    b.title.toLowerCase().includes(q) ||
    b.categoryName.toLowerCase().includes(q)
  );

  if (matchedProducts.length === 0 && matchedArticles.length === 0) {
    resultsContainer.innerHTML = `
      <div class="text-center py-8 text-stone-500">
        <p class="text-sm">No lighting fixtures or articles found for "<strong>${escapeHtml(q)}</strong>".</p>
        <p class="text-xs text-stone-400 mt-1">Try searching for "chandelier", "brass", "foyer", or "alabaster".</p>
      </div>
    `;
    return;
  }

  let html = "";
  if (matchedProducts.length > 0) {
    html += `<div class="mb-4">
      <h5 class="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">Lighting & Chandeliers (${matchedProducts.length})</h5>
      <div class="space-y-2">`;
    matchedProducts.forEach(prod => {
      html += `
        <div onclick="openQuickView('${prod.id}'); document.getElementById('search-modal').classList.remove('active');" class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer border border-transparent hover:border-stone-200 dark:hover:border-stone-700 transition">
          <img src="${prod.image}" alt="${prod.name}" class="w-12 h-12 object-cover rounded" />
          <div class="flex-1 min-w-0">
            <h6 class="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">${prod.name}</h6>
            <span class="text-xs text-stone-500 dark:text-stone-400">${prod.categoryLabel} • ${prod.styleLabel}</span>
          </div>
          <span class="text-sm font-semibold text-stone-800 dark:text-stone-200">${formatCurrency(prod.price)}</span>
        </div>
      `;
    });
    html += `</div></div>`;
  }

  if (matchedArticles.length > 0) {
    html += `<div>
      <h5 class="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">Lighting Design Articles (${matchedArticles.length})</h5>
      <div class="space-y-2">`;
    matchedArticles.forEach(post => {
      html += `
        <a href="blog.html#${post.id}" onclick="document.getElementById('search-modal').classList.remove('active');" class="block p-2.5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 border border-transparent hover:border-stone-200 dark:hover:border-stone-700 transition">
          <h6 class="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">${post.title}</h6>
          <span class="text-xs text-stone-500 dark:text-stone-400">${post.categoryName} • ${post.readTime}</span>
        </a>
      `;
    });
    html += `</div></div>`;
  }

  resultsContainer.innerHTML = html;
}

// 3. Quick View Modal
function initGlobalModals() {
  const qvModal = document.getElementById("quickview-modal");
  const qvClose = document.getElementById("quickview-modal-close");
  const qvBackdrop = document.getElementById("quickview-modal-backdrop");

  if (qvClose && qvModal) {
    qvClose.addEventListener("click", () => qvModal.classList.remove("active"));
  }
  if (qvBackdrop && qvModal) {
    qvBackdrop.addEventListener("click", () => qvModal.classList.remove("active"));
  }
}

function openQuickView(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById("quickview-modal");
  const body = document.getElementById("quickview-modal-body");
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div class="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 relative group">
        <img src="${prod.image}" alt="${prod.name}" class="w-full h-96 object-cover object-center" />
        <span class="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${prod.badgeType === 'gold' ? 'badge-gold' : 'badge-stone'}">
          ${prod.badge}
        </span>
      </div>
      <div>
        <div class="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-1">
          ${prod.categoryLabel} • ${prod.styleLabel}
        </div>
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-stone-900 dark:text-stone-100 mb-2">${prod.name}</h2>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 italic mb-4">${prod.tagline}</p>
        
        <div class="flex items-center gap-4 pb-4 border-b border-stone-200 dark:border-stone-700 mb-5">
          <span class="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">${formatCurrency(prod.price)}</span>
          <div class="flex items-center text-amber-500 text-xs">
            ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(prod.rating))}
            <span class="ml-2 text-stone-600 dark:text-stone-400 font-sans font-medium">(${prod.reviews} reviews)</span>
          </div>
        </div>

        <p class="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-6">${prod.description}</p>

        <div class="grid grid-cols-2 gap-3 text-xs bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700 mb-6">
          <div><strong class="text-stone-800 dark:text-stone-200">Dimensions:</strong> <br><span class="text-stone-600 dark:text-stone-400">${prod.dimensions}</span></div>
          <div><strong class="text-stone-800 dark:text-stone-200">Weight & Load:</strong> <br><span class="text-stone-600 dark:text-stone-400">${prod.weight}</span></div>
          <div><strong class="text-stone-800 dark:text-stone-200">Finish:</strong> <br><span class="text-stone-600 dark:text-stone-400">${prod.finish}</span></div>
          <div><strong class="text-stone-800 dark:text-stone-200">Illumination:</strong> <br><span class="text-stone-600 dark:text-stone-400">${prod.lumens} (${prod.kelvin})</span></div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <button onclick="addToQuote('${prod.id}'); document.getElementById('quickview-modal').classList.remove('active');" class="flex-1 gold-glow-btn py-3 px-6 rounded-lg text-sm text-center font-medium flex items-center justify-center gap-2">
            <i class="fa-solid fa-file-invoice text-sm"></i> Add to Quotation / Inquiry
          </button>
          <a href="contact.html?fixture=${encodeURIComponent(prod.name)}" class="gold-outline-btn py-3 px-5 rounded-lg text-sm text-center font-medium">
            Book In-Showroom Viewing
          </a>
        </div>
        
        <div class="mt-4 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <i class="fa-solid fa-shield-halved text-amber-600 dark:text-amber-400"></i>
          <span>Includes certified white-glove packaging & 10-year structural warranty</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

// 4. Toast Notification
function initToastContainer() {
  if (!document.getElementById("toast-container")) {
    const c = document.createElement("div");
    c.id = "toast-container";
    document.body.appendChild(c);
  }
}

function showToast(title, message, icon = "fa-circle-check") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "lux-toast";
  toast.innerHTML = `
    <i class="fa-solid ${icon} text-amber-400 text-lg mt-0.5"></i>
    <div class="flex-1">
      <h6 class="text-sm font-semibold text-stone-100">${escapeHtml(title)}</h6>
      <p class="text-xs text-stone-300 mt-0.5 leading-snug">${escapeHtml(message)}</p>
    </div>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// 5. Page Specific Handlers
function initPageSpecifics() {
  if (document.getElementById("products-grid")) {
    initProductsPage();
  }

  if (document.getElementById("chandelier-calculator-form")) {
    initGuideCalculator();
  }
  if (document.getElementById("kelvin-slider")) {
    initKelvinSlider();
  }

  if (document.getElementById("service-estimator-form")) {
    initServiceEstimator();
  }

  if (document.getElementById("blog-grid")) {
    initBlogPage();
  }

  if (document.getElementById("showroom-booking-form")) {
    initShowroomForm();
  }

  initFaqAccordions();
}

// Products Page Implementation
function initProductsPage() {
  const grid = document.getElementById("products-grid");
  const countEl = document.getElementById("product-results-count");
  const roomFilter = document.getElementById("filter-room");
  const styleFilter = document.getElementById("filter-style");
  const sortFilter = document.getElementById("filter-sort");
  const searchInput = document.getElementById("filter-search");
  const resetBtn = document.getElementById("filter-reset-btn");

  function render() {
    const selectedRoom = roomFilter ? roomFilter.value : "all";
    const selectedStyle = styleFilter ? styleFilter.value : "all";
    const selectedSort = sortFilter ? sortFilter.value : "featured";
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    let filtered = PRODUCTS_DATA.filter(p => {
      const matchRoom = selectedRoom === "all" || p.category === selectedRoom;
      const matchStyle = selectedStyle === "all" || p.style === selectedStyle;
      const matchSearch = query === "" || 
        p.name.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      return matchRoom && matchStyle && matchSearch;
    });

    if (selectedSort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (countEl) countEl.textContent = `${filtered.length} Fixtures Found`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
          <i class="fa-solid fa-lightbulb text-4xl text-stone-300 dark:text-stone-600 mb-3"></i>
          <h3 class="font-serif text-xl font-medium text-stone-800 dark:text-stone-200">No Lighting Fixtures Found</h3>
          <p class="text-sm text-stone-500 max-w-md mx-auto mt-1 mb-4">No statement pieces match your exact filter criteria. Try resetting your room or style preferences.</p>
          <button onclick="document.getElementById('filter-reset-btn').click()" class="gold-glow-btn px-5 py-2 text-xs uppercase tracking-wider rounded-lg font-semibold">
            Clear All Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(prod => `
      <div class="lux-card group flex flex-col justify-between">
        <div>
          <div class="lux-card-img-wrap h-64 sm:h-72">
            <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover" loading="lazy" />
            <span class="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${prod.badgeType === 'gold' ? 'badge-gold' : 'badge-stone'}">
              ${prod.badge}
            </span>
            <button onclick="openQuickView('${prod.id}')" class="absolute bottom-3 right-3 bg-white/90 dark:bg-stone-900/90 hover:bg-white dark:hover:bg-stone-900 text-stone-800 dark:text-stone-100 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md transition opacity-0 group-hover:opacity-100 flex items-center gap-1.5">
              <i class="fa-solid fa-eye text-amber-700 dark:text-amber-400"></i> Quick View
            </button>
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5">
              <span>${prod.categoryLabel}</span>
              <span class="text-amber-600 dark:text-amber-400 font-medium">${prod.styleLabel}</span>
            </div>
            <h3 class="font-serif text-lg sm:text-xl font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition line-clamp-1 mb-1">
              ${prod.name}
            </h3>
            <p class="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mb-3">${prod.tagline}</p>
            <div class="text-[11px] text-stone-400 bg-stone-50 dark:bg-stone-800/60 px-2.5 py-1 rounded border border-stone-100 dark:border-stone-800 flex items-center gap-2 mb-4">
              <i class="fa-solid fa-ruler-combined text-amber-600 dark:text-amber-400"></i>
              <span class="truncate">${prod.dimensions}</span>
            </div>
          </div>
        </div>
        <div class="p-5 pt-0 border-t border-stone-100 dark:border-stone-800 mt-auto">
          <div class="flex items-center justify-between py-3">
            <div>
              <span class="text-xs text-stone-400 uppercase tracking-wider block">List Price</span>
              <span class="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">${formatCurrency(prod.price)}</span>
            </div>
            <div class="text-right">
              <span class="text-[11px] text-stone-500 dark:text-stone-400 block">Lead Time</span>
              <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">${prod.leadTime.split('(')[0]}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-1">
            <button onclick="addToQuote('${prod.id}')" class="gold-glow-btn py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-file-lines"></i> Quote
            </button>
            <button onclick="openQuickView('${prod.id}')" class="gold-outline-btn py-2 px-3 rounded-lg text-xs font-semibold text-center">
              Details
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  if (roomFilter) roomFilter.addEventListener("change", render);
  if (styleFilter) styleFilter.addEventListener("change", render);
  if (sortFilter) sortFilter.addEventListener("change", render);
  if (searchInput) searchInput.addEventListener("input", render);

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (roomFilter) roomFilter.value = "all";
      if (styleFilter) styleFilter.value = "all";
      if (sortFilter) sortFilter.value = "featured";
      if (searchInput) searchInput.value = "";
      render();
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get("room");
  const styleParam = urlParams.get("style");
  if (roomParam && roomFilter) roomFilter.value = roomParam;
  if (styleParam && styleFilter) styleFilter.value = styleParam;

  render();
}

// 6. Lighting Guide: Chandelier Sizing Calculator
function initGuideCalculator() {
  const form = document.getElementById("chandelier-calculator-form");
  if (!form) return;

  function calculate() {
    const roomLength = parseFloat(document.getElementById("calc-room-length").value) || 0;
    const roomWidth = parseFloat(document.getElementById("calc-room-width").value) || 0;
    const ceilingHeight = parseFloat(document.getElementById("calc-ceiling-height").value) || 9;
    const application = document.getElementById("calc-application").value;
    const tableWidth = parseFloat(document.getElementById("calc-table-width")?.value || 0);

    let recommendedDiameter = Math.round(roomLength + roomWidth);
    if (recommendedDiameter < 16) recommendedDiameter = 18;

    let diningRecommendation = "";
    if (application === "dining" && tableWidth > 0) {
      const minDia = Math.round(tableWidth * 0.5);
      const maxDia = Math.round(tableWidth * 0.67);
      diningRecommendation = `For your ${tableWidth}" wide table, fixture width should be <strong>${minDia}" to ${maxDia}"</strong>.`;
    }

    const minFixtureHeight = Math.round(ceilingHeight * 2.5);
    const maxFixtureHeight = Math.round(ceilingHeight * 3.0);

    let hangingClearance = "";
    if (application === "dining") {
      const extraHeight = Math.max(0, ceilingHeight - 8);
      const minH = 30 + (extraHeight * 3);
      const maxH = 36 + (extraHeight * 3);
      hangingClearance = `Hang bottom of chandelier <strong>${minH}" – ${maxH}"</strong> above tabletop.`;
    } else {
      hangingClearance = `Maintain at least <strong>7' 0" (84")</strong> minimum clearance between bottom of fixture and floor.`;
    }

    const sqFt = Math.round(roomLength * roomWidth);
    const footcandles = application === "dining" ? 30 : 20;
    const recommendedLumens = sqFt * footcandles;

    const diaResult = document.getElementById("res-diameter");
    const heightResult = document.getElementById("res-fixture-height");
    const hangingResult = document.getElementById("res-hanging-height");
    const lumensResult = document.getElementById("res-lumens");
    const tableNoteResult = document.getElementById("res-table-note");

    if (diaResult) diaResult.textContent = `${recommendedDiameter}" (${Math.round(recommendedDiameter * 2.54)} cm)`;
    if (heightResult) heightResult.textContent = `${minFixtureHeight}" – ${maxFixtureHeight}" tall`;
    if (hangingResult) hangingResult.innerHTML = hangingClearance;
    if (lumensResult) lumensResult.textContent = `${recommendedLumens.toLocaleString()} Lumens (approx. ${Math.round(recommendedLumens / 80)}W modern LED)`;
    if (tableNoteResult) {
      if (diningRecommendation) {
        tableNoteResult.innerHTML = `<i class="fa-solid fa-utensils text-amber-600 mr-1.5"></i> ${diningRecommendation}`;
        tableNoteResult.classList.remove("hidden");
      } else {
        tableNoteResult.classList.add("hidden");
      }
    }
  }

  form.addEventListener("input", calculate);
  form.addEventListener("change", calculate);
  calculate();
}

// 7. Lighting Guide: Kelvin Slider
function initKelvinSlider() {
  const slider = document.getElementById("kelvin-slider");
  const valueDisplay = document.getElementById("kelvin-value-display");
  const nameDisplay = document.getElementById("kelvin-name-display");
  const descDisplay = document.getElementById("kelvin-desc-display");
  const box = document.getElementById("kelvin-preview-box");
  const glow = document.getElementById("kelvin-glow-effect");

  if (!slider) return;

  const kelvinData = [
    {
      k: 2200,
      name: "Candlelight Amber",
      desc: "Deep golden radiance mimicking romantic hearth embers. Ideal for private wine cellars, dining intimate moments, and relaxed evening nightcaps.",
      bg: "#2b1c10",
      lightColor: "rgba(255, 140, 50, 0.45)",
      textColor: "#ffd1a3"
    },
    {
      k: 2700,
      name: "Warm Golden White (The Architectural Favorite)",
      desc: "The quintessential luxury residential temperature. Accentuates warm hardwood, rich brass chandeliers, and velvets. Flattering to skin tones without glare.",
      bg: "#2b2216",
      lightColor: "rgba(255, 185, 105, 0.45)",
      textColor: "#ffe7cc"
    },
    {
      k: 3000,
      name: "Soft Contemporary White",
      desc: "Crisp yet warm. Perfect for high-end chef kitchens, Carrara marble islands, vanity powder rooms, and modern minimalist open floor plans.",
      bg: "#262320",
      lightColor: "rgba(255, 225, 160, 0.40)",
      textColor: "#fff2e0"
    },
    {
      k: 4000,
      name: "Crisp Neutral White",
      desc: "Clean, museum-grade illumination. Preferred in private art galleries, walk-in luxury dressing closets, and task-oriented master home offices.",
      bg: "#1c2024",
      lightColor: "rgba(220, 235, 255, 0.35)",
      textColor: "#e1ecf7"
    },
    {
      k: 5000,
      name: "Daylight White",
      desc: "Cool solar daylight tone. Rarely utilized in decorative chandeliers, but standard for architectural jewelry displays and outdoor perimeter security.",
      bg: "#16202b",
      lightColor: "rgba(180, 220, 255, 0.45)",
      textColor: "#cde4fa"
    }
  ];

  function update() {
    const val = parseInt(slider.value);
    if (valueDisplay) valueDisplay.textContent = `${val}K`;

    let closest = kelvinData[0];
    let minDiff = 99999;
    kelvinData.forEach(item => {
      const diff = Math.abs(item.k - val);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    });

    if (nameDisplay) nameDisplay.textContent = closest.name;
    if (descDisplay) descDisplay.textContent = closest.desc;

    if (box) {
      box.style.backgroundColor = closest.bg;
      box.style.color = closest.textColor;
    }
    if (glow) {
      glow.style.background = `radial-gradient(circle at center, ${closest.lightColor} 0%, rgba(0,0,0,0) 70%)`;
    }
  }

  slider.addEventListener("input", update);
  update();
}

// 8. Services Page: Bespoke Cost Estimator
function initServiceEstimator() {
  const serviceSelect = document.getElementById("est-service-type");
  const roomSelect = document.getElementById("est-room-type");
  const ceilingSelect = document.getElementById("est-ceiling-height");
  const resultBase = document.getElementById("est-result-base");
  const resultRange = document.getElementById("est-result-range");
  const resultTimeline = document.getElementById("est-result-timeline");
  const resultDeliverables = document.getElementById("est-result-deliverables");

  if (!serviceSelect) return;

  function recalculate() {
    const service = serviceSelect.value;
    const ceiling = ceilingSelect ? ceilingSelect.value : "standard";

    let base = 0;
    let range = "";
    let timeline = "";
    let deliverables = [];

    switch (service) {
      case "custom-design":
        base = 3500;
        range = `${formatCurrency(3500)} – ${formatCurrency(15000)}+`;
        timeline = "4 to 6 Weeks";
        deliverables = ["Architectural 3D CAD Blueprint", "Material & Finish Swatches (Venetian Glass & Brass)", "Structural Weight Load Engineering", "Dedicated Master Artisan Project Manager"];
        break;
      case "consultation":
        base = 450;
        range = `${formatCurrency(450)} – ${formatCurrency(1200)} (Credited towards purchase)`;
        timeline = "3 to 5 Business Days";
        deliverables = ["Comprehensive In-Home Lux/Lumen Audit", "Photometric Lighting Layout Plans", "Fixture Sizing & Scale Matrix", "Direct Catalog Trade Discount Access"];
        break;
      case "installation":
        base = 850;
        if (ceiling === "grand") base = 1950;
        else if (ceiling === "high") base = 1250;
        range = `${formatCurrency(base)} – ${formatCurrency(base + 800)}`;
        timeline = "1 to 2 Days On-Site";
        deliverables = ["Master Electrician Heavy-Load Ceiling Reinforcement", "Optional Motorized Winch Lift Installation", "Precision Crystal Assembly & White-Glove Hand Hanging", "Smart Dimmer Calibration & Scene Tuning"];
        break;
      case "restoration":
        base = 1200;
        range = `${formatCurrency(1200)} – ${formatCurrency(4500)}`;
        timeline = "2 to 3 Weeks";
        deliverables = ["Ultrasonic Chemical-Free Crystal Prism Cleaning", "Modern UL-Certified Teflon Rewiring", "Patina Preservation & Gold Leaf Touch-up", "Replacement of Missing Hand-Cut Prisms"];
        break;
      case "smart-lighting":
        base = 950;
        range = `${formatCurrency(950)} – ${formatCurrency(3200)}`;
        timeline = "1 to 3 Days";
        deliverables = ["Lutron HomeWorks / Crestron Integration", "Custom Engraved Backlit Keypads", "Circadian Rhythm Warm-Dimming Programming", "Mobile Tablet & Voice Automation Setup"];
        break;
    }

    if (resultBase) resultBase.textContent = `${formatCurrency(base)} Starting`;
    if (resultRange) resultRange.textContent = range;
    if (resultTimeline) resultTimeline.textContent = timeline;
    if (resultDeliverables) {
      resultDeliverables.innerHTML = deliverables.map(d => `
        <li class="flex items-center gap-2 text-stone-200 text-xs sm:text-sm">
          <i class="fa-solid fa-circle-check text-amber-600 dark:text-amber-400 text-xs"></i>
          <span>${d}</span>
        </li>
      `).join("");
    }
  }

  serviceSelect.addEventListener("change", recalculate);
  if (roomSelect) roomSelect.addEventListener("change", recalculate);
  if (ceilingSelect) ceilingSelect.addEventListener("change", recalculate);
  recalculate();
}

// 9. Blog Page: Grid & Reader Modal
function initBlogPage() {
  const grid = document.getElementById("blog-grid");
  const tabButtons = document.querySelectorAll(".blog-tab-btn");
  const articleModal = document.getElementById("article-reader-modal");
  const articleClose = document.getElementById("article-reader-close");
  const articleBackdrop = document.getElementById("article-reader-backdrop");

  if (!grid) return;

  function render(category = "all") {
    const filtered = BLOG_POSTS.filter(b => category === "all" || b.category === category);
    grid.innerHTML = filtered.map(post => `
      <article class="lux-card group flex flex-col justify-between">
        <div>
          <div class="lux-card-img-wrap h-56 sm:h-64">
            <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover" loading="lazy" />
            <span class="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full badge-stone shadow-sm">
              ${post.categoryName}
            </span>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 text-xs text-stone-400 mb-2">
              <span>${post.date}</span>
              <span>•</span>
              <span>${post.readTime}</span>
            </div>
            <h3 class="font-serif text-xl font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition line-clamp-2 mb-3">
              ${post.title}
            </h3>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed mb-4">
              ${post.excerpt}
            </p>
          </div>
        </div>
        <div class="p-6 pt-0 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between mt-auto">
          <div class="flex items-center gap-2.5 py-3">
            <div class="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xs font-bold">
              ${post.author.charAt(0)}
            </div>
            <div>
              <span class="text-xs font-medium text-stone-800 dark:text-stone-200 block">${post.author}</span>
              <span class="text-[10px] text-stone-400 block">${post.role}</span>
            </div>
          </div>
          <button onclick="openArticleReader('${post.id}')" class="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-900 flex items-center gap-1.5 transition">
            Read Story <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </article>
    `).join("");
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => {
        b.classList.remove("active", "bg-stone-900", "text-white");
        b.classList.add("bg-stone-100", "text-stone-600");
      });
      btn.classList.add("active", "bg-stone-900", "text-white");
      btn.classList.remove("bg-stone-100", "text-stone-600");
      render(btn.dataset.category);
    });
  });

  if (articleClose && articleModal) {
    articleClose.addEventListener("click", () => articleModal.classList.remove("active"));
  }
  if (articleBackdrop && articleModal) {
    articleBackdrop.addEventListener("click", () => articleModal.classList.remove("active"));
  }

  const hash = window.location.hash.replace("#", "");
  if (hash && BLOG_POSTS.some(p => p.id === hash)) {
    setTimeout(() => openArticleReader(hash), 150);
  }

  render();
}

function openArticleReader(postId) {
  const post = BLOG_POSTS.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById("article-reader-modal");
  const content = document.getElementById("article-reader-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative h-72 sm:h-96 w-full overflow-hidden rounded-t-xl">
      <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
      <div class="absolute bottom-6 left-6 right-6 text-white">
        <span class="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
          ${post.categoryName}
        </span>
        <h1 class="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight mb-2">
          ${post.title}
        </h1>
        <div class="flex items-center gap-3 text-xs text-stone-300">
          <span>By ${post.author} (${post.role})</span>
          <span>•</span>
          <span>${post.date}</span>
          <span>•</span>
          <span>${post.readTime}</span>
        </div>
      </div>
    </div>
    <div class="p-6 sm:p-10 max-w-3xl mx-auto">
      ${post.content}
      <div class="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-stone-900 dark:bg-stone-800 text-amber-400 flex items-center justify-center font-serif text-lg font-bold">
            ${post.author.charAt(0)}
          </div>
          <div>
            <h5 class="text-sm font-semibold text-stone-900 dark:text-stone-100">${post.author}</h5>
            <p class="text-xs text-stone-500 dark:text-stone-400">${post.role} at Lumière & Co. Atelier</p>
          </div>
        </div>
        <a href="contact.html" class="gold-glow-btn text-xs font-semibold py-2.5 px-5 rounded-lg">
          Discuss With A Specialist
        </a>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

// 10. Contact Page Showroom Booking Form
function initShowroomForm() {
  const form = document.getElementById("showroom-booking-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const fixtureName = params.get("fixture");
  if (fixtureName) {
    const notesEl = document.getElementById("show-notes");
    if (notesEl) {
      notesEl.value = `I am specifically interested in viewing and discussing: "${fixtureName}".`;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("show-name").value;
    const email = document.getElementById("show-email").value;
    const date = document.getElementById("show-date").value;
    const time = document.getElementById("show-time").value;
    const showroom = document.getElementById("show-location").value;

    const modal = document.getElementById("booking-confirmation-modal");
    const summary = document.getElementById("booking-summary-text");

    if (summary) {
      summary.innerHTML = `
        Thank you, <strong>${escapeHtml(name)}</strong>. We have reserved your private appointment at our <strong>${escapeHtml(showroom)}</strong> gallery for <strong>${escapeHtml(date)}</strong> at <strong>${escapeHtml(time)}</strong>.<br><br>
        A concierge confirmation with dedicated valet instructions and our 2026 Lookbook has been dispatched to <strong>${escapeHtml(email)}</strong>.
      `;
    }

    if (modal) {
      modal.classList.add("active");
    }

    showToast("Showroom Appointment Reserved", "A concierge specialist will contact you shortly.", "fa-calendar-check");
    form.reset();
  });

  const confirmClose = document.getElementById("booking-confirmation-close");
  if (confirmClose) {
    confirmClose.addEventListener("click", () => {
      document.getElementById("booking-confirmation-modal")?.classList.remove("active");
    });
  }
}

// 11. FAQ Accordions
function initFaqAccordions() {
  const accordions = document.querySelectorAll(".faq-header");
  accordions.forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".faq-item");
      const body = parent.querySelector(".faq-body");
      const isOpen = parent.classList.contains("active");

      const siblingGroup = parent.parentElement.querySelectorAll(".faq-item");
      siblingGroup.forEach(item => {
        item.classList.remove("active");
        const b = item.querySelector(".faq-body");
        if (b) b.style.maxHeight = null;
      });

      if (!isOpen) {
        parent.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
