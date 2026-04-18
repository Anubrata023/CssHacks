/* ============================================
   FAXX - Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initLoader();
  initSidePanel();
  initScrollReveal();
  initNavbarScroll();
  initSessionUI();
});

/* ---------- Theme Toggle ---------- */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('faxx_theme');

  // Apply saved theme immediately (before paint)
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (toggle) toggle.classList.remove('dark');
  } else {
    document.body.classList.remove('light-mode');
    if (toggle) toggle.classList.add('dark');
  }

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isCurrentlyDark = toggle.classList.contains('dark');

    if (isCurrentlyDark) {
      // Switch to Light Mode
      document.body.classList.add('light-mode');
      toggle.classList.remove('dark');
      localStorage.setItem('faxx_theme', 'light');
    } else {
      // Switch to Dark Mode
      document.body.classList.remove('light-mode');
      toggle.classList.add('dark');
      localStorage.setItem('faxx_theme', 'dark');
    }
  });
}

/* ---------- Loader ---------- */
function initLoader() {
  const loader = document.querySelector('.loader-overlay');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('loaded');
    setTimeout(() => { loader.style.display = 'none'; }, 600);
  }, 2400);
}

/* ---------- Side Panel ---------- */
function initSidePanel() {
  const hamburger = document.getElementById('hamburger-btn');
  const sidePanel = document.getElementById('side-panel');
  const overlay = document.querySelector('.side-panel-overlay');

  if (!hamburger || !sidePanel) return;

  function openPanel() {
    sidePanel.classList.add('active');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    sidePanel.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidePanel.classList.contains('active')) closePanel();
    else openPanel();
  });

  if (overlay) overlay.addEventListener('click', closePanel);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  // Close panel when clicking a side panel link
  sidePanel.querySelectorAll('.side-panel-link').forEach(link => {
    link.addEventListener('click', () => {
      closePanel();
    });
  });

  // Logout
  const logoutLinks = document.querySelectorAll('.logout-link');
  logoutLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      UserSession.logout();
      showToast('Logged out successfully', 'success');
      setTimeout(() => { window.location.href = 'index.html'; }, 500);
    });
  });
}

/* ---------- Navbar Scroll ---------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Don't add scroll behavior on pages where navbar is already scrolled
  if (navbar.classList.contains('scrolled')) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

/* ---------- Session UI ---------- */
function initSessionUI() {
  const user = UserSession.getUser();

  const loginLinks = document.querySelectorAll('.login-nav-link');
  const logoutLinks = document.querySelectorAll('.logout-link');
  const userLinks = document.querySelectorAll('.navbar-user-link');

  if (user) {
    loginLinks.forEach(el => el.style.display = 'none');
    logoutLinks.forEach(el => el.style.display = '');
    userLinks.forEach(el => el.style.display = '');
  } else {
    loginLinks.forEach(el => el.style.display = '');
    logoutLinks.forEach(el => el.style.display = 'none');
  }
}

/* ---------- Toast Notification ---------- */
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span> ${message}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ---------- User Session ---------- */
const UserSession = {
  save(userData) {
    localStorage.setItem('faxx_user', JSON.stringify({
      ...userData,
      loginTime: new Date().toISOString()
    }));
  },

  getUser() {
    try {
      const data = localStorage.getItem('faxx_user');
      return data ? JSON.parse(data) : null;
    } catch { return null; }
  },

  logout() {
    localStorage.removeItem('faxx_user');
  },

  isLoggedIn() {
    return !!this.getUser();
  }
};
