/**
 * মেধাকোষ (MedhaKosh) - Interactive Application Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentCategory = "সব ক্যাটাগরি";
  let searchQuery = "";
  let currentView = "all"; // 'all', 'blogs', 'files'

  // DOM Elements
  const blogsGrid = document.getElementById("blogs-grid");
  const filesGrid = document.getElementById("files-grid");
  const categoryPillsContainer = document.getElementById("category-pills");
  const viewTabs = document.querySelectorAll(".view-tab-btn");
  const blogsSection = document.getElementById("blogs-section");
  const downloadsSection = document.getElementById("downloads-section");
  
  const heroSearchInput = document.getElementById("hero-search-input");
  const heroSearchBtn = document.getElementById("hero-search-btn");
  const searchModalBtn = document.getElementById("search-modal-btn");
  
  const filterStatusBanner = document.getElementById("filter-status-banner");
  const filterStatusText = document.getElementById("filter-status-text");
  const resetFilterBtn = document.getElementById("reset-filter-btn");

  const totalArticlesStat = document.getElementById("total-articles-stat");
  const totalFilesStat = document.getElementById("total-files-stat");
  const blogsCountBadge = document.getElementById("blogs-count-badge");
  const filesCountBadge = document.getElementById("files-count-badge");

  const noBlogsMsg = document.getElementById("no-blogs-msg");
  const noFilesMsg = document.getElementById("no-files-msg");

  // Modals
  const articleModal = document.getElementById("article-modal");
  const modalArticleContent = document.getElementById("modal-article-content");
  const closeArticleModalBtn = document.getElementById("close-article-modal");

  const requestModal = document.getElementById("request-modal");
  const openRequestModalBtn = document.getElementById("open-request-modal-btn");
  const closeRequestModalBtn = document.getElementById("close-request-modal");
  const fileRequestForm = document.getElementById("file-request-form");

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Load data (preferring custom posts saved via Admin Dashboard if available)
  let currentBlogData = [...BLOG_DATA];
  let currentCategories = [...CATEGORIES];
  const savedAdminData = localStorage.getItem("medhakosh_custom_posts");
  if (savedAdminData) {
    try {
      currentBlogData = JSON.parse(savedAdminData);
      const uniqueCats = new Set(["সব ক্যাটাগরি", ...currentBlogData.map(p => p.category)]);
      currentCategories = Array.from(uniqueCats);
    } catch(e) {
      currentBlogData = [...BLOG_DATA];
      currentCategories = [...CATEGORIES];
    }
  }

  // Initialize Stats
  function updateStats() {
    if (totalArticlesStat) totalArticlesStat.textContent = currentBlogData.length;
    const totalFiles = currentBlogData.filter(post => post.downloadFile).length;
    if (totalFilesStat) totalFilesStat.textContent = totalFiles;
  }

  // Theme initialization
  function initTheme() {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      themeIcon.setAttribute("data-lucide", "sun");
    } else {
      document.documentElement.classList.remove("dark");
      themeIcon.setAttribute("data-lucide", "moon");
    }
  }

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
    lucide.createIcons();
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // File type styling helper
  function getFileIconAndBadge(type) {
    switch(type.toLowerCase()) {
      case 'pdf':
        return { icon: 'file-text', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900', label: 'PDF ডকুমেন্ট' };
      case 'zip':
      case 'rar':
        return { icon: 'archive', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900', label: 'ZIP ফাইল' };
      case 'doc':
      case 'docx':
        return { icon: 'file-spreadsheet', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900', label: 'Word ফাইল' };
      case 'excel':
      case 'xlsx':
        return { icon: 'table', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900', label: 'Excel ফাইল' };
      default:
        return { icon: 'file', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-900', label: 'ফাইল' };
    }
  }

  // Render Categories
  function renderCategories() {
    categoryPillsContainer.innerHTML = "";
    currentCategories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `category-pill px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-brand-500 ${
        currentCategory === cat ? "active" : ""
      }`;
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        currentCategory = cat;
        renderCategories();
        applyFilters();
      });
      categoryPillsContainer.appendChild(btn);
    });
  }

  // Filter Data
  function getFilteredData() {
    return currentBlogData.filter(item => {
      const matchesCategory = currentCategory === "সব ক্যাটাগরি" || item.category === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.summary.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q) ||
        (item.downloadFile && item.downloadFile.name.toLowerCase().includes(q));
      
      return matchesCategory && matchesSearch;
    });
  }

  // Render Blog Cards
  function renderBlogs(data) {
    blogsGrid.innerHTML = "";
    blogsCountBadge.textContent = `${data.length}টি পোস্ট পাওয়া গেছে`;

    if (data.length === 0) {
      noBlogsMsg.classList.remove("hidden");
    } else {
      noBlogsMsg.classList.add("hidden");
    }

    data.forEach(post => {
      const file = post.downloadFile;
      const fileBadge = file ? getFileIconAndBadge(file.type) : null;

      const card = document.createElement("article");
      card.className = "blog-card flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl transition-all group";
      
      card.innerHTML = `
        <div class="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img 
            src="${post.coverImage}" 
            alt="${post.title}" 
            loading="lazy" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          >
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-brand-600 dark:text-brand-300 shadow-sm">
              ${post.category}
            </span>
          </div>
          ${file ? `
            <div class="absolute top-3 right-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-600 text-white shadow-sm">
                <i data-lucide="download" class="w-3 h-3"></i>
                ফাইল সংযুক্ত
              </span>
            </div>
          ` : ''}
        </div>

        <div class="p-6 flex flex-col flex-grow">
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
            <span class="flex items-center gap-1">
              <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
              ${post.date}
            </span>
            <span>•</span>
            <span class="flex items-center gap-1">
              <i data-lucide="clock" class="w-3.5 h-3.5"></i>
              ${post.readTime}
            </span>
          </div>

          <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-2.5">
            ${post.title}
          </h3>

          <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-5 flex-grow leading-relaxed">
            ${post.summary}
          </p>

          ${file ? `
            <div class="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5 overflow-hidden">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${fileBadge.color}">
                  <i data-lucide="${fileBadge.icon}" class="w-4 h-4"></i>
                </div>
                <div class="overflow-hidden">
                  <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">${file.name}</p>
                  <p class="text-[11px] text-slate-400">${file.size}</p>
                </div>
              </div>
              <button 
                onclick="triggerDownload('${file.name}', '${file.url}')" 
                class="shrink-0 p-2 text-brand-600 hover:text-white hover:bg-brand-600 rounded-xl transition-all"
                title="সরাসরি ডাউনলোড"
              >
                <i data-lucide="download" class="w-4 h-4"></i>
              </button>
            </div>
          ` : ''}

          <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <button 
              onclick="openArticleModal(${post.id})" 
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 transition-colors"
            >
              <span>বিস্তারিত পড়ুন</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
            
            ${file ? `
              <span class="text-xs text-slate-400 flex items-center gap-1">
                <i data-lucide="arrow-down-to-line" class="w-3.5 h-3.5"></i>
                ${file.downloads} বার ডাউনলোড
              </span>
            ` : ''}
          </div>
        </div>
      `;

      blogsGrid.appendChild(card);
    });
  }

  // Render Standalone Download Cards
  function renderFiles(data) {
    filesGrid.innerHTML = "";
    const filesWithPost = data.filter(item => item.downloadFile);
    filesCountBadge.textContent = `${filesWithPost.length}টি ফাইল প্রস্তুত`;

    if (filesWithPost.length === 0) {
      noFilesMsg.classList.remove("hidden");
    } else {
      noFilesMsg.classList.add("hidden");
    }

    filesWithPost.forEach(item => {
      const file = item.downloadFile;
      const fileBadge = getFileIconAndBadge(file.type);

      const card = document.createElement("div");
      card.className = "file-card p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all";
      
      card.innerHTML = `
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${fileBadge.color}">
              <i data-lucide="${fileBadge.icon}" class="w-5 h-5"></i>
            </div>
            <span class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              ${fileBadge.label}
            </span>
          </div>

          <h4 class="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug hover:text-brand-600 cursor-pointer" onclick="openArticleModal(${item.id})">
            ${file.name}
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-4">
            সংযুক্ত পোস্ট: ${item.title}
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span>সাইজ: <strong class="text-slate-700 dark:text-slate-300">${file.size}</strong></span>
            <span>ডাউনলোড: <strong class="text-slate-700 dark:text-slate-300">${file.downloads}</strong></span>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="triggerDownload('${file.name}', '${file.url}')" 
              class="w-full flex items-center justify-center gap-2 py-2 px-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-brand-600/30"
            >
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>ফাইল ডাউনলোড করুন</span>
            </button>
            <button 
              onclick="openArticleModal(${item.id})"
              class="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs transition-colors shrink-0"
              title="পোস্ট পড়ুন"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;

      filesGrid.appendChild(card);
    });
  }

  // Apply filters and views
  function applyFilters() {
    const filtered = getFilteredData();

    // Toggle sections based on currentView
    if (currentView === "all") {
      blogsSection.classList.remove("hidden");
      downloadsSection.classList.remove("hidden");
    } else if (currentView === "blogs") {
      blogsSection.classList.remove("hidden");
      downloadsSection.classList.add("hidden");
    } else if (currentView === "files") {
      blogsSection.classList.add("hidden");
      downloadsSection.classList.remove("hidden");
    }

    renderBlogs(filtered);
    renderFiles(filtered);

    // Filter banner
    if (searchQuery || currentCategory !== "সব ক্যাটাগরি") {
      filterStatusBanner.classList.remove("hidden");
      const terms = [];
      if (searchQuery) terms.push(`সার্চ: "${searchQuery}"`);
      if (currentCategory !== "সব ক্যাটাগরি") terms.push(`ক্যাটাগরি: "${currentCategory}"`);
      filterStatusText.textContent = `ফিল্টার সক্রিয় (${terms.join(" • ")})`;
    } else {
      filterStatusBanner.classList.add("hidden");
    }

    lucide.createIcons();
  }

  // View tabs click handling
  viewTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      viewTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentView = tab.getAttribute("data-view");
      applyFilters();
    });
  });

  // Search input events
  heroSearchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    applyFilters();
  });

  heroSearchBtn.addEventListener("click", () => {
    searchQuery = heroSearchInput.value;
    applyFilters();
    blogsSection.scrollIntoView({ behavior: 'smooth' });
  });

  searchModalBtn.addEventListener("click", () => {
    heroSearchInput.focus();
    heroSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  resetFilterBtn.addEventListener("click", () => {
    searchQuery = "";
    currentCategory = "সব ক্যাটাগরি";
    heroSearchInput.value = "";
    renderCategories();
    applyFilters();
  });

  // Global functions attached to window for HTML onclick handlers
  window.openArticleModal = function(id) {
    const post = currentBlogData.find(p => p.id === id);
    if (!post) return;

    const file = post.downloadFile;
    const fileBadge = file ? getFileIconAndBadge(file.type) : null;

    modalArticleContent.innerHTML = `
      <div class="mb-4">
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300">
          ${post.category}
        </span>
      </div>

      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 leading-snug">
        ${post.title}
      </h1>

      <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-6 font-medium">
        <span class="flex items-center gap-1.5">
          <i data-lucide="calendar" class="w-4 h-4"></i>
          ${post.date}
        </span>
        <span class="flex items-center gap-1.5">
          <i data-lucide="clock" class="w-4 h-4"></i>
          ${post.readTime}
        </span>
      </div>

      <div class="rounded-2xl overflow-hidden mb-6 max-h-80 w-full bg-slate-100 dark:bg-slate-800">
        <img src="${post.coverImage}" alt="${post.title}" class="w-full h-full object-cover">
      </div>

      <!-- Attached Download Card inside modal -->
      ${file ? `
        <div class="mb-8 p-5 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-brand-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${fileBadge.color}">
              <i data-lucide="${fileBadge.icon}" class="w-6 h-6"></i>
            </div>
            <div>
              <p class="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider">ডাউনলোড ফাইল</p>
              <h4 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">${file.name}</h4>
              <p class="text-xs text-slate-500">${file.size} • ${file.downloads} বার ডাউনলোড হয়েছে</p>
            </div>
          </div>
          <button 
            onclick="triggerDownload('${file.name}', '${file.url}')" 
            class="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
          >
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>ফাইল সংগ্রহ করুন</span>
          </button>
        </div>
      ` : ''}

      <div class="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
        ${post.content}
      </div>

      <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button onclick="closeArticleModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold">
          বন্ধ করুন
        </button>
        <button onclick="copyCurrentLink()" class="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
          <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
          <span>শেয়ার লিংক কপি</span>
        </button>
      </div>
    `;

    articleModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    lucide.createIcons();
  };

  window.closeArticleModal = function() {
    articleModal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  closeArticleModalBtn.addEventListener("click", window.closeArticleModal);
  articleModal.addEventListener("click", (e) => {
    if (e.target === articleModal) window.closeArticleModal();
  });

  // Request Modal handling
  openRequestModalBtn.addEventListener("click", () => {
    requestModal.classList.remove("hidden");
  });
  closeRequestModalBtn.addEventListener("click", () => {
    requestModal.classList.add("hidden");
  });
  requestModal.addEventListener("click", (e) => {
    if (e.target === requestModal) requestModal.classList.add("hidden");
  });

  fileRequestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    requestModal.classList.add("hidden");
    fileRequestForm.reset();
    showToast("ধন্যবাদ! আপনার অনুরোধটি গৃহীত হয়েছে। আমরা শীঘ্রই ফাইলটি যুক্ত করব।");
  });

  // Trigger Download helper
  window.triggerDownload = function(fileName, url) {
    if (url && url !== "#") {
      // Real download link
      window.open(url, "_blank");
      showToast(`"${fileName}" ডাউনলোড শুরু হয়েছে...`);
    } else {
      // Mock download creation for testing!
      const dummyContent = `মেধাকোষ (MedhaKosh) টেস্ট ডাউনলোড\nফাইলের নাম: ${fileName}\nতারিখ: ${new Date().toLocaleDateString('bn-BD')}\n\nআপনার ফ্রি ওয়েবসাইট তৈরি সম্পন্ন হয়েছে! data.js ফাইলে গিয়ে এই লিংকে আপনার আসল Google Drive বা ক্লাউড ফাইলের লিংক বসিয়ে দিলেই আসল ফাইল ডাউনলোড হবে।`;
      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = URL.createObjectURL(blob);
      downloadAnchor.download = fileName.endsWith('.txt') ? fileName : `${fileName}.txt`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);

      showToast(`নমুনা হিসেবে "${fileName}" ডাউনলোড হলো!`);
    }
  };

  // Toast notification
  window.showToast = function(msg) {
    const toast = document.createElement("div");
    toast.className = "toast-notice fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-medium border border-slate-700 dark:border-slate-200";
    toast.innerHTML = `
      <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 dark:text-emerald-600"></i>
      <span>${msg}</span>
    `;
    document.body.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 3000);
  };

  window.copyCurrentLink = function() {
    navigator.clipboard.writeText(window.location.href);
    showToast("লিংক সফলভাবে কপি হয়েছে!");
  };

  // ESC key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.closeArticleModal();
      requestModal.classList.add("hidden");
    }
  });

  // Initial Run
  initTheme();
  updateStats();
  renderCategories();
  applyFilters();
});
