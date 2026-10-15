/**
 * মেধাকোষ (MedhaKosh) - Interactive Application Logic
 * সকল আধুনিক ফিচার সমৃদ্ধ (Reading Progress, Bookmarks, Social Share, Format Filter, Related Posts, Comments)
 */

document.addEventListener("DOMContentLoaded", () => {
  // ================= STATE =================
  let currentCategory = "সব ক্যাটাগরি";
  let searchQuery = "";
  let currentView = "all"; // 'all', 'blogs', 'files', 'bookmarks'
  let currentFileFormat = "all"; // 'all', 'pdf', 'excel', 'zip', 'doc'

  // Bookmarks State from LocalStorage
  let bookmarks = [];
  try {
    bookmarks = JSON.parse(localStorage.getItem("medhakosh_bookmarks") || "[]");
  } catch (e) {
    bookmarks = [];
  }

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

  // ================= DOM ELEMENTS =================
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
  const bookmarkCountBadge = document.getElementById("bookmark-count-badge");

  const noBlogsMsg = document.getElementById("no-blogs-msg");
  const noFilesMsg = document.getElementById("no-files-msg");

  const formatFilterPills = document.querySelectorAll("#format-filter-pills .format-pill");

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

  // ================= 1. READING PROGRESS BAR =================
  window.addEventListener("scroll", () => {
    const progressBar = document.getElementById("reading-progress");
    if (!progressBar) return;
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = Math.min(scrolled, 100) + "%";
  });

  // ================= 2. STATS & BOOKMARKS COUNT =================
  function updateStats() {
    if (totalArticlesStat) totalArticlesStat.textContent = currentBlogData.length;
    const totalFiles = currentBlogData.filter(post => post.downloadFile).length;
    if (totalFilesStat) totalFilesStat.textContent = totalFiles;
    updateBookmarkBadge();
  }

  function updateBookmarkBadge() {
    if (bookmarkCountBadge) {
      bookmarkCountBadge.textContent = bookmarks.length;
    }
  }

  // ================= 3. THEME TOGGLE =================
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
    const t = (type || 'file').toLowerCase();
    switch(t) {
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

  // ================= 4. BOOKMARK LOGIC =================
  window.toggleBookmark = function(id, event) {
    if (event) event.stopPropagation();
    const idx = bookmarks.indexOf(id);
    if (idx === -1) {
      bookmarks.push(id);
      showToast("পোস্টটি সংরক্ষণে রাখা হয়েছে! ❤️");
    } else {
      bookmarks.splice(idx, 1);
      showToast("পোস্টটি সংরক্ষণ থেকে সরানো হয়েছে।");
    }
    localStorage.setItem("medhakosh_bookmarks", JSON.stringify(bookmarks));
    updateBookmarkBadge();
    applyFilters();
  };

  // ================= 5. RENDER CATEGORIES =================
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

  // ================= 6. FILTER DATA =================
  function getFilteredData() {
    return currentBlogData.filter(item => {
      // Category filter
      const matchesCategory = currentCategory === "সব ক্যাটাগরি" || item.category === currentCategory;
      
      // Bookmark view filter
      if (currentView === "bookmarks" && !bookmarks.includes(item.id)) {
        return false;
      }

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.summary.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q) ||
        (item.downloadFile && item.downloadFile.name.toLowerCase().includes(q));
      
      return matchesCategory && matchesSearch;
    });
  }

  // ================= 7. RENDER BLOG CARDS =================
  function renderBlogs(data) {
    blogsGrid.innerHTML = "";
    const label = currentView === "bookmarks" ? "সংরক্ষিত পোস্ট" : "টি পোস্ট পাওয়া গেছে";
    blogsCountBadge.textContent = `${data.length} ${label}`;

    if (data.length === 0) {
      noBlogsMsg.classList.remove("hidden");
      if (currentView === "bookmarks") {
        noBlogsMsg.querySelector("p").textContent = "আপনার কোনো পোস্ট সংরক্ষিত নেই। পোস্টে থাকা বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।";
      } else {
        noBlogsMsg.querySelector("p").textContent = "কোনো ব্লগ পোস্ট পাওয়া যায়নি";
      }
    } else {
      noBlogsMsg.classList.add("hidden");
    }

    data.forEach(post => {
      const file = post.downloadFile;
      const fileBadge = file ? getFileIconAndBadge(file.type) : null;
      const isBookmarked = bookmarks.includes(post.id);

      const card = document.createElement("article");
      card.className = "blog-card flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl transition-all group relative";
      
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

          <div class="absolute top-3 right-3 flex items-center gap-1.5">
            <!-- Bookmark Button -->
            <button 
              onclick="toggleBookmark(${post.id}, event)" 
              class="p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
                isBookmarked ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500'
              }" 
              title="${isBookmarked ? 'সংরক্ষণ বাতিল' : 'সংরক্ষণ করুন'}"
            >
              <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4"></i>
            </button>

            ${file ? `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-600 text-white shadow-sm">
                <i data-lucide="download" class="w-3 h-3"></i>
                ফাইল
              </span>
            ` : ''}
          </div>
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

          <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-2.5 cursor-pointer" onclick="openArticleModal(${post.id})">
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

  // ================= 8. RENDER DOWNLOAD CARDS WITH FORMAT FILTER =================
  function renderFiles(data) {
    filesGrid.innerHTML = "";
    
    // Filter files by file type if selected
    let filesWithPost = data.filter(item => item.downloadFile);
    if (currentFileFormat !== "all") {
      filesWithPost = filesWithPost.filter(item => {
        const t = (item.downloadFile.type || "").toLowerCase();
        if (currentFileFormat === "excel") return t === "excel" || t === "xlsx";
        if (currentFileFormat === "doc") return t === "doc" || t === "docx";
        return t === currentFileFormat;
      });
    }

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

  // Format filter pills event handling
  if (formatFilterPills) {
    formatFilterPills.forEach(pill => {
      pill.addEventListener("click", () => {
        formatFilterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        currentFileFormat = pill.getAttribute("data-format");
        renderFiles(getFilteredData());
        lucide.createIcons();
      });
    });
  }

  // ================= 9. APPLY FILTERS & VIEWS =================
  function applyFilters() {
    const filtered = getFilteredData();

    // Toggle sections based on currentView
    if (currentView === "all") {
      blogsSection.classList.remove("hidden");
      downloadsSection.classList.remove("hidden");
    } else if (currentView === "blogs" || currentView === "bookmarks") {
      blogsSection.classList.remove("hidden");
      downloadsSection.classList.add("hidden");
    } else if (currentView === "files") {
      blogsSection.classList.add("hidden");
      downloadsSection.classList.remove("hidden");
    }

    renderBlogs(filtered);
    renderFiles(filtered);

    // Filter banner
    if (searchQuery || currentCategory !== "সব ক্যাটাগরি" || currentView === "bookmarks") {
      filterStatusBanner.classList.remove("hidden");
      const terms = [];
      if (searchQuery) terms.push(`সার্চ: "${searchQuery}"`);
      if (currentCategory !== "সব ক্যাটাগরি") terms.push(`ক্যাটাগরি: "${currentCategory}"`);
      if (currentView === "bookmarks") terms.push(`শুধুমাত্র সংরক্ষিত তালিকা`);
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
    currentView = "all";
    viewTabs.forEach(t => t.classList.remove("active"));
    document.querySelector('.view-tab-btn[data-view="all"]').classList.add("active");
    heroSearchInput.value = "";
    renderCategories();
    applyFilters();
  });

  // ================= 10. SOCIAL SHARE HANDLER =================
  window.sharePost = function(platform, title, id) {
    const shareUrl = window.location.href.split('#')[0] + `#post-${id}`;
    let targetUrl = "";

    switch(platform) {
      case 'whatsapp':
        targetUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + "\n\nফ্রি পড়ুন ও ডাউনলোড করুন মেধাকোষ থেকে: " + shareUrl)}`;
        break;
      case 'facebook':
        targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'telegram':
        targetUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        showToast("লিংক সফলভাবে কপি হয়েছে!");
        return;
    }

    if (targetUrl) {
      window.open(targetUrl, "_blank", "width=600,height=450");
    }
  };

  // ================= 11. ARTICLE MODAL (WITH RELATED POSTS & COMMENTS) =================
  window.openArticleModal = function(id) {
    const post = currentBlogData.find(p => p.id === id);
    if (!post) return;

    const file = post.downloadFile;
    const fileBadge = file ? getFileIconAndBadge(file.type) : null;
    const isBookmarked = bookmarks.includes(post.id);

    // Related posts: up to 3 from same category, or fallback to others
    const relatedPosts = currentBlogData
      .filter(p => p.id !== post.id && (p.category === post.category || true))
      .slice(0, 3);

    // Load comments from LocalStorage
    const commentKey = `medhakosh_comments_${post.id}`;
    let comments = [];
    try {
      comments = JSON.parse(localStorage.getItem(commentKey) || "[]");
    } catch(e) {
      comments = [];
    }

    modalArticleContent.innerHTML = `
      <div class="flex items-center justify-between mb-4 pr-10">
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300">
          ${post.category}
        </span>
        <button 
          onclick="toggleBookmark(${post.id}, event)" 
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isBookmarked ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }"
        >
          <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 text-rose-500"></i>
          <span>${isBookmarked ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}</span>
        </button>
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

      <!-- Social Share Bar (1-Click) -->
      <div class="mb-6 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <span class="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
          <i data-lucide="share-2" class="w-4 h-4 text-brand-600"></i>
          <span>বন্ধুদের সাথে শেয়ার করুন:</span>
        </span>
        <div class="flex items-center gap-2">
          <button onclick="sharePost('whatsapp', '${post.title}', ${post.id})" class="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm" title="WhatsApp-এ শেয়ার">
            <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
            <span>WhatsApp</span>
          </button>
          <button onclick="sharePost('facebook', '${post.title}', ${post.id})" class="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm" title="Facebook-এ শেয়ার">
            <i data-lucide="facebook" class="w-3.5 h-3.5"></i>
            <span>Facebook</span>
          </button>
          <button onclick="sharePost('telegram', '${post.title}', ${post.id})" class="px-2.5 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm" title="Telegram-এ শেয়ার">
            <i data-lucide="send" class="w-3.5 h-3.5"></i>
            <span>Telegram</span>
          </button>
          <button onclick="sharePost('copy', '${post.title}', ${post.id})" class="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1" title="লিংক কপি">
            <i data-lucide="link" class="w-3.5 h-3.5"></i>
            <span>কপি</span>
          </button>
        </div>
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

      <!-- Main Content -->
      <div class="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
        ${post.content}
      </div>

      <!-- Related Posts Section -->
      ${relatedPosts.length > 0 ? `
        <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-2 h-5 bg-brand-600 rounded-full"></div>
            <h3 class="text-lg font-bold">সম্পর্কিত অন্যান্য পোস্টসমূহ</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${relatedPosts.map(rp => `
              <div onclick="openArticleModal(${rp.id})" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer group">
                <div class="h-24 rounded-xl overflow-hidden mb-2 bg-slate-200">
                  <img src="${rp.coverImage}" alt="${rp.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <h4 class="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-brand-600 transition-colors">${rp.title}</h4>
                <p class="text-[11px] text-slate-400 mt-1">${rp.readTime}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Comments & Reader Feedback Section -->
      <div class="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-2 mb-4">
          <i data-lucide="messages-square" class="w-5 h-5 text-indigo-600"></i>
          <h3 class="text-lg font-bold">মন্তব্য ও আলোচনা (${comments.length})</h3>
        </div>

        <!-- Comment Input Form -->
        <form id="comment-form-${post.id}" onsubmit="submitComment(${post.id}, event)" class="mb-6 space-y-3">
          <input type="text" id="commenter-name-${post.id}" required placeholder="আপনার নাম লিখুন..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500">
          <textarea id="commenter-text-${post.id}" required rows="2" placeholder="এই আর্টিকেল বা ফাইল সম্পর্কে আপনার মতামত বা প্রশ্ন লিখুন..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
          <button type="submit" class="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all">
            মন্তব্য পোস্ট করুন
          </button>
        </form>

        <!-- Comments List -->
        <div class="space-y-3" id="comments-list-${post.id}">
          ${comments.length === 0 ? `
            <p class="text-xs text-slate-400 italic">এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনিই করুন!</p>
          ` : comments.map(c => `
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
              <div class="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 mb-1">
                <span>${c.name}</span>
                <span class="text-[10px] text-slate-400 font-normal">${c.date}</span>
              </div>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">${c.text}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Modal Bottom Actions -->
      <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button onclick="closeArticleModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold">
          বন্ধ করুন
        </button>
        <button onclick="sharePost('whatsapp', '${post.title}', ${post.id})" class="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700">
          <i data-lucide="message-circle" class="w-4 h-4"></i>
          <span>WhatsApp-এ শেয়ার</span>
        </button>
      </div>
    `;

    articleModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    lucide.createIcons();
  };

  // Submit reader comment helper
  window.submitComment = function(postId, event) {
    event.preventDefault();
    const nameInput = document.getElementById(`commenter-name-${postId}`);
    const textInput = document.getElementById(`commenter-text-${postId}`);
    if (!nameInput || !textInput) return;

    const newComment = {
      name: nameInput.value.trim(),
      text: textInput.value.trim(),
      date: new Date().toLocaleDateString('bn-BD')
    };

    const commentKey = `medhakosh_comments_${postId}`;
    let comments = [];
    try {
      comments = JSON.parse(localStorage.getItem(commentKey) || "[]");
    } catch(e) {
      comments = [];
    }

    comments.unshift(newComment);
    localStorage.setItem(commentKey, JSON.stringify(comments));
    showToast("আপনার মন্তব্য সফলভাবে প্রকাশ হয়েছে!");
    openArticleModal(postId); // Re-render modal with new comment
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
    const userInput = document.getElementById("request-user");
    const topicInput = document.getElementById("request-topic");
    const notesInput = document.getElementById("request-notes");

    const newRequest = {
      id: Date.now(),
      user: userInput ? userInput.value.trim() : "Anonymous",
      topic: topicInput ? topicInput.value.trim() : "নতুন ফাইল",
      notes: notesInput ? notesInput.value.trim() : "",
      date: new Date().toLocaleDateString('bn-BD'),
      status: "pending"
    };

    try {
      const requests = JSON.parse(localStorage.getItem("medhakosh_file_requests") || "[]");
      requests.unshift(newRequest);
      localStorage.setItem("medhakosh_file_requests", JSON.stringify(requests));
    } catch(err) {
      console.error(err);
    }

    requestModal.classList.add("hidden");
    fileRequestForm.reset();
    showToast("ধন্যবাদ! আপনার অনুরোধটি গৃহীত হয়েছে। অ্যাডমিন টিম শীঘ্রই এটি পর্যালোচনা করবে।");
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
      if (toast && typeof toast.remove === 'function') toast.remove();
      else if (toast && toast.parentElement) toast.parentElement.removeChild(toast);
    }, 3000);
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
